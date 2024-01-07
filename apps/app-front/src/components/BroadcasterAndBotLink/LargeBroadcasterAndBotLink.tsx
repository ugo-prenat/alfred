import { FC } from 'react';
import { IDisplayerProps } from './BroadcasterAndBotLink';
import { Button } from '@components/ui/shadcn/button';
import { Skeleton } from '@components/ui/shadcn/skeleton';
import { useAuthStore } from '@services/state/auth/auth.stores';

const LargeBroadcasterAndBotLink = () => {
  const { broadcaster, bot } = useAuthStore();
  const isBotLinked = !!broadcaster && !!bot && bot.status === 'active';

  return (
    <div className="flex flex-col">
      {broadcaster ? (
        <InfoDisplayer {...broadcaster!} linkType="twitch.tv" />
      ) : (
        <SkeletonInfo />
      )}

      {bot ? (
        <InfoDisplayer
          {...bot}
          linkType="twitter.com"
          isBotLinked={isBotLinked}
        />
      ) : (
        <SkeletonInfo />
      )}
    </div>
  );
};

const InfoDisplayer: FC<IDisplayerProps> = ({
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

export default LargeBroadcasterAndBotLink;
