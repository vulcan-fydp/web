import * as Types from "graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type CreateRoomMutationVariables = Types.Exact<{
  vulcastId: Types.Scalars["ID"];
}>;

export type CreateRoomMutation = { __typename?: "Mutation" } & {
  createRoom:
    | ({ __typename: "Room" } & Pick<Types.Room, "id">)
    | ({ __typename: "AuthenticationError" } & Pick<
        Types.AuthenticationError,
        "message"
      >)
    | ({ __typename: "VulcastNotFoundError" } & Pick<
        Types.VulcastNotFoundError,
        "message"
      >)
    | ({ __typename: "VulcastInRoomError" } & Pick<
        Types.VulcastInRoomError,
        "message"
      >)
    | ({ __typename: "VulcastNotAssignedToRelayError" } & Pick<
        Types.VulcastNotAssignedToRelayError,
        "message"
      >);
};

export const CreateRoomDocument = gql`
  mutation createRoom($vulcastId: ID!) {
    createRoom(vulcastId: $vulcastId) {
      __typename
      ... on Room {
        id
      }
      ... on AuthenticationError {
        message
      }
      ... on VulcastNotFoundError {
        message
      }
      ... on VulcastInRoomError {
        message
      }
      ... on VulcastNotAssignedToRelayError {
        message
      }
    }
  }
`;
export type CreateRoomMutationFn = Apollo.MutationFunction<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      vulcastId: // value for 'vulcastId'
 *   },
 * });
 */
export function useCreateRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(
    CreateRoomDocument,
    options
  );
}
export type CreateRoomMutationHookResult = ReturnType<
  typeof useCreateRoomMutation
>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;
