import { useMutation, useQuery } from '@tanstack/react-query';
import { getBroadcasterFeatures, updateFeature } from './features.api';

export const useBroadcasterFeatures = () =>
  useQuery({
    queryKey: ['features'],
    queryFn: getBroadcasterFeatures
  });

export const useUpdateFeature = () => {
  const { mutate: handleUpdateFeature, ...rest } = useMutation({
    mutationKey: ['updateFeature'],
    mutationFn: updateFeature
  });
  return { handleUpdateFeature, ...rest };
};
