import {
  IAPIBroadcaster,
  IBroadcaster,
  IRawBroadcaster,
  ITwitchBroadcaster
} from '@stats-station/models';
import mongoose from 'mongoose';

export const makeRawBroadcaster = (
  twitchBroadcaster: ITwitchBroadcaster,
  twitchToken: string,
  botId: mongoose.Types.ObjectId
): IRawBroadcaster => {
  const {
    id,
    email,
    display_name,
    broadcaster_type,
    login,
    profile_image_url
  } = twitchBroadcaster;

  return {
    email,
    name: display_name,
    botId,
    username: login,
    twitchId: id,
    role: 'member',
    twitchToken,
    profileImgUrl: profile_image_url,
    broadcasterType: broadcaster_type
  };
};

export const makeAPIBroadcasterToBroadcaster = (
  apiBroadcaster: IAPIBroadcaster
): IBroadcaster => {
  const { _id, ...broadcaster } = apiBroadcaster.toObject();
  return { id: _id.toString(), ...broadcaster };
};
