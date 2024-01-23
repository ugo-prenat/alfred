import Page from '@components/Page';
import BreadCrumb from '@components/breadcrumb/Breadcrumb';
import { useBroadcasters } from '../admin.hooks';

const AdminBroadcastersPage = () => {
  const {
    data: broadcasters,
    isPending,
    isError,
    isSuccess
  } = useBroadcasters();

  return (
    <Page>
      <BreadCrumb />
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
