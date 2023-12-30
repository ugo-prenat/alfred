import { Button } from '@components/ui/shadcn/button';
import { useTranslation } from '@services/i18n/useTranslation';
import { toast } from 'sonner';

const FeaturesPage = () => {
  const t = useTranslation();

  const handleCLick = () => {
    toast('toasted', {
      action: {
        label: 'action',
        onClick: () => {
          console.log('clicked');
        }
      }
    });
  };

  return (
    <div>
      <p>{t('features.title')}</p>
      <Button className="animate-in zoom-in duration-500" onClick={handleCLick}>
        toast
      </Button>
    </div>
  );
};

export default FeaturesPage;
