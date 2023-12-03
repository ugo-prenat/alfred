import { NodeEnv } from '@stats-station/models';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: NodeEnv;
      MONGO_URI: string;
      TWITCH_CLIENT_ID: string;
      TWITCH_CLIENT_SECRET: string;
      TWITCH_APP_ACCESS_TOKEN: string;
    }
  }
}

export {};
