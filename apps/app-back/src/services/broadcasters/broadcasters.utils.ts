import { IRawBroadcaster, ITwitchBroadcaster } from '@stats-station/models';

export const makeRawBroadcaster = (
  twitchBroadcaster: ITwitchBroadcaster,
  twitchToken: string
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
    botId: 'tempBotId',
    username: login,
    twitchId: id,
    role: 'member',
    twitchToken,
    profileImgUrl: profile_image_url,
    broadcasterType: broadcaster_type
  };
};
