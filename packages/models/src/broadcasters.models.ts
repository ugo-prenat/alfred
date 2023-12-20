import { ROLES } from '@stats-station/constants';
import { TwitchBroadcasterType } from './twitch.models';

export type BroadcasterRole = (typeof ROLES)[number];

export interface IRawBroadcaster {
  name: string;
  email: string;
  botId: string;
  username: string;
  twitchId: string;
  role: BroadcasterRole;
  twitchToken: string;
  profileImgUrl: string;
  broadcasterType: TwitchBroadcasterType;
}

export interface IAPIBroadcaster extends IRawBroadcaster {
  _id: string;
}

export interface IBroadcaster extends IRawBroadcaster {
  id: string;
}
