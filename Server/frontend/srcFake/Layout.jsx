import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <div>
      <nav>
        <div id="Navbar">
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/artists">
                <button>Artists</button>
            </Link>
            <Link to="/albums">
                <button>Albums</button>
            </Link>
            <Link to="/tracks">
                <button>Tracks</button>
            </Link>
            <Link to="/platforms">
                <button>Platforms</button>
            </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
