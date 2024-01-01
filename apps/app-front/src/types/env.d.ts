/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_APP_BACK_URL: string;
  readonly VITE_TWITCH_CLIENT_ID: string;
  readonly VITE_TWITCH_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
