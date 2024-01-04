import { useTokens } from '@hooks/useTokens.hooks';
import { useAuth } from '@services/state/auth/auth.stores';

export const useUserIsAuth = () => {
  const { accessToken, refreshToken } = useTokens();
  const { bot, broadcaster } = useAuth();

  return {
    isAuth: !!(accessToken && refreshToken && bot && broadcaster),
    userNeverCame: !!(!accessToken || !refreshToken)
  };
};
