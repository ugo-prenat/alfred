import { useQuery } from '@tanstack/react-query';
import { getBroadcasters } from './admin.api';

export const useBroadcasters = () =>
  useQuery({
    queryKey: ['broadcasters'],
    queryFn: getBroadcasters
  });
