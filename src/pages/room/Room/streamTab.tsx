import { VStack } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { Device } from "mediasoup-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  FetchResult,
  createHttpLink,
} from "@apollo/client/core";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { DtlsParameters } from "mediasoup-client/lib/Transport";
import { useRouteMatch } from "react-router-dom";
import { useCookies } from "react-cookie";

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
  ProducerAvailableDocument,
  ProducerAvailableSubscription,
  ProducerAvailableSubscriptionVariables,
} from "./signal.relay.generated";

const signalAddress = "ws://localhost:8443";

function jsonClone(x: Object) {
  return JSON.parse(JSON.stringify(x));
}

const StreamVideo: React.FC = () => {
  const streamRef = useRef<HTMLVideoElement>(null);

  const receiveMediaStreamRef = useRef<MediaStream>();

  const { params } = useRouteMatch<{ roomId?: string }>();
  const { userId } = useSession();
  const [cookies] = useCookies();

  useEffect(() => {
    async function setupStream() {
      const { client: signalClient } = getSignalConnection(cookies.token);
      const device = new Device();

      const initParams = await signalClient.query<
        GetRtpCapabilitiesQuery,
        GetRtpCapabilitiesQueryVariables
      >({
        // query relay for init parameters
        query: GetRtpCapabilitiesDocument,
      });

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
          // the mutation returns a producerId, which we need to yield
          await signalClient.mutate<
            ProduceDataMutation,
            ProduceDataMutationVariables
          >({
            mutation: ProduceDataDocument,
            variables: {
              transportId: sendTransport.id,
              sctpStreamParameters,
            },
          });
        }
      );

      streamRef.current!.srcObject = null;
      receiveMediaStreamRef.current = undefined;

      // listen for when new media producers are available
      signalClient
        .subscribe<
          ProducerAvailableSubscription,
          ProducerAvailableSubscriptionVariables
        >({
          query: ProducerAvailableDocument,
        })
        .subscribe(async (result: FetchResult<Record<string, any>>) => {
          // callback is called when new producer is available

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
          } else {
            receiveMediaStreamRef.current = new MediaStream([consumer.track]);
            streamRef.current!.srcObject = receiveMediaStreamRef.current;
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
      });
    }

    setupStream();
  }, [cookies.token, params.roomId, userId]);

  return <video ref={streamRef} width="100%" muted controls autoPlay />;
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
  let wsLink = new WebSocketLink(sub);
  let client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });
  return { client };
}
