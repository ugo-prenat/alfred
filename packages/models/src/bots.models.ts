export type BotStatus = 'pending' | 'active' | 'inactive';

export interface IBot {
  id: string;
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

export interface IAPIBot extends Omit<IBot, 'id'> {
  _id: string;
}
