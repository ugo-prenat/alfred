import Page from '@components/Page';
import { useTranslation } from '@services/i18n/useTranslation';
import { useBroadcasterFeatures } from './features.hooks';
import { Skeleton } from '@components/ui/shadcn/skeleton';
import FeaturesList from './FeaturesList';

const FeaturesPage = () => {
  const t = useTranslation();
  const {
    data: features,
    isPending,
    isError,
    isSuccess
  } = useBroadcasterFeatures();

  return (
    <Page title={t('features.title')}>
      {isPending && <Skeleton />}
      {isError && <div>error</div>}
      {isSuccess && <FeaturesList features={features} />}
    </Page>
  );
};

export default FeaturesPage;
