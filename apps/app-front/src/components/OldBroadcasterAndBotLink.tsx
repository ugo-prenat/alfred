import { useAuthStore } from '@services/state/auth/auth.stores';
import { Skeleton } from './ui/shadcn/skeleton';
import { FC } from 'react';
import { BotStatus } from '@alfred/models';
import { Button } from './ui/shadcn/button';
import { Link, Unlink } from 'lucide-react';
import { cn } from '@utils/tailwind.utils';

const OldBroadcasterAndBotLink = () => {
  const { broadcaster, bot } = useAuthStore();

  return (
    <div className="flex flex-col mt-4 cursor-default">
      {broadcaster ? (
        <InfoDisplayer {...broadcaster!} linkType="twitch.tv" />
      ) : (
        <SkeletonInfo />
      )}

      <Seprarator isBotLinked={!!bot && bot.status !== 'active'} />

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
  linkType
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
        {name}
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

const Seprarator: FC<{ isBotLinked: boolean }> = ({ isBotLinked }) => {
  const iconClasses = 'w-4 h-4 rotate-12 bg-background stroke-muted-foreground';
  return (
    <span
      className={cn(
        'relative flex justify-center py-1',
        'before:w-full before:h-[1px] before:block before:absolute before:top-1/2 before:bg-border before:rounded-full'
      )}
    >
      {isBotLinked ? (
        <Link className={iconClasses} />
      ) : (
        <Unlink className={iconClasses} />
      )}
    </span>
  );
};

export default OldBroadcasterAndBotLink;
