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



export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** Server-side WebRTC RTP capabilities for WebRTC negotiation. */
  serverRtpCapabilities: Scalars['RtpCapabilitiesFinalized'];
};





export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  /** Notify when new producers are available. */
  producerAvailable: Scalars['ProducerId'];
  /** Notify when new data producers are available. */
  dataProducerAvailable: Scalars['DataProducerId'];
};


