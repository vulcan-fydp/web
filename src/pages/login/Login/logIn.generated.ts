import * as Types from '../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type LogInMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type LogInMutation = (
  { __typename?: 'Mutation' }
  & { logInAsUser: (
    { __typename: 'User' }
    & Pick<Types.User, 'guid' | 'email' | 'firstName' | 'lastName'>
  ) | (
    { __typename: 'AuthenticationError' }
    & Pick<Types.AuthenticationError, 'message'>
  ) }
);


export const LogInDocument = gql`
    mutation logIn($email: String!, $password: String!) {
  logInAsUser(email: $email, password: $password) {
    __typename
    ... on User {
      guid
      email
      firstName
      lastName
    }
    ... on AuthenticationError {
      message
    }
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;