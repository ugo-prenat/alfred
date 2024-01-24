import { FC, cloneElement } from 'react';
import { Alert as ShadcnAlert, AlertDescription } from './shadcn/alert';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { Button } from './shadcn/button';
import { useTranslation } from '@services/i18n/useTranslation';

interface IAlertProps {
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface IAlertContainerProps extends IAlertProps {
  variant: 'error' | 'info' | 'success' | 'warning';
  icon: JSX.Element;
}

const Alert: FC<IAlertContainerProps> = ({ icon, variant, text, action }) => {
  return (
    <ShadcnAlert variant={variant} className="flex justify-between py-3">
      <div className="flex items-center gap-3">
        {cloneElement(icon, { className: 'w-5 h-5' })}
        <AlertDescription>{text}</AlertDescription>
      </div>
      {action && (
        <Button
          variant={variant}
          onClick={action.onClick}
          className="h-auto font-semibold py-2"
        >
          {action.label}
        </Button>
      )}
    </ShadcnAlert>
  );
};

export const WarningAlert: FC<IAlertProps> = (props) => (
  <Alert variant="warning" icon={<AlertTriangle />} {...props} />
);

export const InfoAlert: FC<IAlertProps> = (props) => (
  <Alert variant="info" icon={<Info />} {...props} />
);

export const SuccessAlert: FC<IAlertProps> = (props) => (
  <Alert variant="success" icon={<CheckCircle2 />} {...props} />
);

export const ErrorAlert: FC<IAlertProps> = (props) => (
  <Alert variant="error" icon={<XCircle />} {...props} />
);

export const ErrorAlertRetry: FC<{ text: string; fn: () => void }> = ({
  text,
  fn
}) => {
  const t = useTranslation();
  return <ErrorAlert text={text} action={{ label: t('retry'), onClick: fn }} />;
};
