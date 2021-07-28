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

// TODO: Get these dynamically (from backend?)
const signalAddress = "ws://localhost:8443";
const CLIENT_TEST_TOKEN = "22a75aab-1297-4fd5-b180-fce6abb7a8a1";

let receiveMediaStream: MediaStream | undefined;
let clientSub: SubscriptionClient | null = null;

function jsonClone(x: Object) {
  return JSON.parse(JSON.stringify(x));
}

const StreamVideo: React.FC<{ clientToken: string }> = ({ clientToken }) => {
  const stream = useRef<HTMLVideoElement>(null);

  console.log("StreamVideo render");

  useEffect(() => {
    async function setupStream() {
      const { client, sub } = getSignalConnection(clientToken);
      const device = new Device();

      const initParams = await client.query({
        // query relay for init parameters
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

      
        sendTransport.on("producedata", ({ sctpStreamParameters }, success) => {
          // this callback is called on produceData to request connection from relay
          client
            .mutate({
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
            })
            .then((response) => {
              console.log("produced data", response.data);
              // the mutation returns a producerId, which we need to yield
              success({ id: response.data.produce_data });
            });

        stream.current!.srcObject = null;
        receiveMediaStream = undefined;

        // listen for when new media producers are available
        client
          .subscribe({
            query: gql`
              subscription {
                producerAvailable
              }
            `,
          })
          .subscribe((result: FetchResult<Record<string, any>>) => {
            // callback is called when new producer is available
            console.log("producer available", result.data);

            // request consumerOptions for new producer from relay
            client
              .mutate({
                mutation: gql`
                  mutation(
                    $transportId: TransportId!
                    $producerId: ProducerId!
                  ) {
                    consume(transportId: $transportId, producerId: $producerId)
                  }
                `,
                variables: {
                  transportId: recvTransport.id,
                  producerId: result.data?.producerAvailable,
                },
              })
              .then(async (response) => {
                console.log("consumed", response.data);
                // use consumerOptions to connect to producer from relay
                const consumer = await recvTransport.consume(
                  response.data.consume
                );
                console.log("consumer created", consumer);

                // display media streams
                if (receiveMediaStream) {
                  if (consumer.track.kind === "video") {
                    receiveMediaStream
                      .getVideoTracks()
                      .forEach((track) =>
                        receiveMediaStream?.removeTrack(track)
                      );
                  } else if (consumer.track.kind === "audio") {
                    receiveMediaStream
                      .getAudioTracks()
                      .forEach((track) =>
                        receiveMediaStream?.removeTrack(track)
                      );
                  }
                  receiveMediaStream.addTrack(consumer.track);
                  stream.current!.srcObject = receiveMediaStream;
                  console.log("Stream Component:", stream);
                } else {
                  receiveMediaStream = new MediaStream([consumer.track]);
                  stream.current!.srcObject = receiveMediaStream;
                  console.log("Stream Component:", stream);
                  console.log("Stream Component:", stream);
                }
                return consumer.id;
              })
              .then((consumerId) => {
                // the stream begins paused for technical reasons, request stream to resume
                return client.mutate({
                  mutation: gql`
                    mutation($consumerId: ConsumerId!) {
                      consumerResume(consumerId: $consumerId)
                    }
                  `,
                  variables: {
                    consumerId: consumerId,
                  },
                });
              })
              .then((response) => {
                console.log("consumer resume", response.data);
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
      });

      clientSub?.close();
      clientSub = sub;
    }

    setupStream();
  }, [clientToken]);

  return <video ref={stream} width="100%" muted controls />;
};

export const StreamTab: React.FC = () => {
  clientSub?.close();

  return (
    <VStack alignItems="center" spacing="20px">
      <StreamVideo clientToken={CLIENT_TEST_TOKEN} />
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
