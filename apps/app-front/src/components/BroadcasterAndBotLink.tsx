import { useAuthStore } from '@services/state/auth/auth.stores';
import { Skeleton } from './ui/shadcn/skeleton';
import { FC } from 'react';
import { BotStatus } from '@alfred/models';
import { Button } from './ui/shadcn/button';

const BroadcasterAndBotLink = () => {
  const { broadcaster, bot } = useAuthStore();

  return (
    <div className="flex flex-col mt-4 cursor-default">
      {broadcaster ? (
        <InfoDisplayer {...broadcaster} linkType="twitch.tv" />
      ) : (
        <SkeletonInfo />
      )}
      <span>----</span>
      {bot ? (
        <InfoDisplayer {...bot} linkType="twitter.com" />
      ) : (
        <SkeletonInfo />
      )}
    </div>
  );
};

interface IInfoProps {
  name: string;
  username: string;
  profileImgUrl: string;
  linkType: 'twitch.tv' | 'twitter.com';
}

interface Props extends IInfoProps {
  status?: BotStatus;
}

const InfoDisplayer: FC<Props> = ({
  name,
  username,
  profileImgUrl,
  linkType,
  status
}) => {
  const handleClick = () =>
    window.open(`https://${linkType}/${username}`, '_blank');

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="flex justify-start gap-3 p-2"
    >
      <img className="h-6 w-6 rounded-full" src={profileImgUrl} alt={name} />
      <p className="text-muted-foreground whitespace-nowrap text-ellipsis overflow-hidden">
        {name}
      </p>
    </Button>
  );
};

const SkeletonInfo = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[0px]" />
    </div>
  </div>
);

export default BroadcasterAndBotLink;
