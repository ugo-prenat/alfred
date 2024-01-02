import { useQuery } from '@tanstack/react-query';
import { BroadcasterRole, IFrontBot, IFrontBroadcaster } from '@alfred/models';
import { fetcher } from '@services/api/fetcher/fetcher.utils';
import { useAuth } from '@services/state/auth/auth.stores';
import { useTokens } from './useTokens';

interface ICheckAuthResponse {
  bot: IFrontBot;
  broadcaster: IFrontBroadcaster;
}

export const useAuthentication = (requiredRole: BroadcasterRole) => {
  const { setAuth } = useAuth();
  const { accessToken, refreshToken } = useTokens();

  console.log('checking auth for minimum role', requiredRole);

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
