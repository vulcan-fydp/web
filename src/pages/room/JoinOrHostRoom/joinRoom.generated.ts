import * as Types from '../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type JoinRoomMutationVariables = Types.Exact<{
  roomId: Types.Scalars['ID'];
  nickname: Types.Scalars['String'];
}>;


export type JoinRoomMutation = (
  { __typename?: 'Mutation' }
  & { joinRoom: (
    { __typename: 'RoomConnection' }
    & Pick<Types.RoomConnection, 'accessToken'>
    & { room: (
      { __typename?: 'Room' }
      & Pick<Types.Room, 'id'>
      & { relay: (
        { __typename?: 'Relay' }
        & Pick<Types.Relay, 'hostName'>
      ) }
    ) }
  ) | { __typename: 'AuthenticationError' } | { __typename: 'ClientInRoomError' } }
);


export const JoinRoomDocument = gql`
    mutation joinRoom($roomId: ID!, $nickname: String!) {
  joinRoom(roomId: $roomId, nickname: $nickname) {
    __typename
    ... on RoomConnection {
      accessToken
      room {
        id
        relay {
          hostName
        }
      }
    }
  }
}
    `;
export type JoinRoomMutationFn = Apollo.MutationFunction<JoinRoomMutation, JoinRoomMutationVariables>;

/**
 * __useJoinRoomMutation__
 *
 * To run a mutation, you first call `useJoinRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRoomMutation, { data, loading, error }] = useJoinRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      nickname: // value for 'nickname'
 *   },
 * });
 */
export function useJoinRoomMutation(baseOptions?: Apollo.MutationHookOptions<JoinRoomMutation, JoinRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(JoinRoomDocument, options);
      }
export type JoinRoomMutationHookResult = ReturnType<typeof useJoinRoomMutation>;
export type JoinRoomMutationResult = Apollo.MutationResult<JoinRoomMutation>;
export type JoinRoomMutationOptions = Apollo.BaseMutationOptions<JoinRoomMutation, JoinRoomMutationVariables>;