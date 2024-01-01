import Page from '@components/Page';
import TwitchLoginStep from './steps/twitchLogin/TwitchLoginStep';
import { useState } from 'react';

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState<'twitch-login' | 'bot-creation'>(
    'twitch-login'
  );

  const handleNextStep = () => setActiveStep('bot-creation');

  return (
    <Page>
      {activeStep === 'twitch-login' && (
        <TwitchLoginStep onNextStep={handleNextStep} />
      )}
    </Page>
  );
};

export default OnboardingPage;
