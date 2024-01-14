import { IFrontFeature } from '@alfred/models';
import { fetcher } from '@services/api/fetcher/fetcher';
import { useAuthStore } from '@services/state/auth/auth.stores';

export const getBroadcasterFeatures = (): Promise<IFrontFeature[]> => {
  const { broadcaster } = useAuthStore.getState();

  if (!broadcaster)
    return Promise.reject('A broadcaster id is required to retrieve features');

  return fetcher
    .GET<IFrontFeature[]>(`/broadcasters/${broadcaster.id}/features`)
    .then((features) => features)
    .catch((err) => {
      throw err;
    });
};

export const updateBroadcasterFeature = (): Promise<IFrontFeature> => {
  const { broadcaster } = useAuthStore.getState();

  if (!broadcaster)
    return Promise.reject('A broadcaster id is required to update features');

  return fetcher.PUT<IFrontFeature>(`/broadcasters/${broadcaster.id}/features`);
};
