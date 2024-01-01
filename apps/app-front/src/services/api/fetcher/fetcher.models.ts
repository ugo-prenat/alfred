export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface IInitialStates<T> {
  initialData?: T;
  initialStatus?: Status;
}

export const defaultInit: RequestInit = {
  headers: { 'Content-Type': 'application/json' }
};
