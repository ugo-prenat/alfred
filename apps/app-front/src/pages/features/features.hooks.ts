import { useQuery } from '@tanstack/react-query';
import { getBroadcasterFeatures } from './features.api';

export const useBroadcasterFeatures = () =>
  useQuery({
    queryKey: ['features'],
    queryFn: getBroadcasterFeatures
  });
