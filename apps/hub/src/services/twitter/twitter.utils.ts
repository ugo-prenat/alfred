import {
  Bot,
  IBot,
  ICreateTweetPayload,
  IRawTweet,
  ITwitchClip,
  ITwitchStream,
  ITwitterOAuthOptions,
  StreamOffline,
  StreamOnline,
  Tweet
} from '@alfred/models';
import { postTweet } from './twitter.api';
import { makeAPIBotToBot } from '../bots/bots.utils';

export const makeTwitterOAuthOptions = (): ITwitterOAuthOptions => ({
  api_key: process.env.TWITTER_API_KEY,
  api_secret_key: process.env.TWITTER_API_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

export const makeStreamOnlineTweetText = (
  event: StreamOnline,
  stream: ITwitchStream | null
): string => {
  const { broadcaster_user_name, broadcaster_user_login } = event;
  if (!stream)
    return `${broadcaster_user_name} just went live\nhttps://twitch.tv/${broadcaster_user_login}`;

  const { user_name, user_login, game_name, title } = stream;

  return `${user_name} just went live\n\n${title}\n\nplaying ${game_name}\n\nhttps://twitch.tv/${user_login}`;
};

export const makeStreamOfflineTweetText = (
  event: StreamOffline,
  clip: ITwitchClip | null
): string => {
  const { broadcaster_user_name } = event;

  if (!clip) return `${broadcaster_user_name} just went offline`;

  return `${broadcaster_user_name} just went offline\n\ncheck out the most popular clip of the stream:\n${clip.url}`;
};

export const createTweet = async (
  payload: ICreateTweetPayload,
  broadcasterId: string
) => {
  try {
    const { id: botId }: IBot = await Bot.findOne({
      broadcasterId
    }).then(makeAPIBotToBot);

    const { id: tweetId, text } = (await postTweet(payload)).data;

    const newTweet: IRawTweet = { tweetId, text, botId, broadcasterId };
    return Tweet.create(newTweet);
  } catch (err) {
    throw err;
  }
};
