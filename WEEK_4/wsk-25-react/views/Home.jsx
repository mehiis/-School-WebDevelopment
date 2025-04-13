import React, {useEffect, useState} from 'react';
import MediaRow from '../src/components/MediaRow';
import SingleView from '../src/components/SingleView';
import {fetchData} from '../utils/fetchData.js';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  // console.log('selected item: ', selectedItem);

  useEffect(() => {
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

    getMedia();
  }, []);

  console.log('mediaArray main', mediaArray);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Owner</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};

export default Home;
