import { VStack } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { Device } from "mediasoup-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  FetchResult,
  HttpLink,
} from "@apollo/client/core";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { DtlsParameters } from "mediasoup-client/lib/Transport";
import {
  RegisterClientSessionMutation,
  RegisterClientSessionMutationVariables,
  RegisterClientSessionDocument,
} from "./control.relay-control.generated";
import { useRouteMatch } from "react-router-dom";
import { apolloClient } from "apollo";
import { useSession } from "contexts/session";
import {
  GetRtpCapabilitiesDocument,
  GetRtpCapabilitiesQuery,
  GetRtpCapabilitiesQueryVariables,
  RtpCapabilitiesMutation,
  RtpCapabilitiesMutationVariables,
  RtpCapabilitiesDocument,
  CreateWebrtcTransportDocument,
  CreateWebrtcTransportMutation,
  CreateWebrtcTransportMutationVariables,
  ConnectWebrtcTransportDocument,
  ConnectWebrtcTransportMutation,
  ConnectWebrtcTransportMutationVariables,
  ConsumeDocument,
  ConsumeMutation,
  ConsumeMutationVariables,
  ConsumerResumeDocument,
  ConsumerResumeMutation,
  ConsumerResumeMutationVariables,
  ProduceDataDocument,
  ProduceDataMutation,
  ProduceDataMutationVariables,
} from "./signal.relay.generated";

const signalAddress = "ws://localhost:8443";
const TEST_USER_ID = "10479";
let cachedClientToken: string;

function jsonClone(x: Object) {
  return JSON.parse(JSON.stringify(x));
}

const StreamVideo: React.FC = () => {
  const stream = useRef<HTMLVideoElement>(null);

  const receiveMediaStreamRef = useRef<MediaStream>();
  const clientSubRef = useRef<SubscriptionClient>();

  const { params } = useRouteMatch<{ roomId?: string }>();
  const { userId } = useSession();

  useEffect(() => {
    async function getClientToken(): Promise<string | undefined> {
      if (!cachedClientToken) {
        let validUserId = userId;
        if (!validUserId || validUserId === null) {
          validUserId = TEST_USER_ID;
          // TODO: In the future, should just throw here
          console.log("Invalid user id, using test ID instead", TEST_USER_ID);
          // return;
        }

        let response = await apolloClient.mutate<
          RegisterClientSessionMutation,
          RegisterClientSessionMutationVariables
        >({
          mutation: RegisterClientSessionDocument,
          variables: {
            sessionId: validUserId,
            roomId: params.roomId!,
          },
        });

        if (!response.data) {
          console.log("Error getting client access token:", response);
          return undefined;
        }

        let data = response.data.registerClientSession;
        if (data?.__typename !== "SessionWithToken") {
          console.log("Error getting client access token:", data);
          return undefined;
        }

        cachedClientToken = data?.accessToken;
      }

      return cachedClientToken;
    }

    async function setupStream() {
      const clientToken = await getClientToken();
      console.log("clientToken", clientToken);

      if (!clientToken) {
        // TODO: Throw some error where client can't get access token from relay control
        console.log("Invalid client token: ", clientToken);
        return;
      }

      const { client: signalClient, sub } = getSignalConnection(clientToken);
      const device = new Device();

      const initParams = await signalClient.query<
        GetRtpCapabilitiesQuery,
        GetRtpCapabilitiesQueryVariables
      >({
        // query relay for init parameters
        query: GetRtpCapabilitiesDocument,
      });

      console.log("received server init", initParams.data);
      // load init params into device
      await device.load({
        routerRtpCapabilities: jsonClone(initParams.data.serverRtpCapabilities),
      });

      // send init params back to relay
      await signalClient.mutate<
        RtpCapabilitiesMutation,
        RtpCapabilitiesMutationVariables
      >({
        mutation: RtpCapabilitiesDocument,
        variables: {
          rtpCapabilities: device.rtpCapabilities,
        },
      });

      async function createWebrtcTransport() {
        const response = await signalClient.mutate<
          CreateWebrtcTransportMutation,
          CreateWebrtcTransportMutationVariables
        >({
          mutation: CreateWebrtcTransportDocument,
        });
        return response.data?.createWebrtcTransport;
      }

      let sendTransportOptions = await createWebrtcTransport();
      let recvTransportOptions = await createWebrtcTransport();
      // console.log(role, "received transport options", sendTransportOptions, recvTransportOptions);

      async function connectWebrtcTransport(
        transportId: string,
        dtlsParameters: DtlsParameters
      ) {
        // this callback is called on first consume/produce to link transport to relay
        await signalClient.mutate<
          ConnectWebrtcTransportMutation,
          ConnectWebrtcTransportMutationVariables
        >({
          mutation: ConnectWebrtcTransportDocument,
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

        success();
      });

      // this callback is called on produceData to request connection from relay
      sendTransport.on(
        "producedata",
        async ({ sctpStreamParameters }, success) => {
          // this callback is called on produceData to request connection from relay
          const response = await signalClient.mutate<
            ProduceDataMutation,
            ProduceDataMutationVariables
          >({
            mutation: ProduceDataDocument,
            variables: {
              transportId: sendTransport.id,
              sctpStreamParameters,
            },
          });
          console.log("produced data", response.data);
          // the mutation returns a producerId, which we need to yield
        }
      );

      stream.current!.srcObject = null;
      receiveMediaStreamRef.current = undefined;

      // listen for when new media producers are available
      signalClient
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
          const response = await signalClient.mutate<
            ConsumeMutation,
            ConsumeMutationVariables
          >({
            mutation: ConsumeDocument,
            variables: {
              transportId: recvTransport.id,
              producerId: result.data?.producerAvailable,
            },
          });

          // use consumerOptions to connect to producer from relay
          const consumer = await recvTransport.consume(response.data?.consume);
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
            stream.current!.srcObject = receiveMediaStreamRef.current;
            console.log("Stream Component:", stream);
          } else {
            receiveMediaStreamRef.current = new MediaStream([consumer.track]);
            stream.current!.srcObject = receiveMediaStreamRef.current;
            console.log("Stream Component:", stream);
            console.log("Stream Component:", stream);
          }
          // the stream begins paused for technical reasons, request stream to resume
          await signalClient.mutate<
            ConsumerResumeMutation,
            ConsumerResumeMutationVariables
          >({
            mutation: ConsumerResumeDocument,
            variables: {
              consumerId: consumer.id,
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
        }, 10000);
        return () => {
          clientSubRef.current?.close();
          clientSubRef.current = undefined;
        };
      });
    }

    setupStream();
  }, [params.roomId, userId]);

  return <video ref={stream} width="100%" muted controls autoPlay />;
};

export const StreamTab: React.FC = () => {
  return (
    <VStack alignItems="center" spacing="20px">
      <StreamVideo />
    </VStack>
  );
};

function getSignalConnection(token: string) {
  let sub = new SubscriptionClient(signalAddress, {
    connectionParams: {
      token,
    },
  });
  const wsLink = new WebSocketLink(sub);
  let client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });
  return { client, sub };
}
