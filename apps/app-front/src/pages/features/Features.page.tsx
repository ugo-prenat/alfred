import Page from '@components/Page';
import { Title } from '@components/ui/Typography';
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
    <Page>
      <Title>{t('features.title')}</Title>
      <Button className="animate-in zoom-in duration-500" onClick={handleCLick}>
        toast
      </Button>
    </Page>
  );
};

export default FeaturesPage;
