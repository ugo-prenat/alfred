import Page from '@components/Page';
import { useBroadcasters } from '../admin.hooks';
import { useTranslation } from '@services/i18n/useTranslation';
import { ErrorAlertRetry } from '@components/ui/Alert';
import BroadcastersList from './BroadcastersList';

const AdminBroadcastersPage = () => {
  const t = useTranslation();
  const {
    data: broadcasters,
    isPending,
    isError,
    isSuccess,
    refetch
  } = useBroadcasters();

  return (
    <Page title={t('admin.broadcasters.title')} showBreadcrumb>
      {isPending && <div>Loading...</div>}
      {isError && (
        <ErrorAlertRetry
          text={t('admin.broadcasters.retrieve.error')}
          fn={refetch}
        />
      )}
      {isSuccess && <BroadcastersList broadcasters={broadcasters} />}
    </Page>
  );
};

export default AdminBroadcastersPage;
