import { Button } from '@components/ui/shadcn/button';
import { router } from '@services/router/index.routes';
import { useNavigate } from '@tanstack/react-router';

const BreadCrumb = () => {
  const navigate = useNavigate();

  const { pathname } = router.parseLocation();
  const paths = pathname.split('/').slice(1);

  const handleClick = (index: number) => () => {
    const to = `/${paths.slice(0, index + 1).join('/')}`;
    navigate({ to });
  };

  return (
    <div className="flex gap-4 mb-6">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return (
          <div key={index} className="flex gap-4">
            <Button
              variant="link"
              onClick={handleClick(index)}
              className="h-auto font-normal p-0 opacity-50 disabled:opacity-50 hover:opacity-100 transition-all"
              disabled={isLast}
            >
              {path}
            </Button>
            {!isLast && (
              <span className="cursor-default opacity-20 font-light">/</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
