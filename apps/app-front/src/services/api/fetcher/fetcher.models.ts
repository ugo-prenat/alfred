import { getAccessToken } from '@hooks/useTokens.hooks';

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface IInitialStates<T> {
  initialData?: T;
  initialStatus?: Status;
}

export const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getAccessToken()}`
};
