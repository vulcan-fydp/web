import * as Types from "../../../relay-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = { context: { target: "relay" } };
export type GetRtpCapabilitiesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetRtpCapabilitiesQuery = { __typename?: "QueryRoot" } & Pick<
  Types.QueryRoot,
  "serverRtpCapabilities"
>;

export type RtpCapabilitiesMutationVariables = Types.Exact<{
  rtpCapabilities: Types.Scalars["RtpCapabilities"];
}>;

export type RtpCapabilitiesMutation = { __typename?: "MutationRoot" } & Pick<
  Types.MutationRoot,
  "rtpCapabilities"
>;

export type CreateWebrtcTransportMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type CreateWebrtcTransportMutation = {
  __typename?: "MutationRoot";
} & Pick<Types.MutationRoot, "createWebrtcTransport">;

export type ConnectWebrtcTransportMutationVariables = Types.Exact<{
  transportId: Types.Scalars["TransportId"];
  dtlsParameters: Types.Scalars["DtlsParameters"];
}>;

export type ConnectWebrtcTransportMutation = {
  __typename?: "MutationRoot";
} & Pick<Types.MutationRoot, "connectWebrtcTransport">;

export type ProduceDataMutationVariables = Types.Exact<{
  transportId: Types.Scalars["TransportId"];
  sctpStreamParameters: Types.Scalars["SctpStreamParameters"];
}>;

export type ProduceDataMutation = { __typename?: "MutationRoot" } & Pick<
  Types.MutationRoot,
  "produceData"
>;

export type ConsumeMutationVariables = Types.Exact<{
  transportId: Types.Scalars["TransportId"];
  producerId: Types.Scalars["ProducerId"];
}>;

export type ConsumeMutation = { __typename?: "MutationRoot" } & Pick<
  Types.MutationRoot,
  "consume"
>;

export type ConsumerResumeMutationVariables = Types.Exact<{
  consumerId: Types.Scalars["ConsumerId"];
}>;

export type ConsumerResumeMutation = { __typename?: "MutationRoot" } & Pick<
  Types.MutationRoot,
  "consumerResume"
>;

export const GetRtpCapabilitiesDocument = gql`
  query getRtpCapabilities {
    serverRtpCapabilities
  }
`;

/**
 * __useGetRtpCapabilitiesQuery__
 *
 * To run a query within a React component, call `useGetRtpCapabilitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRtpCapabilitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRtpCapabilitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRtpCapabilitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRtpCapabilitiesQuery,
    GetRtpCapabilitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRtpCapabilitiesQuery,
    GetRtpCapabilitiesQueryVariables
  >(GetRtpCapabilitiesDocument, options);
}
export function useGetRtpCapabilitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRtpCapabilitiesQuery,
    GetRtpCapabilitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRtpCapabilitiesQuery,
    GetRtpCapabilitiesQueryVariables
  >(GetRtpCapabilitiesDocument, options);
}
export type GetRtpCapabilitiesQueryHookResult = ReturnType<
  typeof useGetRtpCapabilitiesQuery
>;
export type GetRtpCapabilitiesLazyQueryHookResult = ReturnType<
  typeof useGetRtpCapabilitiesLazyQuery
>;
export type GetRtpCapabilitiesQueryResult = Apollo.QueryResult<
  GetRtpCapabilitiesQuery,
  GetRtpCapabilitiesQueryVariables
>;
export const RtpCapabilitiesDocument = gql`
  mutation rtpCapabilities($rtpCapabilities: RtpCapabilities!) {
    rtpCapabilities(rtpCapabilities: $rtpCapabilities)
  }
`;
export type RtpCapabilitiesMutationFn = Apollo.MutationFunction<
  RtpCapabilitiesMutation,
  RtpCapabilitiesMutationVariables
>;

/**
 * __useRtpCapabilitiesMutation__
 *
 * To run a mutation, you first call `useRtpCapabilitiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRtpCapabilitiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rtpCapabilitiesMutation, { data, loading, error }] = useRtpCapabilitiesMutation({
 *   variables: {
 *      rtpCapabilities: // value for 'rtpCapabilities'
 *   },
 * });
 */
export function useRtpCapabilitiesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RtpCapabilitiesMutation,
    RtpCapabilitiesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RtpCapabilitiesMutation,
    RtpCapabilitiesMutationVariables
  >(RtpCapabilitiesDocument, options);
}
export type RtpCapabilitiesMutationHookResult = ReturnType<
  typeof useRtpCapabilitiesMutation
>;
export type RtpCapabilitiesMutationResult = Apollo.MutationResult<RtpCapabilitiesMutation>;
export type RtpCapabilitiesMutationOptions = Apollo.BaseMutationOptions<
  RtpCapabilitiesMutation,
  RtpCapabilitiesMutationVariables
>;
export const CreateWebrtcTransportDocument = gql`
  mutation createWebrtcTransport {
    createWebrtcTransport
  }
`;
export type CreateWebrtcTransportMutationFn = Apollo.MutationFunction<
  CreateWebrtcTransportMutation,
  CreateWebrtcTransportMutationVariables
>;

