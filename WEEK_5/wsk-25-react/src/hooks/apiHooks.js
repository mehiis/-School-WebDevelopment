import React, {useEffect, useState} from 'react';
import {fetchData} from '../../utils/fetchData';

function useMedia() {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    const mediaData = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
    );

    const url = import.meta.env.VITE_AUTH_API;
    const newData = await Promise.all(
      mediaData.map(async (item) => {
        const data = await fetchData(url + '/users/' + item.user_id);

        return {...item, username: data.username};
      }),
    );

    console.log('mediaArray getMedia()', mediaArray);

    setMediaArray(newData);
  };

  useEffect(() => {
    getMedia();
  }, []);

  return mediaArray;
}

const useAuth = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
        'Content-Type': 'application/json',
      },
    };

    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );

    console.log('userResult', userResult);

    return userResult;
  };

  return {getUserByToken, postUser};
};

export {useMedia, useAuth, useUser};
