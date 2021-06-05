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


export type AssignVulcastToRelayResult = RelayAssignment | AuthenticationError | VulcastAssignedToRelayError;

/** Error thrown when the client must authenticate to perform an action. */
export type AuthenticationError = {
  __typename?: 'AuthenticationError';
  message: Scalars['String'];
};

export type CreateRoomResult = Room | AuthenticationError | VulcastNotFoundError | VulcastInRoomError;

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
  createRoom: CreateRoomResult;
  assignVulcastToRelay?: Maybe<AssignVulcastToRelayResult>;
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


export type MutationCreateRoomArgs = {
  vulcastGuid: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  helpCenterArticles: Array<HelpCenterArticle>;
};

export type Relay = {
  __typename?: 'Relay';
  hostName: Scalars['String'];
};

export type RelayAssignment = {
  __typename?: 'RelayAssignment';
  relay: Relay;
  relayAccessToken: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Anonymous = 'ANONYMOUS'
}

export type Room = {
  __typename?: 'Room';
  guid: Scalars['ID'];
  vulcast: Vulcast;
  roomSessions: Array<RoomSession>;
};

export type RoomSession = {
  __typename?: 'RoomSession';
  guid: Scalars['ID'];
  isHost: Scalars['Boolean'];
  room: Room;
  nickname: Scalars['String'];
  controllerNumber?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  guid: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Vulcast = {
  __typename?: 'Vulcast';
  guid: Scalars['ID'];
  owningUser: User;
  room?: Maybe<Room>;
};

/** Error thrown when a request attempts to assign a Vulcast to a Relay but it is already assigned. */
export type VulcastAssignedToRelayError = {
  __typename?: 'VulcastAssignedToRelayError';
  message: Scalars['String'];
};

/** Error thrown because the requested action cannot be performed while the vulcast is in a room. */
export type VulcastInRoomError = {
  __typename?: 'VulcastInRoomError';
  message: Scalars['String'];
};

/**
 * Error thrown when the client attempts to perform an action on a vulcast that
 * does not exist or that they do not own.
 */
export type VulcastNotFoundError = {
  __typename?: 'VulcastNotFoundError';
  message: Scalars['String'];
};
