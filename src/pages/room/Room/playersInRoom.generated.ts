import * as Types from '../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PlayersInRoomQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PlayersInRoomQuery = (
  { __typename?: 'Query' }
  & { user?: Types.Maybe<(
    { __typename?: 'User' }
    & { vulcasts: Array<(
      { __typename?: 'Vulcast' }
      & { room?: Types.Maybe<(
        { __typename?: 'Room' }
        & { roomSessions: Array<(
          { __typename?: 'RoomSession' }
          & Pick<Types.RoomSession, 'id' | 'nickname' | 'controllerNumber'>
        )> }
      )> }
    )> }
  )> }
);


export const PlayersInRoomDocument = gql`
    query PlayersInRoom {
  user {
    vulcasts {
      room {
        roomSessions {
          id
          nickname
          controllerNumber
        }
      }
    }
  }
}
    `;

/**
 * __usePlayersInRoomQuery__
 *
 * To run a query within a React component, call `usePlayersInRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersInRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersInRoomQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayersInRoomQuery(baseOptions?: Apollo.QueryHookOptions<PlayersInRoomQuery, PlayersInRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayersInRoomQuery, PlayersInRoomQueryVariables>(PlayersInRoomDocument, options);
      }
export function usePlayersInRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayersInRoomQuery, PlayersInRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayersInRoomQuery, PlayersInRoomQueryVariables>(PlayersInRoomDocument, options);
        }
export type PlayersInRoomQueryHookResult = ReturnType<typeof usePlayersInRoomQuery>;
export type PlayersInRoomLazyQueryHookResult = ReturnType<typeof usePlayersInRoomLazyQuery>;
export type PlayersInRoomQueryResult = Apollo.QueryResult<PlayersInRoomQuery, PlayersInRoomQueryVariables>;