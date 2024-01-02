import { fetcher } from '@services/api/fetcher/fetcher.utils';
import { ILoginBroadcasterResponse } from './onboarding.models';

export const loginBroadcaster = (twitchToken: string) =>
  fetcher.post<ILoginBroadcasterResponse>('/broadcasters/login', {
    twitchToken
  });
