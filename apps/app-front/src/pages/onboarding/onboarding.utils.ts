import { TWITCH_ACCESS_TOKEN_SCOPES } from '@alfred/constants';

export const makeTwitchAuthUrl = () => {
  const { VITE_TWITCH_CLIENT_ID, VITE_TWITCH_REDIRECT_URL } = import.meta.env;
  const scopes = TWITCH_ACCESS_TOKEN_SCOPES.join('+');
  return `https://id.twitch.tv/oauth2/authorize?client_id=${VITE_TWITCH_CLIENT_ID}&redirect_uri=${VITE_TWITCH_REDIRECT_URL}&response_type=token&scope=${scopes}`;
};
