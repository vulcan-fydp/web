import {
  ApolloClient,
  FetchResult,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { Box, Button, chakra, HStack, Input } from "@chakra-ui/react";
import { environment } from "environment";
import { Device } from "mediasoup-client";
import { DataProducer } from "mediasoup-client/lib/DataProducer";
import { DtlsParameters, Transport } from "mediasoup-client/lib/Transport";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { useRoomSessionQuery } from "./roomSession.backend.generated";
import {
  ConnectWebrtcTransportDocument,
  ConnectWebrtcTransportMutation,
  ConnectWebrtcTransportMutationVariables,
  ConsumeDocument,
  ConsumeMutation,
  ConsumeMutationVariables,
  ConsumerResumeDocument,
  ConsumerResumeMutation,
  ConsumerResumeMutationVariables,
  CreateWebrtcTransportDocument,
  CreateWebrtcTransportMutation,
  CreateWebrtcTransportMutationVariables,
  GetRtpCapabilitiesDocument,
  GetRtpCapabilitiesQuery,
  GetRtpCapabilitiesQueryVariables,
  ProduceDataDocument,
  ProduceDataMutation,
  ProduceDataMutationVariables,
  ProducerAvailableDocument,
  ProducerAvailableSubscription,
  ProducerAvailableSubscriptionVariables,
  RtpCapabilitiesDocument,
  RtpCapabilitiesMutation,
  RtpCapabilitiesMutationVariables,
} from "./signal.relay.generated";
import { VideoStream } from "./VideoStream";

const SIGNAL_ADDRESS = `ws${environment.useSecureProtocol ? "s" : ""}://${
  window.location.host
}${environment.env === "production" ? ":8443" : "/relay/graphql"}`;

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

interface ExampleControllerInputProps {
  dataProducerRef: React.MutableRefObject<DataProducer | undefined>;
}

export const StreamTab: React.FC = () => {
  const streamRef = useRef<HTMLVideoElement>(null);

  const receiveMediaStreamRef = useRef<MediaStream>();
  const dataProducerRef = useRef<DataProducer>();

  const { roomId } = useParams<{ roomId?: string }>();

  useEffect(() => {
    document.querySelectorAll("video").forEach((v) => (v.volume = 0.1));
  });

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
      const producer = await sendTransport.produceData({
        ordered: false,
        maxRetransmits: 0,
      });
      producer.on("open", () => {
        dataProducerRef.current = producer;
      });
    }

    setupStream();

    // TODO: Handle cleanup
    return () => {
      clientSub?.close();
    };
  }, [roomId]);

  const emitData = useCallback(
    (data: ArrayBuffer) => {
      dataProducerRef.current?.send(data);
    },
    [dataProducerRef]
  );

  const { data } = useRoomSessionQuery({
    pollInterval: 5000,
  });

  if (!data || !data.roomSession) {
    return null;
  }

  return (
    <VideoStream
      videoRef={streamRef}
      emitData={emitData}
      controllerNumber={data.roomSession.controllerNumber ?? null}
    />
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
