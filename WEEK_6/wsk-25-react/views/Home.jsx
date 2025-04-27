import React, {useState} from 'react';
import MediaRow from '../src/components/MediaRow';
import SingleView from '../src/components/SingleView';
import {useMedia} from '../src/hooks/apiHooks';

const Home = () => {
  const {mediaArray} = useMedia();
  const [selectedItem, setSelectedItem] = useState(null);

  console.log('mediaArray main', mediaArray);
  return (
    <>
      <h2 className="ml-0 py-4 text-2xl font-bold">My Media</h2>
      <table>
        <thead>
          <tr className="*:border-2 *:border-[#ccc] *:p-4">
            <th className="text-center">Thumbnail</th>
            <th className="text-center">Owner</th>
            <th className="text-center">Title</th>
            <th className="text-center">Description</th>
            <th className="text-center">Created</th>
            <th className="text-center">Size</th>
            <th className="text-center">Type</th>
            <th className="text-center">Operations</th>
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
