import { IFrontBroadcaster } from '@alfred/models';
import { fetcher } from '@services/api/fetcher/fetcher';

export const getBroadcasters = (): Promise<IFrontBroadcaster[]> =>
  fetcher.GET<IFrontBroadcaster[]>('/broadcasters');
