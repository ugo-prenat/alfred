import Page from '@components/Page';
import { useTranslation } from '@services/i18n/useTranslation';
import { useBroadcasterFeatures } from './features.hooks';
import { Skeleton } from '@components/ui/shadcn/skeleton';

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
      {isSuccess && (
        <div>
          {features.map((feature) => (
            <div>{feature.name}</div>
          ))}
        </div>
      )}
    </Page>
  );
};

export default FeaturesPage;
