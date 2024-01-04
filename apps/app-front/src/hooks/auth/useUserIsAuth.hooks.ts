import { useTokens } from '@hooks/useTokens.hooks';
import { useAuthStore } from '@services/state/auth/auth.stores';

export const useUserIsAuth = () => {
  const { accessToken, refreshToken } = useTokens();
  const { bot, broadcaster } = useAuthStore();

  return {
    isAuth: !!(accessToken && refreshToken && bot && broadcaster),
    userNeverCame: !!(!accessToken || !refreshToken)
  };
};
