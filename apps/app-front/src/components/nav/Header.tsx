import { GitHub } from '@assets/icons/GitHub';
import { X } from '@assets/icons/X';
import LangSelect from '@components/LangSelect';
import ThemeSelect from '@components/ThemeSelect';
import IconLink from '@components/ui/IconLink';
import { Separator } from '@components/ui/shadcn/separator';

const Header = () => {
  return (
    <div className="h-12 flex justify-between items-center px-6 border-b dark:border-primary-foreground">
      <p></p>

      <div className="flex items-center gap-x-2">
        <LangSelect compact />
        <ThemeSelect compact />

        <Separator orientation="vertical" className="h-6" />

        <IconLink
          icon={<GitHub className="w-[15px] h-[15px]" />}
          href="https://github.com/ugo-prenat/alfred"
        />
        <IconLink
          icon={<X className="w-[14px] h-[14px]" />}
          href="https://twitter.com/AlfredStats"
        />
      </div>
    </div>
  );
};

export default Header;
