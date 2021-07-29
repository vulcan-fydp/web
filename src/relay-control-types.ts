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

export type MutationRoot = {
  __typename?: 'MutationRoot';
  /**
   * Register a room tied to a specific Vulcast, identified by its session ID.
   * This will fail if the specified Vulcast is already tied to an existing room.
   */
  registerRoom: RegisterRoomResult;
  /**
   * Unregister a room with the given ID.
   * This will also unregister all sessions associated with this room.
   */
  unregisterRoom: UnregisterRoomResult;
  /**
   * Register a Vulcast with the given session ID.
   * This is intended to be done once, when the Vulcast is powered on.
   * The session and corresponding token remains valid until unregistered.
   * Vulcasts can present the returned token to connect to the Relay.
   */
  registerVulcastSession: RegisterSessionResult;
  /**
   * Register a web client session attached to a specific room, identifed by its room ID.
   * The session and corresponding token remains valid until unregistered.
   * Web clients can present the returned token to connect to the Relay,
   * which will automatically place them in the correct room.
   */
  registerClientSession: RegisterSessionResult;
  /**
   * Register a host session attached to a specific room, identifed by its room ID.
   * The session and corresponding token remains valid until unregistered.
   * Hosts can present the returned token to connect to the Relay,
   * which will automatically place them in the correct room.
   */
  registerHostSession: RegisterSessionResult;
  /**
   * Unregister a session by its session ID.
   * This will also terminate all active connections made with this session.
   */
  unregisterSession: UnregisterSessionResult;
};


export type MutationRootRegisterRoomArgs = {
  roomId: Scalars['ID'];
  vulcastSessionId: Scalars['ID'];
};


export type MutationRootUnregisterRoomArgs = {
  roomId: Scalars['ID'];
};


export type MutationRootRegisterVulcastSessionArgs = {
  sessionId: Scalars['ID'];
};


export type MutationRootRegisterClientSessionArgs = {
  roomId: Scalars['ID'];
  sessionId: Scalars['ID'];
};


export type MutationRootRegisterHostSessionArgs = {
  roomId: Scalars['ID'];
  sessionId: Scalars['ID'];
};


export type MutationRootUnregisterSessionArgs = {
  sessionId: Scalars['ID'];
};

/** The specified ID is not unique. */
export type NonUniqueIdError = {
  __typename?: 'NonUniqueIdError';
  id: Scalars['ID'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** Get the version and build info of this relay instance. */
  version: Scalars['String'];
};

export type RegisterRoomResult = Room | VulcastInRoomError | UnknownSessionError | NonUniqueIdError;

export type RegisterSessionResult = SessionWithToken | UnknownRoomError | NonUniqueIdError;

export type Room = {
  __typename?: 'Room';
  id: Scalars['ID'];
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['ID'];
};

export type SessionWithToken = {
  __typename?: 'SessionWithToken';
  id: Scalars['ID'];
  accessToken: Scalars['ID'];
};

/** The specified room does not exist. */
export type UnknownRoomError = {
  __typename?: 'UnknownRoomError';
  room: Room;
};

/** The specified session does not exist. */
export type UnknownSessionError = {
  __typename?: 'UnknownSessionError';
  session: Session;
};

export type UnregisterRoomResult = Room | UnknownRoomError;

export type UnregisterSessionResult = Session | UnknownSessionError;

/** The Vulcast is already in another room. */
export type VulcastInRoomError = {
  __typename?: 'VulcastInRoomError';
  vulcast: Session;
};
