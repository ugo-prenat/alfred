import { Link } from '@tanstack/react-router';

const Nav = () => {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Link to="/login">Login</Link>
      <Link to="/">Home</Link>
      <Link to="/features">Features</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/admin/broadcasters">Admin broadcasters</Link>
    </div>
  );
};

export default Nav;
