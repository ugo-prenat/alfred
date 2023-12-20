export type BotStatus = 'pending' | 'active' | 'inactive';

export interface IRawBot {
  name: string;
  username: string;
  status: BotStatus;
  streamerId: string;
  profileImgUrl: string;
  twitterCredetials: ITwitterCredentials;
}

export interface ITwitterCredentials {
  // apiKey: string;
  // apiKeySecret: string;
  // accessToken: string;
  // accessTokenSecret: string;
  bearerToken: 'peut-être possible juste avec le bearer token';
}

export interface IAPIBot extends IRawBot {
  _id: string;
}

export interface IBot extends IRawBot {
  id: string;
}
