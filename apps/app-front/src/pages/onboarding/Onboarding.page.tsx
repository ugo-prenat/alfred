import Page from '@components/Page';
import TwitchLoginStep from './steps/twitchLogin/TwitchLoginStep';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@services/state/auth/auth.stores';
import { removeTokens } from '@hooks/useTokens.hooks';

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState<'twitch-login' | 'bot-creation'>(
    'twitch-login'
  );

  const handleNextStep = () => setActiveStep('bot-creation');

  useEffect(() => {
    useAuthStore.getState().reset();
    removeTokens();
  }, []);

  return (
    <Page>
      {activeStep === 'twitch-login' && (
        <TwitchLoginStep onNextStep={handleNextStep} />
      )}
    </Page>
  );
};

export default OnboardingPage;
