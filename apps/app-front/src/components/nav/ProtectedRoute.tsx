import UnauthorizedPage from '@pages/redirection/Unauthorized.page';
import { Outlet } from '@tanstack/react-router';
import { useAuthentication } from '@hooks/useAuthentication';
import { BroadcasterRole } from '@alfred/models';
import { FC } from 'react';

interface IProtectedRouteProps {
  requiredRole?: BroadcasterRole;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  requiredRole = 'member'
}) => {
  const { data: isAuth, error, isPending } = useAuthentication(requiredRole);

  if (error) console.error(error);

  if (isPending) return <div>Alfred wakes up...</div>;
  return isAuth ? <Outlet /> : <UnauthorizedPage />;
};

export default ProtectedRoute;
