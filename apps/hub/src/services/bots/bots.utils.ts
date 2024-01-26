import { Bot, IAPIBot, IBot, IRawBot } from '@alfred/models';

export const makeAPIBotToBot = (apiBot: IAPIBot | null): IBot => {
  if (!apiBot) throw new Error('Bot not found');

  const { _id, ...bot } = apiBot.toObject();
  return { id: _id.toString(), ...bot };
};

export const getBot = (searchParams: Partial<IRawBot>): Promise<IAPIBot> =>
  Bot.findOne(searchParams)
    .then((bot: IAPIBot | null) => {
      if (!bot)
        throw new Error(
          `Bot not found for params ${JSON.stringify(searchParams)}}`
        );
      return bot;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
