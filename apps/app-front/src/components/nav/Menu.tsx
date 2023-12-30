import { Link } from '@tanstack/react-router';

const Menu = () => {
  return (
    <div className="h-full flex flex-col px-2 py-6 border-r">
      <div className="flex flex-col gap-3">
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/admin/broadcasters">Admin broadcasters</Link>
      </div>
    </div>
  );
};

export default Menu;
