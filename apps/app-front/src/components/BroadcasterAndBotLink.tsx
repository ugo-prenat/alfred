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
        <InfoDisplayer {...broadcaster!} linkType="twitch.tv" />
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

interface IInfoDisplayerProps extends IInfoProps {
  status?: BotStatus;
}

const InfoDisplayer: FC<IInfoDisplayerProps> = ({
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
      className="flex justify-start gap-3 px-2 py-0"
    >
      <img className="h-6 w-6 rounded-full" src={profileImgUrl} alt={name} />
      <p className="text-muted-foreground whitespace-nowrap text-ellipsis overflow-hidden">
        {name}uuuuuuuuulatre long
      </p>
    </Button>
  );
};

const SkeletonInfo = () => (
  <div className="flex items-center gap-3 p-2">
    <Skeleton className="h-6 w-6 rounded-full" />
    <Skeleton className="h-4 flex-1" />
  </div>
);

export default BroadcasterAndBotLink;
