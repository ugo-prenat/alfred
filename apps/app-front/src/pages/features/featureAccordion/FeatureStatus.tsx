import { IFrontFeature, FeatureStatus as Status } from '@alfred/models';
import { useTranslation } from '@services/i18n/useTranslation';
import { Pause, Sparkles, Triangle } from 'lucide-react';
import { FC } from 'react';

interface IFeatureStatusProps {
  feature: IFrontFeature;
}

type FrontFeatureStatus = Status | 'coming-soon';

// voir tailwind.config.js -> safelist
const STATUS_COLORS: Record<FrontFeatureStatus, string> = {
  enabled: 'success',
  disabled: 'destructive',
  unavailable: 'warning',
  'coming-soon': 'twitter'
};

const FeatureStatus: FC<IFeatureStatusProps> = ({ feature }) => {
  const t = useTranslation();
  const { status, availability } = feature;

  const featureStatus: FrontFeatureStatus =
    availability === 'coming-soon' ? 'coming-soon' : status;

  const statusColor = STATUS_COLORS[featureStatus];

  const isComingSoon = featureStatus === 'coming-soon';
  const isEnable = featureStatus === 'enabled';
  const isDisable = featureStatus === 'disabled';
  const isUnavailable = featureStatus === 'unavailable';

  return (
    <div className="flex items-center gap-2">
      {isEnable && (
        <span
          className={`block w-2 h-2 rounded-full bg-${statusColor} animate-throb`}
        ></span>
      )}
      {isDisable && (
        <Pause className="w-3 h-3 fill-destructive stroke-destructive" />
      )}
      {isUnavailable && (
        <Triangle className="w-3 h-3 fill-warning stroke-warning" />
      )}
      {isComingSoon && (
        <Sparkles className="w-3 h-3 fill-twitter stroke-twitter" />
      )}

      <p className={`font-normal text-sm text-${statusColor}`}>
        {t(isComingSoon ? 'coming-soon' : featureStatus)}
      </p>
    </div>
  );
};

export default FeatureStatus;
