import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  FetchResult,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { Device } from "mediasoup-client";
import { DtlsParameters, Transport } from "mediasoup-client/lib/Transport";
import { DataProducer } from "mediasoup-client/lib/DataProducer";
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

const SIGNAL_ADDRESS = `wss://${window.location.hostname}:8443`;

function jsonClone(x: Object) {
  return JSON.parse(JSON.stringify(x));
}

async function createWebrtcTransport(
  signalClient: ApolloClient<NormalizedCacheObject>
) {
  const response = await signalClient.mutate<
    CreateWebrtcTransportMutation,
    CreateWebrtcTransportMutationVariables
  >({
    mutation: CreateWebrtcTransportDocument,
  });
  return response.data?.createWebrtcTransport;
}

async function connectWebrtcTransport(
  transportId: string,
  dtlsParameters: DtlsParameters,
  signalClient: ApolloClient<NormalizedCacheObject>
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

function setTransportOnConnect(
  sendTransport: Transport,
  signalClient: ApolloClient<NormalizedCacheObject>
) {
  sendTransport.on("connect", async ({ dtlsParameters }, success) => {
    // this callback is called on first consume/produce to link transport to relay
    await connectWebrtcTransport(
      sendTransport.id,
      dtlsParameters,
      signalClient
    );
    success();
  });
}

interface StreamVideoProps {
  streamRef: React.RefObject<HTMLVideoElement>;
}

const StreamVideo: React.FC<StreamVideoProps> = ({ streamRef }) => {
  return <video ref={streamRef} width="100%" muted controls autoPlay />;
};

interface ExampleControllerInputProps {
  dataProducerRef: React.MutableRefObject<DataProducer | undefined>;
}

// TODO: Replace this with the new Canvas component to gather and send controller inputs
// Just need to create data and send with `dataProducerRef.current?.send(sendData);`
const ExampleControllerInputSender: React.FC<ExampleControllerInputProps> = ({
  dataProducerRef,
}) => {
  const [sendData, setSendData] = useState("");
  return (
    <HStack>
      <Input onChange={(event) => setSendData(event.target.value)} />
      <Button
        onClick={() => {
          if (dataProducerRef.current?.closed) {
            console.log("Data Producer is closed, unable to send inputs");
          }
          console.log("Sending input: ", sendData);
          // Call the line below to send controller inputs!
          dataProducerRef.current?.send(sendData);
        }}
      >
        Send input!
      </Button>
    </HStack>
  );
};

export const StreamTab: React.FC = () => {
  const streamRef = useRef<HTMLVideoElement>(null);

  const receiveMediaStreamRef = useRef<MediaStream>();
  const dataProducerRef = useRef<DataProducer>();

  const { params } = useRouteMatch<{ roomId?: string }>();
  const { userId } = useSession();

  useEffect(() => {
    const { client: signalClient, sub: clientSub } = getSignalConnection();

    async function setupStream() {
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

      let [sendTransportOptions, recvTransportOptions] = await Promise.all([
        createWebrtcTransport(signalClient),
        createWebrtcTransport(signalClient),
      ]);

      // Link send transport to relay
      let sendTransport = device.createSendTransport(
        jsonClone(sendTransportOptions)
      );
      setTransportOnConnect(sendTransport, signalClient);

      // Link recv transport to relay
      let recvTransport = device.createRecvTransport(
        jsonClone(recvTransportOptions)
      );
      setTransportOnConnect(recvTransport, signalClient);

      // this callback is called on produceData to request connection from relay
      sendTransport.on(
        "producedata",
        async ({ sctpStreamParameters }, success) => {
          // this callback is called on produceData to request connection from relay
          // the mutation returns a producerId, which we need to yield
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

          // the mutation returns a producerId, which we need to yield
          success({ id: response.data?.produceData });
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
          // TODO: this mutation might fail if the relay is unavailable, add some error handling here
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
      dataProducerRef.current = await sendTransport.produceData({
        ordered: false,
        maxRetransmits: 0,
      });
    }

    setupStream();

    // TODO: Handle cleanup
    return () => {
      clientSub?.close();
    };
  }, [params.roomId, userId]);

  return (
    <VStack alignItems="center" spacing="20px">
      <StreamVideo streamRef={streamRef} />
      <ExampleControllerInputSender dataProducerRef={dataProducerRef} />
    </VStack>
  );
};

function getSignalConnection() {
  let sub = new SubscriptionClient(SIGNAL_ADDRESS);
  let wsLink = new WebSocketLink(sub);
  let client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });
  return { client, sub };
}
