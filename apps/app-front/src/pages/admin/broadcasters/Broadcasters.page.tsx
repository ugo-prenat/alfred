import Page from '@components/Page';
import { useBroadcasters } from '../admin.hooks';
import { useTranslation } from '@services/i18n/useTranslation';

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
      {isSuccess && (
        <div>
          {broadcasters?.map((broadcaster) => (
            <div key={broadcaster.id}>{broadcaster.name}</div>
          ))}
        </div>
      )}
    </Page>
  );
};

export default AdminBroadcastersPage;
