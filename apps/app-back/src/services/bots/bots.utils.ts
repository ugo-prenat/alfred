import {
  Bot,
  IAPIBot,
  IBot,
  IBroadcaster,
  IDBBot,
  IFrontBot
} from '@alfred/models';
import mongoose from 'mongoose';

export const makeDBBot = (
  broadcaster: IBroadcaster,
  botId: mongoose.Types.ObjectId
): IDBBot => {
  const { name, username, id } = broadcaster;

  return {
    _id: botId,
    status: 'pending',
    broadcasterId: id,
    name: `${name} BOT`,
    username: `${username}Bot`,
    profileImgUrl:
      'https://pbs.twimg.com/profile_images/1734921292548026368/aLVkLFDP_400x400.jpg'
  };
};

export const makeAPIBotToBot = (apiBot: IAPIBot): IBot => {
  const { _id, ...bot } = apiBot.toObject();
  return { id: _id.toString(), ...bot };
};

export const makeAPIBotToFrontBot = (apiBot: IAPIBot): IFrontBot => {
  const { _id, name, username, status, profileImgUrl } = apiBot.toObject();
  return { id: _id.toString(), name, username, status, profileImgUrl };
};

export const makeMaybeAPIBotToFrontBot = (
  apiBot: IAPIBot | null
): IFrontBot | null => (apiBot ? makeAPIBotToFrontBot(apiBot) : null);

export const handleGetBot = (botId: string): Promise<IAPIBot> =>
  Bot.findById(botId).then((bot) => {
    if (!bot) throw new Error('bot not found');
    return bot;
  });

export const handleGetMaybeBot = (botId: string): Promise<IAPIBot | null> =>
  Bot.findById(botId).then((bot) => (bot ? bot : null));
