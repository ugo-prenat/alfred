import { ILoginBroadcasterResponse } from '@alfred/models';
import { loginBroadcaster } from './onboarding.api';
import { useFetcher } from '@services/api/fetcher/fetcher.hooks';

export const useLoginBroadcaster = () => {
  const fetchFunc = (twitchAccessToken: string) =>
    loginBroadcaster(twitchAccessToken);

  const { handleFetch, ...fetcherProps } = useFetcher<
    ILoginBroadcasterResponse,
    Parameters<typeof fetchFunc>
  >(fetchFunc);

  return {
    handleLoginBroadcaster: handleFetch,
    ...fetcherProps
  };
};
