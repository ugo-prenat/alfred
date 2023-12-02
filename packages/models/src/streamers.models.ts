import { ROLES, TWITCH_BROADCASTER_TYPES } from '@stats-station/constants';

export type TwitchBroadcasterType = (typeof TWITCH_BROADCASTER_TYPES)[number];
export type StreamerRole = (typeof ROLES)[number];

export interface IStreamer {
  id: string;
  name: string;
  email: string;
  botId: string;
  username: string;
  twitchId: number;
  role: StreamerRole;
  twitchToken: string;
  profileImgUrl: string;
  broadcasterType: TwitchBroadcasterType;
}

export interface IAPIStreamer extends Omit<IStreamer, 'id'> {
  _id: string;
}
