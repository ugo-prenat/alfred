import { NodeEnv } from '@alfred/models';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: NodeEnv;
      LOG_LEVEL: string;
      BETTERSTACK_SOURCE_TOKEN: string;
      MONGO_URI: string;
      TWITCH_CLIENT_ID: string;
      TWITCH_CLIENT_SECRET: string;
      TWITCH_APP_ACCESS_TOKEN: string;
      TWITCH_WEBHOOK_SECRET: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      HUB_URL: string;
    }
  }
}

export {};
