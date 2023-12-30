import { Button } from '@components/ui/shadcn/button';
import { toast } from 'sonner';

const FeaturesPage = () => {
  const handleCLick = () => {
    toast.loading('toasted', {
      action: {
        label: 'action',
        onClick: () => {
          console.log('clicked');
        }
      },
      dismissible: true
    });
  };

  return (
    <div>
      <p>Features</p>
      <Button className="animate-in zoom-in duration-500" onClick={handleCLick}>
        toast
      </Button>
    </div>
  );
};

export default FeaturesPage;
