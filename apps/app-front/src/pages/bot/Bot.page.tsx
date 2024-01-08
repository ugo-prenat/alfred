import BroadcasterAndBotLink from '@components/broadcasterAndBotLink/BroadcasterAndBotLink';
import Page from '@components/Page';
import { useTranslation } from '@services/i18n/useTranslation';

const BotPage = () => {
  const t = useTranslation();
  return (
    <Page title={t('bot.title')}>
      <br />
      <br />
      <BroadcasterAndBotLink compact />
    </Page>
  );
};

export default BotPage;
