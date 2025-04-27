import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const MediaRow = (props) => {
  const {item} = props;

  return (
    <>
      <tr key={item.media_id} className="*:border-2 *:border-[#ccc] *:p-4">
        <td className="text-center">
          {item.thumbnail && (
            <img
              className="object-cover"
              src={item.thumbnail}
              alt={item.title}
            />
          )}
        </td>
        <td className="text-center">{item.username}</td>
        <td className="text-center">{item.title}</td>

        <td className="text-left">{item.description}</td>
        <td className="text-center">
          {new Date(item.created_at).toLocaleString('fi-FI')}
        </td>
        <td className="text-center">{item.filesize}</td>
        <td className="text-center">{item.media_type}</td>
        <td className="p-0! text-center">
          <div className="flex gap-2 *:p-2">
            {/* <button onClick={handleClick}>View</button> */}
            <Link
              to="/single"
              state={{item}}
              className="border-2 text-center hover:bg-emerald-600"
            >
              Show
            </Link>
            {Boolean(localStorage.getItem('ilkan-token')) && (
              <>
                <button
                  type="button"
                  className="border-2 text-center hover:bg-sky-600"
                  onClick={() => {
                    console.log('edit clicked.');
                  }}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="border-2 text-center hover:bg-red-600"
                  onClick={() => {
                    console.log('delete clicked.');
                  }}
                >
                  delete
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  // setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
