import { ROLES, TWITCH_BROADCASTER_TYPES } from '@stats-station/constants';

export type TwitchBroadcasterType = (typeof TWITCH_BROADCASTER_TYPES)[number];
export type BroadcasterRole = (typeof ROLES)[number];

export interface Ibroadcaster {
  id: string;
  name: string;
  email: string;
  botId: string;
  username: string;
  twitchId: number;
  role: BroadcasterRole;
  twitchToken: string;
  profileImgUrl: string;
  broadcasterType: TwitchBroadcasterType;
}

export interface IAPIbroadcaster extends Omit<Ibroadcaster, 'id'> {
  _id: string;
}