/**
 * __useCreateWebrtcTransportMutation__
 *
 * To run a mutation, you first call `useCreateWebrtcTransportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWebrtcTransportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWebrtcTransportMutation, { data, loading, error }] = useCreateWebrtcTransportMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateWebrtcTransportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWebrtcTransportMutation,
    CreateWebrtcTransportMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateWebrtcTransportMutation,
    CreateWebrtcTransportMutationVariables
  >(CreateWebrtcTransportDocument, options);
}
export type CreateWebrtcTransportMutationHookResult = ReturnType<
  typeof useCreateWebrtcTransportMutation
>;
export type CreateWebrtcTransportMutationResult = Apollo.MutationResult<CreateWebrtcTransportMutation>;
export type CreateWebrtcTransportMutationOptions = Apollo.BaseMutationOptions<
  CreateWebrtcTransportMutation,
  CreateWebrtcTransportMutationVariables
>;
export const ConnectWebrtcTransportDocument = gql`
  mutation connectWebrtcTransport(
    $transportId: TransportId!
    $dtlsParameters: DtlsParameters!
  ) {
    connectWebrtcTransport(
      transportId: $transportId
      dtlsParameters: $dtlsParameters
    )
  }
`;
export type ConnectWebrtcTransportMutationFn = Apollo.MutationFunction<
  ConnectWebrtcTransportMutation,
  ConnectWebrtcTransportMutationVariables
>;

/**
 * __useConnectWebrtcTransportMutation__
 *
 * To run a mutation, you first call `useConnectWebrtcTransportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectWebrtcTransportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectWebrtcTransportMutation, { data, loading, error }] = useConnectWebrtcTransportMutation({
 *   variables: {
 *      transportId: // value for 'transportId'
 *      dtlsParameters: // value for 'dtlsParameters'
 *   },
 * });
 */
export function useConnectWebrtcTransportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConnectWebrtcTransportMutation,
    ConnectWebrtcTransportMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConnectWebrtcTransportMutation,
    ConnectWebrtcTransportMutationVariables
  >(ConnectWebrtcTransportDocument, options);
}
export type ConnectWebrtcTransportMutationHookResult = ReturnType<
  typeof useConnectWebrtcTransportMutation
>;
export type ConnectWebrtcTransportMutationResult = Apollo.MutationResult<ConnectWebrtcTransportMutation>;
export type ConnectWebrtcTransportMutationOptions = Apollo.BaseMutationOptions<
  ConnectWebrtcTransportMutation,
  ConnectWebrtcTransportMutationVariables
>;
export const ProduceDataDocument = gql`
  mutation produceData(
    $transportId: TransportId!
    $sctpStreamParameters: SctpStreamParameters!
  ) {
    produceData(
      transportId: $transportId
      sctpStreamParameters: $sctpStreamParameters
    )
  }
`;
export type ProduceDataMutationFn = Apollo.MutationFunction<
  ProduceDataMutation,
  ProduceDataMutationVariables
>;

/**
 * __useProduceDataMutation__
 *
 * To run a mutation, you first call `useProduceDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProduceDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [produceDataMutation, { data, loading, error }] = useProduceDataMutation({
 *   variables: {
 *      transportId: // value for 'transportId'
 *      sctpStreamParameters: // value for 'sctpStreamParameters'
 *   },
 * });
 */
export function useProduceDataMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ProduceDataMutation,
    ProduceDataMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ProduceDataMutation, ProduceDataMutationVariables>(
    ProduceDataDocument,
    options
  );
}
export type ProduceDataMutationHookResult = ReturnType<
  typeof useProduceDataMutation
>;
export type ProduceDataMutationResult = Apollo.MutationResult<ProduceDataMutation>;
export type ProduceDataMutationOptions = Apollo.BaseMutationOptions<
  ProduceDataMutation,
  ProduceDataMutationVariables
>;
export const ConsumeDocument = gql`
  mutation consume($transportId: TransportId!, $producerId: ProducerId!) {
    consume(transportId: $transportId, producerId: $producerId)
  }
`;
export type ConsumeMutationFn = Apollo.MutationFunction<
  ConsumeMutation,
  ConsumeMutationVariables
>;

/**
 * __useConsumeMutation__
 *
 * To run a mutation, you first call `useConsumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConsumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [consumeMutation, { data, loading, error }] = useConsumeMutation({
 *   variables: {
 *      transportId: // value for 'transportId'
 *      producerId: // value for 'producerId'
 *   },
 * });
 */
export function useConsumeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConsumeMutation,
    ConsumeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConsumeMutation, ConsumeMutationVariables>(
    ConsumeDocument,
    options
  );
}
export type ConsumeMutationHookResult = ReturnType<typeof useConsumeMutation>;
export type ConsumeMutationResult = Apollo.MutationResult<ConsumeMutation>;
export type ConsumeMutationOptions = Apollo.BaseMutationOptions<
  ConsumeMutation,
  ConsumeMutationVariables
>;
export const ConsumerResumeDocument = gql`
  mutation consumerResume($consumerId: ConsumerId!) {
    consumerResume(consumerId: $consumerId)
  }
`;
export type ConsumerResumeMutationFn = Apollo.MutationFunction<
  ConsumerResumeMutation,
  ConsumerResumeMutationVariables
>;

/**
 * __useConsumerResumeMutation__
 *
 * To run a mutation, you first call `useConsumerResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConsumerResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [consumerResumeMutation, { data, loading, error }] = useConsumerResumeMutation({
 *   variables: {
 *      consumerId: // value for 'consumerId'
 *   },
 * });
 */
export function useConsumerResumeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConsumerResumeMutation,
    ConsumerResumeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConsumerResumeMutation,
    ConsumerResumeMutationVariables
  >(ConsumerResumeDocument, options);
}
export type ConsumerResumeMutationHookResult = ReturnType<
  typeof useConsumerResumeMutation
>;
export type ConsumerResumeMutationResult = Apollo.MutationResult<ConsumerResumeMutation>;
export type ConsumerResumeMutationOptions = Apollo.BaseMutationOptions<
  ConsumerResumeMutation,
  ConsumerResumeMutationVariables
>;
