import { useMutation, useQuery } from '@tanstack/react-query';
import { getBroadcasterFeatures, updateFeature } from './features.api';
import { IFrontFeature } from '@alfred/models';
import { useFeaturesStore } from './features.store';
import { useEffect } from 'react';

export const useBroadcasterFeatures = () => {
  const { setFeatures } = useFeaturesStore();

  const queryProps = useQuery({
    queryKey: ['features'],
    queryFn: getBroadcasterFeatures
  });

  useEffect(() => {
    if (queryProps.isSuccess) setFeatures(queryProps.data);
  }, [queryProps.isSuccess]);

  return queryProps;
};

export const useUpdateFeature = () => {
  const { setFeature } = useFeaturesStore();

  const { mutate: handleUpdateFeature, ...rest } = useMutation({
    mutationKey: ['updateFeature'],
    mutationFn: updateFeature
  });

  useEffect(() => {
    if (rest.isSuccess) setFeature(rest.data);
  }, [rest.isSuccess]);

  return { handleUpdateFeature, ...rest };
};

export const useFeature = (name: string): IFrontFeature => {
  const { features } = useFeaturesStore();
  const feature = features.find((feature) => feature.name === name);

  if (!feature) throw new Error(`Feature ${name} not found`);
  return feature;
};
