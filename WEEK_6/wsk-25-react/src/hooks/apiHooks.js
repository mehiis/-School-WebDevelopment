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

    setMediaArray(newData);
  };

  //modifyMedia{}
  //deleteMedia{}

  console.log('mediaArray getMedia()', mediaArray);

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = async (file, inputs, token) => {
    const data = {
      ...inputs,
      ...file,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions,
    );
  };

  return {mediaArray, postMedia};
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

const useFile = () => {
  const postFile = async (file, token) => {
    // TODO: create FormData object
    const formData = new FormData();
    formData.append('file', file);

    // TODO: add file to FormData
    // TODO: upload the file to file server and get the file data (url = import.meta.env.VITE_UPLOAD_SERVER + '/upload')

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      mode: 'cors',
      body: formData,
    };

    return await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
    // TODO: return the file data.
  };

  return {postFile};
};

const useLike = () => {
  const postLike = async (mediaId, token) => {
    const data = {
      media_id: mediaId,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    await fetchData(import.meta.env.VITE_MEDIA_API + '/likes', fetchOptions);
  };

  const deleteLike = async (mediaId, token) => {
    const fetchOptionsForUserData = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };

    const fetchOptionsForDelete = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + token,
        'Content-Type': 'application/json',
      },
    };

    const userData = await fetchData(
      import.meta.env.VITE_MEDIA_API + `/likes/bymedia/user/${mediaId}`,
      fetchOptionsForUserData,
    );

    await fetchData(
      import.meta.env.VITE_MEDIA_API + `/likes/${userData.like_id}`,
      fetchOptionsForDelete,
    );
  };

  const getLikesByMediaId = async (mediaId) => {
    //DONE
    const data = await fetchData(
      import.meta.env.VITE_MEDIA_API + `/likes/bymedia/${mediaId}`,
    );

    return data.length;
  };

  const getLikesByUser = async (mediaId, token) => {
    //DONE
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer: ' + token,
        },
      };

      const data = await fetchData(
        import.meta.env.VITE_MEDIA_API + `/likes/bymedia/user/${mediaId}`,
        fetchOptions,
      );

      return Boolean(data);
    } catch {
      return false;
    }
  };

  return {postLike, deleteLike, getLikesByMediaId, getLikesByUser};
};

export {useMedia, useAuth, useUser, useFile, useLike};
