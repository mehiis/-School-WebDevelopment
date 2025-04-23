import {Link, Outlet} from 'react-router';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useUserContext} from '../src/hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-ce m-4 text-2xl font-bold">My App</h1>
        <nav className="mb-4">
          <ul className="flex justify-end overflow-hidden bg-stone-900">
            <li>
              <Link
                className="block p-4 text-center text-stone-50 hover:bg-stone-600"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block p-4 text-center text-stone-50 hover:bg-stone-600"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center text-stone-50 hover:bg-stone-600"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center text-stone-50 hover:bg-stone-600"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block p-4 text-center text-stone-50 hover:bg-stone-600"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
