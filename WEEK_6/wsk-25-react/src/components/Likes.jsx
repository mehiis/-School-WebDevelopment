import React, {useState, useEffect} from 'react';
import {useLike, useUser} from '../hooks/apiHooks';

const Likes = ({mediaId}) => {
  const {getLikesByMediaId, getLikesByUser, postLike, deleteLike} = useLike();
  const [likes, setLikes] = useState(0); // Stores all likes for the media
  const [userLikes, setUserLikes] = useState(false); // Tracks if the current user liked it
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  const handleClick = async () => {
    if (userLikes) {
      deleteLike(mediaId, localStorage.getItem('ilkan-token'));
    } else {
      postLike(mediaId, localStorage.getItem('ilkan-token'));
    }

    setLikes(await getLikesByMediaId(mediaId));
    setUserLikes(
      await getLikesByUser(mediaId, localStorage.getItem('ilkan-token')),
    );
  };

  // Example useEffect to fetch likes from API
  useEffect(() => {
    // This would be replaced with your actual API call
    const fetchLikes = async () => {
      try {
        setLikes(await getLikesByMediaId(mediaId));
        setUserLikes(
          await getLikesByUser(mediaId, localStorage.getItem('ilkan-token')),
        );

        if (localStorage.getItem('ilkan-token')) {
          const userResult = await getUserByToken(
            localStorage.getItem('ilkan-token'),
          );
          setUser(userResult.user);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [likes, userLikes]);

  return (
    <div>
      <p className="my-2 font-bold">Total Likes: {likes}</p>
      {user && (
        <button onClick={handleClick} className="my-2 border-4 p-4">
          {userLikes ? 'Unlike' : 'Like'}
        </button>
      )}
    </div>
  );
};

export default Likes;
