import { IAPIBot, IBot, IBroadcaster, IDBBot } from '@stats-station/models';
import mongoose from 'mongoose';

export const makeDBBot = (
  broadcaster: IBroadcaster,
  botId: mongoose.Types.ObjectId
): IDBBot => {
  const { name, username, id } = broadcaster;

  return {
    _id: botId,
    name: `${name} bot`,
    username: `${username}Bot`,
    status: 'pending',
    streamerId: id,
    profileImgUrl:
      'https://pbs.twimg.com/profile_images/1734921292548026368/aLVkLFDP_400x400.jpg'
  };
};

export const makeAPIBotToBot = (apiBot: IAPIBot): IBot => {
  const { _id, ...bot } = apiBot.toObject();
  return { id: _id.toString(), ...bot };
};
