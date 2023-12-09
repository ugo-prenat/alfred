export interface ITwitterFetcherParams {
  host: 'https://api.twitter.com' | 'https://upload.twitter.com';
  version: '2' | '1.1';
  bearerToken: string;
}

export interface ICreateTweetResponse {
  data: {
    id: string;
    text: string;
  };
}

export interface ICreateTweetPayload {
  text: string;
}
