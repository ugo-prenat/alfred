import { BroadcasterRole } from '@alfred/models';

export type RoleRoute = BroadcasterRole | '*';

interface IRolesRoutes {
  [key: string]: RoleRoute;
}

// /!\ l'ordre est important bien sûr
const rolesRoutes: IRolesRoutes = {
  '^/onboarding': '*',

  '^/admin/*': 'admin',

  '^/moderator/*': 'moderator',

  '^/owner/*': 'owner',

  '/*': 'member'
};

export default rolesRoutes;
