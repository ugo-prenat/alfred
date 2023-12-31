import Page from '@components/Page';
import { Link } from '@tanstack/react-router';

const AdminPage = () => {
  return (
    <Page>
      Admin Page
      <br />
      <br />
      <Link to="/admin/broadcasters" className="underline">
        Broadcasters
      </Link>
    </Page>
  );
};

export default AdminPage;
