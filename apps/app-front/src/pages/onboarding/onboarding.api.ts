import { fetcher } from '@services/api/fetcher/fetcher';
import { ILoginBroadcasterResponse } from './onboarding.models';

export const loginBroadcaster = (twitchToken: string) =>
  fetcher.POST<ILoginBroadcasterResponse>('/broadcasters/login', {
    body: JSON.stringify({ twitchToken })
  });
