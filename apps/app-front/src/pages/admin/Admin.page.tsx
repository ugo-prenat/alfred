import { FC } from 'react';

interface IAdminPageProps {
  label: string;
}

const AdminPage: FC<IAdminPageProps> = ({ label }) => {
  return (
    <div>
      Admin Page
      <div>{label}</div>
    </div>
  );
};

export default AdminPage;
