declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: 'development' | 'production';
      MONGO_URI: string;
      TWITTER_API_KEY: string;
      TWITTER_API_KEY_SECRET: string;
      TWITTER_ACCESS_TOKEN: string;
      TWITTER_ACCESS_TOKEN_SECRET: string;
      TWITTER_CLIENT_ID: string;
      TWITTER_CLIENT_SECRET: string;
      TWITTER_BEARER_TOKEN: string;
      TWITTER_APP_ID: string;
    }
  }
}

export {};
