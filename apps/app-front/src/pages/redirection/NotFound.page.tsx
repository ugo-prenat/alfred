import Page from '@components/Page';
import { Button } from '@components/ui/shadcn/button';
import { Link } from '@tanstack/react-router';

const NoteFoundPage = () => {
  return (
    <Page>
      <p>Page not found</p>
      <Link to="/features">
        <Button>go back home</Button>
      </Link>
    </Page>
  );
};

export default NoteFoundPage;
