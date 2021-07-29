import { VStack } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { Device } from "mediasoup-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  FetchResult,
} from "@apollo/client/core";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { DtlsParameters } from "mediasoup-client/lib/Transport";
import {
  GetRtpCapabilitiesDocument,
  GetRtpCapabilitiesQuery,
  GetRtpCapabilitiesQueryVariables,
} from "./rtpCapabilities.relay.generated";
import {
  RegisterClientSessionMutation,
  RegisterClientSessionMutationVariables,
  RegisterClientSessionDocument,
} from "./control.relay-control.generated";
import { useSession } from "contexts/session";
import { apolloClient } from "apollo";

const signalAddress = "ws://localhost:8443";

function jsonClone(x: Object) {
  return JSON.parse(JSON.stringify(x));
}

const StreamVideo: React.FC = () => {
  const { userId } = useSession();

  // Init this with null to make it compatible with a different ref type for DOM elements
  const streamRef = useRef<HTMLVideoElement>(null);

  const receiveMediaStreamRef = useRef<MediaStream>();
  const clientSubRef = useRef<SubscriptionClient>();

  console.log("StreamVideo render");

  useEffect(() => {
    async function getClientToken(): Promise<string | undefined> {
      let validUserId = userId;
      if (!validUserId || validUserId === null) {
        validUserId = "10354";
        // TODO: Should just throw here
        // return;
      }
      console.log("run");
      let response = await apolloClient.mutate<
        RegisterClientSessionMutation,
        RegisterClientSessionMutationVariables
      >({
        mutation: RegisterClientSessionDocument,
        variables: {
          sessionId: validUserId,
          roomId: "ayush",
        },
      });

      if (!response.data) {
        return undefined;
      }

      let data = response.data.registerClientSession;
      console.log("registerClientSession", data.__typename, data);

      if (data?.__typename !== "SessionWithToken") {
        return undefined;
      }
      let clientToken = data?.accessToken;
      return clientToken;
    }

    async function setupStream() {
      const clientToken = await getClientToken();

      if (!clientToken) {
        return;
      }

      console.log("Access token: ", clientToken);

      const { client, sub } = getSignalConnection(clientToken);
      const device = new Device();

      //   const initParams = await client.query<
      //     GetRtpCapabilitiesQuery,
      //     GetRtpCapabilitiesQueryVariables
      //   >({
      //     // query relay for init parameters
      //     query: GetRtpCapabilitiesDocument,
      //   });
      const initParams = await client.query({
        query: gql`
          query {
            serverRtpCapabilities
          }
        `,
      });

      console.log("received server init", initParams.data);
      // load init params into device
      await device.load({
        routerRtpCapabilities: jsonClone(initParams.data.serverRtpCapabilities),
      });

      // send init params back to relay
      await client.mutate({
        mutation: gql`
          mutation($rtpCapabilities: RtpCapabilities!) {
            rtpCapabilities(rtpCapabilities: $rtpCapabilities)
          }
        `,
        variables: {
          rtpCapabilities: device.rtpCapabilities,
        },
      });

      async function createWebrtcTransport() {
        return (
          await client.mutate({
            mutation: gql`
              mutation {
                createWebrtcTransport
              }
            `,
          })
        ).data.createWebrtcTransport;
      }

      // create bidirectional transport
      let sendTransportOptions = await createWebrtcTransport();
      let recvTransportOptions = await createWebrtcTransport();
      // console.log(role, "received transport options", sendTransportOptions, recvTransportOptions);

      async function connectWebrtcTransport(
        transportId: string,
        dtlsParameters: DtlsParameters
      ) {
        // this callback is called on first consume/produce to link transport to relay
        await client.mutate({
          mutation: gql`
            mutation(
              $transportId: TransportId!
              $dtlsParameters: DtlsParameters!
            ) {
              connectWebrtcTransport(
                transportId: $transportId
                dtlsParameters: $dtlsParameters
              )
            }
          `,
          variables: {
            transportId,
            dtlsParameters,
          },
        });
      }
      let sendTransport = device.createSendTransport(
        jsonClone(sendTransportOptions)
      );
      sendTransport.on("connect", async ({ dtlsParameters }, success) => {
        // this callback is called on first consume/produce to link transport to relay
        await connectWebrtcTransport(sendTransport.id, dtlsParameters);
        console.log("connected send transport");
        success();
      });
      let recvTransport = device.createRecvTransport(
        jsonClone(recvTransportOptions)
      );
      recvTransport.on("connect", async ({ dtlsParameters }, success) => {
        // this callback is called on first consume/produce to link transport to relay
        await connectWebrtcTransport(recvTransport.id, dtlsParameters);
        console.log("connected recv transport");
        success();
      });

      sendTransport.on(
        "producedata",
        async ({ sctpStreamParameters }, success) => {
          // this callback is called on produceData to request connection from relay
          const response = await client.mutate({
            mutation: gql`
              mutation(
                $transportId: TransportId!
                $sctpStreamParameters: SctpStreamParameters!
              ) {
                produceData(
                  transportId: $transportId
                  sctpStreamParameters: $sctpStreamParameters
                )
              }
            `,
            variables: {
              transportId: sendTransport.id,
              sctpStreamParameters,
            },
          });
          console.log("produced data", response.data);
          // the mutation returns a producerId, which we need to yield
          success({ id: response.data.produce_data });
        }
      );

      streamRef.current!.srcObject = null;
      receiveMediaStreamRef.current = undefined;

      // listen for when new media producers are available
      client
        .subscribe({
          query: gql`
            subscription {
              producerAvailable
            }
          `,
        })
        .subscribe(async (result: FetchResult<Record<string, any>>) => {
          // callback is called when new producer is available
          console.log("producer available", result.data);

          // request consumerOptions for new producer from relay
          const response = await client.mutate({
            mutation: gql`
              mutation($transportId: TransportId!, $producerId: ProducerId!) {
                consume(transportId: $transportId, producerId: $producerId)
              }
            `,
            variables: {
              transportId: recvTransport.id,
              producerId: result.data?.producerAvailable,
            },
          });
          console.log("consumed", response.data);
          // use consumerOptions to connect to producer from relay
          const consumer = await recvTransport.consume(response.data.consume);
          console.log("consumer created", consumer);

          // display media streams
          if (receiveMediaStreamRef.current) {
            if (consumer.track.kind === "video") {
              receiveMediaStreamRef.current
                .getVideoTracks()
                .forEach((track) =>
                  receiveMediaStreamRef.current!.removeTrack(track)
                );
            } else if (consumer.track.kind === "audio") {
              receiveMediaStreamRef.current
                .getAudioTracks()
                .forEach((track) =>
                  receiveMediaStreamRef.current!.removeTrack(track)
                );
            }
            receiveMediaStreamRef.current.addTrack(consumer.track);
            streamRef.current!.srcObject = receiveMediaStreamRef.current;
            console.log("Stream Component:", streamRef);
          } else {
            receiveMediaStreamRef.current = new MediaStream([consumer.track]);
            streamRef.current!.srcObject = receiveMediaStreamRef.current;
            console.log("Stream Component:", streamRef);
          }
          const consumerId = consumer.id;
          // the stream begins paused for technical reasons, request stream to resume
          await client.mutate({
            mutation: gql`
              mutation($consumerId: ConsumerId!) {
                consumerResume(consumerId: $consumerId)
              }
            `,
            variables: {
              consumerId: consumerId,
            },
          });
        });

      // start producing data (this would be controller inputs in binary format)
      let dataProducer = await sendTransport.produceData({ ordered: false });
      dataProducer.on("open", () => {
        let handle = setInterval(() => {
          let data = "hello " + Math.floor(1000 * Math.random());
          console.log("send data", data);
          if (dataProducer.closed) {
            clearInterval(handle);
            return;
          }
          dataProducer.send(data);
        }, 10000);
      });

      clientSubRef.current = sub;
    }

    setupStream();

    return () => {
      clientSubRef.current?.close();
      clientSubRef.current = undefined;
    };
  }, [userId]);

  return <video ref={streamRef} width="100%" muted controls />;
};

export const StreamTab: React.FC = () => {
  return (
    <VStack alignItems="center" spacing="20px">
      <StreamVideo />
    </VStack>
  );
};

function getSignalConnection(clientToken: string) {
  let sub = new SubscriptionClient(signalAddress, {
    connectionParams: {
      clientToken,
    },
  });
  const wsLink = new WebSocketLink(sub);
  let client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });
  return { client, sub };
}
