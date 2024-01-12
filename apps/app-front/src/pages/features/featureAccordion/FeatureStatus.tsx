import { FeatureStatus as Status } from '@alfred/models';
import { useTranslation } from '@services/i18n/useTranslation';
import { Octagon, Triangle } from 'lucide-react';
import { FC } from 'react';

interface IFeatureStatusProps {
  status: Status;
}

// voir tailwind.config.js -> safelist
const STATUS_COLORS: Record<Status, string> = {
  enabled: 'success',
  disabled: 'destructive',
  unavailable: 'warning'
};

const FeatureStatus: FC<IFeatureStatusProps> = ({ status }) => {
  const t = useTranslation();
  const statusColor = STATUS_COLORS[status];

  const isEnable = status === 'enabled';
  const isDisable = status === 'disabled';
  const isUnavailable = status === 'unavailable';

  return (
    <div className="flex items-center gap-2">
      <p className={`font-normal text-${statusColor}`}>{t(status)}</p>

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
