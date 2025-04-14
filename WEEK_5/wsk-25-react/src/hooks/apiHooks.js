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

export default useMedia;
