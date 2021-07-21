import {
  VStack,
} from "@chakra-ui/react";
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache, gql, FetchResult, HttpLink } from '@apollo/client/core';
import { SubscriptionClient } from "subscriptions-transport-ws";

// TODO: Get these dynamically (from backend?)
const controlAddress = "https://localhost:9443";
const signalAddress = "wss://localhost:8443";

let clientSub: SubscriptionClient | null = null;

export const StreamTab: React.FC = () => {

  const stream = <video controls></video>;

  return (
    <VStack alignItems="center" spacing="20px">
      {stream}
    </VStack>
  );
}

function getControlConnection() {
  const httpLink = new HttpLink({
      uri: controlAddress,
  });
  return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
  })
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