import BroadcasterAndBotLink from '@components/broadcasterAndBotLink/BroadcasterAndBotLink';
import Page from '@components/Page';
import { Button } from '@components/ui/shadcn/button';
import { useTranslation } from '@services/i18n/useTranslation';
import { useAuthStore } from '@services/state/auth/auth.stores';

const BotPage = () => {
  const t = useTranslation();
  const { bot, setBot } = useAuthStore();

  return (
    <Page title={t('bot.title')}>
      <br />
      <br />
      <BroadcasterAndBotLink compact />
      <br />
      <br />
      <Button
        onClick={() => {
          setBot({ ...bot!, status: 'active' });
        }}
      >
        activer le bot
      </Button>
    </Page>
  );
};

export default BotPage;
