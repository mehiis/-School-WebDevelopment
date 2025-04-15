import {Link, Outlet} from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';

const Layout = () => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
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
