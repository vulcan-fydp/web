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
  ConsumerId: any;
  ConsumerOptions: any;
  DataConsumerOptions: any;
  DataProducerId: any;
  DtlsParameters: any;
  MediaKind: any;
  PlainTransportOptions: any;
  ProducerId: any;
  RtpCapabilities: any;
  RtpCapabilitiesFinalized: any;
  RtpParameters: any;
  SctpStreamParameters: any;
  TransportId: any;
  WebRtcTransportOptions: any;
};


export type AssignVulcastToRelayResult = RelayAssignment | AuthenticationError | VulcastAssignedToRelayError;

/** Error thrown when the client must authenticate to perform an action. */
export type AuthenticationError = {
  __typename?: 'AuthenticationError';
  message: Scalars['String'];
};

export type ClientInRoomError = {
  __typename?: 'ClientInRoomError';
  message: Scalars['String'];
};



export type CreateRoomResult = Room | AuthenticationError | VulcastNotFoundError | VulcastInRoomError | VulcastNotAssignedToRelayError;

export type CreateUserResult = User | AuthenticationError | EmailInUseError | InvalidEmailError | InvalidFirstNameError | InvalidLastNameError | InvalidPasswordError;




export type EmailInUseError = {
  __typename?: 'EmailInUseError';
  message: Scalars['String'];
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

export type InvalidEmailError = {
  __typename?: 'InvalidEmailError';
  message: Scalars['String'];
};

export type InvalidFirstNameError = {
  __typename?: 'InvalidFirstNameError';
  message: Scalars['String'];
};

export type InvalidLastNameError = {
  __typename?: 'InvalidLastNameError';
  message: Scalars['String'];
};

export type InvalidPasswordError = {
  __typename?: 'InvalidPasswordError';
  message: Scalars['String'];
};

export type JoinRoomResult = RoomConnection | AuthenticationError | ClientInRoomError;

export type LogInAsUserResult = User | AuthenticationError;

export type LogInAsVulcastResult = VulcastAuthentication | AuthenticationError;

export type LogOutFromUserResult = Success | AuthenticationError;


export type Mutation = {
  __typename?: 'Mutation';
  logInAsUser: LogInAsUserResult;
  createUser?: Maybe<CreateUserResult>;
  logOutFromUser: LogOutFromUserResult;
  createHelpCenterArticle: HelpCenterArticle;
  updateHelpCenterArticle: HelpCenterArticle;
  logInAsVulcast: LogInAsVulcastResult;
  createRoom: CreateRoomResult;
  joinRoom: JoinRoomResult;
  assignVulcastToRelay: AssignVulcastToRelayResult;
};


export type MutationLogInAsUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
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


export type MutationLogInAsVulcastArgs = {
  vulcastId: Scalars['String'];
  secret: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  vulcastId: Scalars['ID'];
};


export type MutationJoinRoomArgs = {
  roomId: Scalars['ID'];
  nickname: Scalars['String'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  /** Client-side RTP capabilities for WebRTC negotiation. */
  rtpCapabilities: Scalars['Boolean'];
  /** WebRTC transport parameters. */
  createWebrtcTransport: Scalars['WebRtcTransportOptions'];
  /** Plain receive transport connection parameters. */
  createPlainTransport: Scalars['PlainTransportOptions'];
  /** Provide connection parameters for server-side WebRTC transport. */
  connectWebrtcTransport: Scalars['TransportId'];
  /** Request consumption of media stream. */
  consume: Scalars['ConsumerOptions'];
  /** Resume existing consumer. */
  consumerResume: Scalars['Boolean'];
  /** Request production of media stream. */
  produce: Scalars['ProducerId'];
  /** Request production of a media stream on plain transport. */
  producePlain: Scalars['ProducerId'];
  /** Request consumption of data stream. */
  consumeData: Scalars['DataConsumerOptions'];
  /** Request production of data stream. */
  produceData: Scalars['DataProducerId'];
};


export type MutationRootRtpCapabilitiesArgs = {
  rtpCapabilities: Scalars['RtpCapabilities'];
};


export type MutationRootConnectWebrtcTransportArgs = {
  transportId: Scalars['TransportId'];
  dtlsParameters: Scalars['DtlsParameters'];
};


export type MutationRootConsumeArgs = {
  transportId: Scalars['TransportId'];
  producerId: Scalars['ProducerId'];
};


export type MutationRootConsumerResumeArgs = {
  consumerId: Scalars['ConsumerId'];
};


export type MutationRootProduceArgs = {
  transportId: Scalars['TransportId'];
  kind: Scalars['MediaKind'];
  rtpParameters: Scalars['RtpParameters'];
};


export type MutationRootProducePlainArgs = {
  transportId: Scalars['TransportId'];
  kind: Scalars['MediaKind'];
  rtpParameters: Scalars['RtpParameters'];
};


export type MutationRootConsumeDataArgs = {
  transportId: Scalars['TransportId'];
  dataProducerId: Scalars['DataProducerId'];
};


export type MutationRootProduceDataArgs = {
  transportId: Scalars['TransportId'];
  sctpStreamParameters: Scalars['SctpStreamParameters'];
};



export type Query = {
  __typename?: 'Query';
  helpCenterArticles: Array<HelpCenterArticle>;
  vulcasts: Array<Vulcast>;
  /** Gets the user making this request or null if this request was not made by a user */
  user?: Maybe<User>;
  room?: Maybe<Room>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** Server-side WebRTC RTP capabilities for WebRTC negotiation. */
  serverRtpCapabilities: Scalars['RtpCapabilitiesFinalized'];
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
  id: Scalars['ID'];
  vulcast: Vulcast;
  relay: Relay;
  roomSessions: Array<RoomSession>;
};

export type RoomConnection = {
  __typename?: 'RoomConnection';
  room: Room;
  accessToken: Scalars['String'];
};

export type RoomSession = {
  __typename?: 'RoomSession';
  id: Scalars['ID'];
  isHost: Scalars['Boolean'];
  room: Room;
  nickname: Scalars['String'];
  controllerNumber?: Maybe<Scalars['Int']>;
};





export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  /** Notify when new producers are available. */
  producerAvailable: Scalars['ProducerId'];
  /** Notify when new data producers are available. */
  dataProducerAvailable: Scalars['DataProducerId'];
};

export type Success = {
  __typename?: 'Success';
  _?: Maybe<Scalars['Boolean']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  vulcasts: Array<Vulcast>;
};

export type Vulcast = {
  __typename?: 'Vulcast';
  id: Scalars['ID'];
  owningUser: User;
  room?: Maybe<Room>;
};

/** Error thrown when a request attempts to assign a Vulcast to a Relay but it is already assigned. */
export type VulcastAssignedToRelayError = {
  __typename?: 'VulcastAssignedToRelayError';
  message: Scalars['String'];
};

export type VulcastAuthentication = {
  __typename?: 'VulcastAuthentication';
  vulcast: Vulcast;
  vulcastAccessToken: Scalars['String'];
};

/** Error thrown because the requested action cannot be performed while the vulcast is in a room. */
export type VulcastInRoomError = {
  __typename?: 'VulcastInRoomError';
  message: Scalars['String'];
};

/** Error thrown when a request requires the vulcast to be connected to a relay but it isn't. */
export type VulcastNotAssignedToRelayError = {
  __typename?: 'VulcastNotAssignedToRelayError';
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

