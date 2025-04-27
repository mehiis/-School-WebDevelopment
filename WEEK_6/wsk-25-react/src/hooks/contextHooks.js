// contextHooks.js
import {useContext} from 'react';
//import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext';

// Current recommendation is to use custom hook instead of the context directly
// this way we don't have errors when UserContext is not defined or null (thats why we have the if statement)

// const tokenIs = () => {
//   Boolean(true);
// };

const useUserContext = () => {
  const context = useContext(UserContext);
  //const [isLoggedIn, setIsLoggedIn] = useState(tokenIs);
  if (!context) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  //setIsLoggedIn(tokenIs);

  return context;
};

export {useUserContext};
