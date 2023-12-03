import { NodeEnv } from '@stats-station/models';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: NodeEnv;
      MONGO_URI: string;
      TWITCH_CLIENT_ID: string;
    }
  }
}

export {};