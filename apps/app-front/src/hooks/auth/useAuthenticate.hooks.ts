import { IFrontBot, IFrontBroadcaster } from '@alfred/models';
import { useQuery } from '@tanstack/react-query';
import { useTokens } from '@hooks/useTokens.hooks';
import { useAuthStore } from '@services/state/auth/auth.stores';
import { fetcher } from '@services/api/fetcher/fetcher';

interface ICheckAuthResponse {
  bot: IFrontBot;
  broadcaster: IFrontBroadcaster;
}

export const useAuthenticate = () => {
  const { setAuth } = useAuthStore();
  const { accessToken, refreshToken } = useTokens();

  const checkAuth = (): Promise<Boolean> => {
    if (!accessToken || !refreshToken) return Promise.resolve(false);

    return fetcher
      .GET<ICheckAuthResponse>('/broadcasters/auth')
      .then((data) => {
        setAuth(data);
        return true;
      })
      .catch(() => false);
  };

  return useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth
  });
};
