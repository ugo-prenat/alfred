import { FeatureStatus as Status } from '@alfred/models';
import { Octagon, Triangle } from 'lucide-react';
import { FC } from 'react';

interface IFeatureStatusProps {
  status: Status;
}

const STATUS_COLORS: Record<Status, string> = {
  enabled: 'green-500',
  disabled: 'red-500',
  unavailable: 'yellow-500'
};

const FeatureStatus: FC<IFeatureStatusProps> = ({ status }) => {
  const statusColor = STATUS_COLORS[status];

  const isEnable = status === 'enabled';
  const isDisable = status === 'disabled';
  const isUnavailable = status === 'unavailable';

  return (
    <div className="flex items-center gap-2">
      <p className={`font-normal text-${statusColor}`}>{status}</p>

      {isEnable && (
        <span className={`block w-2 h-2 rounded-full bg-${statusColor}`}></span>
      )}
      {isDisable && (
        <Octagon className="w-3 h-3 fill-destructive stroke-destructive" />
      )}
      {isUnavailable && (
        <Triangle className="w-3 h-3 fill-warning stroke-warning" />
      )}
    </div>
  );
};

export default FeatureStatus;
