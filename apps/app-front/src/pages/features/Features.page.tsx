import Page from '@components/Page';
import { useTranslation } from '@services/i18n/useTranslation';
import { useBroadcasterFeatures } from './features.hooks';
import { Skeleton } from '@components/ui/shadcn/skeleton';
import FeaturesList from './FeaturesList';
import { ErrorAlertRetry } from '@components/ui/Alert';

const FeaturesPage = () => {
  const t = useTranslation();
  const { isPending, isError, isSuccess, refetch } = useBroadcasterFeatures();

  return (
    <Page title={t('features.title')}>
      {isPending && <Skeleton />}
      {isError && (
        <ErrorAlertRetry text={t('features.retrieve.error')} fn={refetch} />
      )}
      {isSuccess && <FeaturesList />}
    </Page>
  );
};

export default FeaturesPage;
