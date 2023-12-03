import { twitchFetcher } from '@/utils/fetcher/fetcher';
import { IGetTwitchUsersResponse } from '@stats-station/models';
import { APIError } from '@stats-station/utils';
import { Context } from 'hono';

export const getTwitchUser = (c: Context) => {
  const twitchAccessToken = c.req.param('twitchAccessToken');

  return twitchFetcher
    .get<IGetTwitchUsersResponse>(`/users`, twitchAccessToken)
    .then((res) => c.json(res.data[0]))
    .catch((err: APIError) =>
      c.json({ message: err.message, stack: err.stack }, err.status)
    );
};
