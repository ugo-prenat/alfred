import { isNotEmpty } from '@utils/helpers.utils';
import { useAuth } from './auth.stores';

export const isAuthenticated = (): boolean => {
  const { accessToken, refreshToken, bot, broadcaster } = useAuth.getState();

  return (
    isNotEmpty(accessToken) &&
    isNotEmpty(refreshToken) &&
    !!bot &&
    !!broadcaster &&
    broadcaster.botId === bot.id
  );
};
