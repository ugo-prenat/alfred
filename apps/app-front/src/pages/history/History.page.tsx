import Page from '@components/Page';
import { useTranslation } from '@services/i18n/useTranslation';

const HisotryPage = () => {
  const t = useTranslation();
  return <Page title={t('history.title')}></Page>;
};

export default HisotryPage;
