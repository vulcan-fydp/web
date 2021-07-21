import * as Types from '../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SessionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SessionQuery = (
  { __typename?: 'Query' }
  & { user?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'email' | 'firstName' | 'lastName'>
    & { vulcasts: Array<(
      { __typename?: 'Vulcast' }
      & Pick<Types.Vulcast, 'id'>
      & { room?: Types.Maybe<(
        { __typename?: 'Room' }
        & Pick<Types.Room, 'id'>
        & { relay: (
          { __typename?: 'Relay' }
          & Pick<Types.Relay, 'hostName'>
        ) }
      )> }
    )> }
  )>, room?: Types.Maybe<(
    { __typename?: 'Room' }
    & Pick<Types.Room, 'id'>
  )> }
);


export const SessionDocument = gql`
    query Session {
  user {
    id
    email
    firstName
    lastName
    vulcasts {
      id
      room {
        id
        relay {
          hostName
        }
      }
    }
  }
  room {
    id
  }
}
    `;

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionQuery(baseOptions?: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
      }
export function useSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
        }
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;