import { IAPIBot, IBot } from '@alfred/models';

export const makeAPIBotToBot = (apiBot: IAPIBot | null): IBot => {
  if (!apiBot) throw new Error('Bot not found');

  const { _id, ...bot } = apiBot.toObject();
  return { id: _id.toString(), ...bot };
};
