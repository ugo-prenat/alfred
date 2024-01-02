import Page from '@components/Page';
import { Button } from '@components/ui/shadcn/button';
import { Link } from '@tanstack/react-router';

export const UnauthorizedPage = () => {
  return (
    <Page className="flex flex-col gap-4 items-center justify-center">
      <p>looks like you're not authorized to be here 🤨</p>
      <Link to="/onboarding">
        <Button>go back home</Button>
      </Link>
    </Page>
  );
};

export default UnauthorizedPage;
