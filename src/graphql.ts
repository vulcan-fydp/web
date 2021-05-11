export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type HelpCenterArticle = {
  __typename?: 'HelpCenterArticle';
  id: Scalars['ID'];
  title: Scalars['String'];
  authors: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHelpCenterArticle: HelpCenterArticle;
  updateHelpCenterArticle: HelpCenterArticle;
};


export type MutationCreateHelpCenterArticleArgs = {
  title: Scalars['String'];
  author: Scalars['String'];
  content: Scalars['String'];
};


export type MutationUpdateHelpCenterArticleArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  editor: Scalars['String'];
  content?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  helpCenterArticles: Array<HelpCenterArticle>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Anonymous = 'ANONYMOUS'
}
