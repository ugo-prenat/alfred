import { FC } from 'react';
import { BotStatus } from '@alfred/models';
import CompactBroadcasterAndBotLink from './CompactBroadcasterAndBotLink';
import LargeBroadcasterAndBotLink from './LargeBroadcasterAndBotLink';

interface IBroadcasterAndBotLinkProps {
  compact?: boolean;
}

export interface IInfoProps {
  name: string;
  username: string;
  profileImgUrl: string;
  linkType: 'twitch.tv' | 'twitter.com';
}

export interface IDisplayerProps extends IInfoProps {
  status?: BotStatus;
  isBotLinked?: boolean;
}

const BroadcasterAndBotLink: FC<IBroadcasterAndBotLinkProps> = ({
  compact = false
}) =>
  compact ? <CompactBroadcasterAndBotLink /> : <LargeBroadcasterAndBotLink />;

export default BroadcasterAndBotLink;
