import Page from '@components/Page';
import { useBroadcasters } from '../admin.hooks';
import { useTranslation } from '@services/i18n/useTranslation';
import BroadcastersList from './BroadcastersList';

const AdminBroadcastersPage = () => {
  const t = useTranslation();
  const {
    data: broadcasters,
    isPending,
    isError,
    isSuccess
  } = useBroadcasters();

  return (
    <Page title={t('admin.broadcasters.title')} showBreadcrumb>
      {isPending && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && <BroadcastersList broadcasters={broadcasters} />}
    </Page>
  );
};

export default AdminBroadcastersPage;
