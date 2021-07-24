import {
  VStack,
} from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { Device } from 'mediasoup-client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache, gql, FetchResult, HttpLink } from '@apollo/client/core';
import { SubscriptionClient } from "subscriptions-transport-ws";

// TODO: Get these dynamically (from backend?)
const controlAddress = "https://localhost:9443";
const signalAddress = "wss://localhost:8443";
const clientToken = "token";

let clientSub: SubscriptionClient | null = null;

export const StreamTab: React.FC = () => {
  const stream = useRef<HTMLVideoElement>(null);
  
  clientSub?.close();
  // useEffect(async () => {
  //   // const wee = await session(clientToken);
  //   if (stream.current === null) {
  //     return
  //   }
  //   stream.current.onloadedmetadata = () => {
  //     if (stream.current === null) {
  //       return
  //     }
  //     stream.current.play();
  //   }
  // }, [clientSub, stream]);

  return (
    <VStack alignItems="center" spacing="20px">
      <video ref={stream}/>
    </VStack>
  );
}

async function session(token: string) {
  let { client, sub } = getSignalConnection(token);

  const device = new Device();

}

function getSignalConnection(token: string) {
  let sub = new SubscriptionClient(signalAddress, {
      connectionParams: {
          token
      }
  });
  const wsLink = new WebSocketLink(sub);
  let client = new ApolloClient({
      link: wsLink,
      cache: new InMemoryCache(),
  })
  return { client, sub };
}