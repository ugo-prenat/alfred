import { ILoginBroadcasterResponse } from '@alfred/models';
import { fetcher } from '@services/api/fetcher/fetcher.utils';

export const loginBroadcaster = (twitchAccessToken: string) =>
  fetcher.post<ILoginBroadcasterResponse>('/broadcasters/login', {
    twitchAccessToken
  });
