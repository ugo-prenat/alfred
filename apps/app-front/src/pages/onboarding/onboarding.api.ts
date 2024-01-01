import { IAuthBroadcasterResponse } from '@alfred/models';
import { fetcher } from '@services/api/fetcher/fetcher.utils';

export const loginBroadcaster = (twitchToken: string) =>
  fetcher.post<IAuthBroadcasterResponse>('/broadcasters/auth', {
    twitchToken
  });
