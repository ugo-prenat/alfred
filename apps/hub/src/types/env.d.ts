import { NodeEnv } from '@alfred/models';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: NodeEnv;
      LOG_LEVEL: string;
      BETTERSTACK_SOURCE_TOKEN: string;
      TWITCH_WEBHOOK_SECRET: string;
      TWITCH_APP_ACCESS_TOKEN: string;
      TWITCH_CLIENT_SECRET: string;
      TWITCH_WEBHOOK_CALLBACK_URL: string;
      TWITCH_CLIENT_ID: string;
      MONGO_URI: string;
      TWITTER_API_KEY: string;
      TWITTER_API_KEY_SECRET: string;
      TWITTER_ACCESS_TOKEN: string;
      TWITTER_ACCESS_TOKEN_SECRET: string;
      TWITTER_CLIENT_ID: string;
      TWITTER_CLIENT_SECRET: string;
      TWITTER_BEARER_TOKEN: string;
      TWITTER_APP_ID: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
    }
  }
}

export {};
