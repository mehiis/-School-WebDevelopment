import React from 'react';

const MediaRow = (props) => {
  const {item} = props;

  return (
    <>
      <tr key={item.media_id}>
        <td>
          {item.thumbnail && <img src={item.thumbnail} alt={item.title} />}
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
      </tr>
    </>
  );
};

export default MediaRow;
