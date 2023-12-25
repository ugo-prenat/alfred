import { createAuth } from '@alfred/utils';

export const { checkAuth, requiredAuth } = createAuth(process.env.JWT_SECRET);
