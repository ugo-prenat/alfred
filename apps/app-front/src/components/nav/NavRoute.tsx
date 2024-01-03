import { Outlet } from '@tanstack/react-router';
import Menu from './Menu';
import Header from './Header';

const NavRoute = () => (
  <div id="app" className="h-full flex flex-col">
    <Header />
    <div className="flex-1 flex">
      <Menu />
      <Outlet />
    </div>
  </div>
);

export default NavRoute;
