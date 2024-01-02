import { FC, useEffect } from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@components/ui/shadcn/button';
import { useTranslation } from '@services/i18n/useTranslation';
import Twitch from '@assets/icons/Twitch';
import { Description, Title } from '@components/ui/Typography';
import { makeTwitchAuthUrl } from '@pages/onboarding/onboarding.utils';
import { router } from '@services/router/index.routes';
import { useAuth } from '@services/state/auth/auth.stores';
import { loginBroadcaster } from '@pages/onboarding/onboarding.api';

interface ITwitchLoginStepProps {
  onNextStep: () => void;
}

const TwitchLoginStep: FC<ITwitchLoginStepProps> = ({ onNextStep }) => {
  const twitchToken = document.location.hash.split('&')[0].split('=')[1];

  const t = useTranslation();
  const { setAuth } = useAuth();
  const {
    data,
    mutate: handleLoginBroadcaster,
    isPending,
    isError,
    error
  } = useMutation({
    mutationKey: ['loginBroadcaster'],
    mutationFn: loginBroadcaster
  });

  useEffect(() => {
    if (twitchToken && !data) handleLoginBroadcaster(twitchToken);
  }, []);

  useEffect(() => {
    if (data) {
      const { accessToken, refreshToken, broadcaster, bot } = data;

      setAuth({ broadcaster, bot });
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      data.bot ? router.history.push('/features') : onNextStep();
    }
  }, [data]);

  const handleLoginTwitch = () => (window.location.href = makeTwitchAuthUrl());

  const TwitchLoginBtn = () => (
    <Button
      disabled={isPending}
      onClick={handleLoginTwitch}
      className="flex items-center gap-2 font-semibold text-base bg-twitch text-background dark:text-foreground hover:bg-twitch/80"
    >
      <Twitch className="w-4 h-4 fill-background dark:fill-foreground" />
      <p>{t('onboarding.twitchLogin.twitchLoginBtn')}</p>
    </Button>
  );

  if (isError) {
    console.error(error);
    toast.error('An error occured', {
      description: JSON.stringify(error)
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Title>{t('onboarding.twitchLogin.title')}</Title>
        <Description>{t('onboarding.twitchLogin.description')}</Description>
      </div>

      <TwitchLoginBtn />
    </div>
  );
};

export default TwitchLoginStep;
