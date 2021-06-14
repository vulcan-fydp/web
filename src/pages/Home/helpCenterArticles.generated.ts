import * as Types from '../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type HelpCenterArticlesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HelpCenterArticlesQuery = (
  { __typename?: 'Query' }
  & { helpCenterArticles: Array<(
    { __typename?: 'HelpCenterArticle' }
    & Pick<Types.HelpCenterArticle, 'id' | 'title' | 'authors'>
  )> }
);


export const HelpCenterArticlesDocument = gql`
    query HelpCenterArticles {
  helpCenterArticles {
    id
    title
    authors
  }
}
    `;

/**
 * __useHelpCenterArticlesQuery__
 *
 * To run a query within a React component, call `useHelpCenterArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelpCenterArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelpCenterArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelpCenterArticlesQuery(baseOptions?: Apollo.QueryHookOptions<HelpCenterArticlesQuery, HelpCenterArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelpCenterArticlesQuery, HelpCenterArticlesQueryVariables>(HelpCenterArticlesDocument, options);
      }
export function useHelpCenterArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelpCenterArticlesQuery, HelpCenterArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelpCenterArticlesQuery, HelpCenterArticlesQueryVariables>(HelpCenterArticlesDocument, options);
        }
export type HelpCenterArticlesQueryHookResult = ReturnType<typeof useHelpCenterArticlesQuery>;
export type HelpCenterArticlesLazyQueryHookResult = ReturnType<typeof useHelpCenterArticlesLazyQuery>;
export type HelpCenterArticlesQueryResult = Apollo.QueryResult<HelpCenterArticlesQuery, HelpCenterArticlesQueryVariables>;