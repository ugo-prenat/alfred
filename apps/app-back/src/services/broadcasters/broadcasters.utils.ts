import {
  Broadcaster,
  IAPIBroadcaster,
  IBroadcaster,
  IRawBroadcaster,
  ITwitchBroadcaster
} from '@alfred/models';
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
    twitchType: broadcaster_type
  };
};

export const makeAPIBroadcasterToBroadcaster = (
  apiBroadcaster: IAPIBroadcaster
): IBroadcaster => {
  const { _id, ...broadcaster } = apiBroadcaster.toObject();
  return { id: _id.toString(), ...broadcaster };
};

export const makeAPIBroadcastersToBroadcasters = (
  apiBroadcaster: IAPIBroadcaster[]
): IBroadcaster[] => apiBroadcaster.map(makeAPIBroadcasterToBroadcaster);

export const handleDeleteBroadcaster = (broadcasterId: string) =>
  Broadcaster.findByIdAndDelete(broadcasterId).then((broadcaster) => {
    if (!broadcaster) throw new Error('broadcaster not found');
    return broadcaster;
  });

export const handleGetBroadcaster = (
  broadcasterId: string
): Promise<IAPIBroadcaster> =>
  Broadcaster.findById(broadcasterId).then((broadcaster) => {
    if (!broadcaster) throw new Error('broadcaster not found');
    return broadcaster;
  });
