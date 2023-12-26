import { authMiddleware } from '@alfred/utils';

export const checkAuth = authMiddleware(process.env.JWT_SECRET);
