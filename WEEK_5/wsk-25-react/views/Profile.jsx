import React from 'react';
import PropTypes from 'prop-types';
import {useUser} from '../src/hooks/apiHooks';
import {useState} from 'react';
import {useEffect} from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  const {getUserByToken} = useUser();

  const token = localStorage.getItem('ilkan-token');

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
      }
    };

    fetchUser();
  }, []);

  console.log('profile fetchUser', user);

  return (
    <>
      <h2>Profile</h2>

      {user && (
        <>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
          <p>
            Register date: {new Date(user?.created_at).toLocaleString('fi-FI')}
          </p>
        </>
      )}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
