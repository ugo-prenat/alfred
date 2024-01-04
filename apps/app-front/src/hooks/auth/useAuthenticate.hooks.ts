import { IFrontBot, IFrontBroadcaster } from '@alfred/models';
import { useQuery } from '@tanstack/react-query';
import { useTokens } from '@hooks/useTokens.hooks';
import { fetcher } from '@services/api/fetcher/fetcher.utils';
import { useAuth } from '@services/state/auth/auth.stores';

interface ICheckAuthResponse {
  bot: IFrontBot;
  broadcaster: IFrontBroadcaster;
}

export const useAuthenticate = () => {
  const { setAuth } = useAuth();
  const { accessToken, refreshToken } = useTokens();

  const checkAuth = (): Promise<Boolean> => {
    if (!accessToken || !refreshToken) return Promise.resolve(false);

    return fetcher
      .get<ICheckAuthResponse>('/broadcasters/auth')
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
