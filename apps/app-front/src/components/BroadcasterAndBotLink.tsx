import { useAuthStore } from '@services/state/auth/auth.stores';
import { FC } from 'react';
import { BotStatus } from '@alfred/models';
import { cn } from '@utils/tailwind.utils';
import { AlertTriangle, Link, Unlink } from 'lucide-react';
import { Skeleton } from './ui/shadcn/skeleton';

const BroadcasterAndBotLink = () => {
  const { broadcaster, bot } = useAuthStore();
  const isLinked = !!broadcaster && !!bot && bot.status === 'active';

  return (
    <div
      className={cn('relative flex gap-4 justify-center', {
        'gap-0': !broadcaster && !bot
      })}
    >
      {broadcaster ? (
        <Bubble {...broadcaster} linkType="twitch.tv" />
      ) : (
        <BubbleSkeleton />
      )}

      <div className="z-10 absolute top-[calc(50%-0.75rem)] left-[calc(50%-0.75rem)] flex items-center justify-center w-6 h-6 rounded-full bg-primary-foreground dark:bg-foreground shadow-md">
        {isLinked ? (
          <Link className="w-4 h-4 stroke-foreground dark:stroke-secondary stroke-2" />
        ) : (
          <Unlink className="w-4 h-4 stroke-foreground dark:stroke-secondary stroke-2" />
        )}
      </div>

      {bot ? <Bubble {...bot} linkType="twitter.com" /> : <BubbleSkeleton />}
    </div>
  );
};

interface IInfoProps {
  name: string;
  username: string;
  profileImgUrl: string;
  linkType: 'twitch.tv' | 'twitter.com';
}

interface IBubbleProps extends IInfoProps {
  status?: BotStatus;
}

const Bubble: FC<IBubbleProps> = ({
  username,
  profileImgUrl,
  linkType,
  status
}) => {
  return (
    <div className="relative">
      <span
        className={cn('absolute -top-2 -left-2 -z-10 w-14 h-14 rounded-full', {
          'bg-twitch/30': linkType === 'twitch.tv',
          'bg-twitter/40': linkType === 'twitter.com'
        })}
      ></span>

      {linkType === 'twitter.com' && status !== 'active' && (
        <span className="absolute -top-2 -left-2 flex items-center justify-center w-14 h-14 rounded-full bg-yellow-400/50">
          <AlertTriangle className="w-6 h-6 stroke-yellow-300" />
        </span>
      )}

      <img
        className={cn('h-10 w-10 rounded-full', {
          'opacity-20': linkType === 'twitter.com' && status !== 'active'
        })}
        src={profileImgUrl}
        alt={username}
      />
    </div>
  );
};

const BubbleSkeleton = () => <Skeleton className="w-14 h-14 rounded-full" />;

export default BroadcasterAndBotLink;
