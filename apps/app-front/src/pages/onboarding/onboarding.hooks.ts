import { IAuthBroadcasterResponse } from '@alfred/models';
import { loginBroadcaster } from './onboarding.api';
import { useFetcher } from '@services/api/fetcher/fetcher.hooks';

export const useLoginBroadcaster = () => {
  const fetchFunc = (twitchToken: string) => loginBroadcaster(twitchToken);

  const { handleFetch, ...fetcherProps } = useFetcher<
    IAuthBroadcasterResponse,
    Parameters<typeof fetchFunc>
  >(fetchFunc);

  return {
    handleLoginBroadcaster: handleFetch,
    ...fetcherProps
  };
};
