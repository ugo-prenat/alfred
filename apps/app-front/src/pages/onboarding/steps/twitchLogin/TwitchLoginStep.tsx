import { FC, useEffect } from 'react';
import { Button } from '@components/ui/shadcn/button';
import { useTranslation } from '@services/i18n/useTranslation';
import Twitch from '@assets/icons/Twitch';
import { Description, Title } from '@components/ui/Typography';
import { makeTwitchAuthUrl } from '@pages/onboarding/onboarding.utils';
import { useLoginBroadcaster } from '@pages/onboarding/onboarding.hooks';
import { router } from '@services/router/index.routes';
import { useAuth } from '@services/state/auth/auth.stores';

interface ITwitchLoginStepProps {
  onNextStep: () => void;
}

const TwitchLoginStep: FC<ITwitchLoginStepProps> = ({ onNextStep }) => {
  const twitchToken = document.location.hash.split('&')[0].split('=')[1];

  const t = useTranslation();
  const { setAuth } = useAuth();
  const { handleLoginBroadcaster, data, status } = useLoginBroadcaster();

  const isDisabled = status === 'loading';

  useEffect(() => {
    if (twitchToken && !data)
      handleLoginBroadcaster(twitchToken)
        .then((data) => {
          if (data.bot) {
            setAuth({ ...data, bot: data.bot });
            router.history.push('/features');
          }

          /*
          
          Gérer l'inscription ici
          
          */
        })
        .catch((err) => console.log(err));
  }, []);

  const handleLoginTwitch = () => (window.location.href = makeTwitchAuthUrl());

  const TwitchLoginBtn = () => (
    <Button
      disabled={isDisabled}
      onClick={handleLoginTwitch}
      className="flex items-center gap-2 font-semibold text-base bg-twitch text-background dark:text-foreground hover:bg-twitch/80"
    >
      <Twitch className="w-4 h-4 fill-background dark:fill-foreground" />
      <p>{t('onboarding.twitchLogin.twitchLoginBtn')}</p>
    </Button>
  );

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Title>{t('onboarding.twitchLogin.title')}</Title>
        <Description>{t('onboarding.twitchLogin.description')}</Description>
      </div>

      <TwitchLoginBtn />
      <Button onClick={onNextStep} disabled={isDisabled}>
        Next
      </Button>
    </div>
  );
};

export default TwitchLoginStep;
