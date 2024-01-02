import { useQuery } from '@tanstack/react-query';
import { IFrontBot, IFrontBroadcaster } from '@alfred/models';
import { fetcher } from '@services/api/fetcher/fetcher.utils';

interface ICheckAuthResponse {
  bot: IFrontBot;
  broadcaster: IFrontBroadcaster;
}

export const useAuthentication = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const checkAuth = (): Promise<Boolean> => {
    if (!accessToken || !refreshToken) return Promise.resolve(false);

    return fetcher
      .post<ICheckAuthResponse>('/auth', { accessToken, refreshToken })
      .then(({ bot, broadcaster }) => {
        // set auth
        console.log({ bot, broadcaster });
        return true;
      })
      .catch(() => false);
  };

  return useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth
  });
};
