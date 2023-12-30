import ThemeSelect from '@components/ThemeSelect';
import { Link } from '@tanstack/react-router';

const Nav = () => {
  return (
    <div className="flex justify-between p-4">
      <div className="flex gap-3">
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/admin/broadcasters">Admin broadcasters</Link>
      </div>

      <div>
        <ThemeSelect compact />
      </div>
    </div>
  );
};

export default Nav;
