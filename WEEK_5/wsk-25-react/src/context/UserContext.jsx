// UserContext.jsx
import {createContext, useState} from 'react';
import {useAuth, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuth();
  const {getUserByToken} = useUser(); //check if the token is valid
  const navigate = useNavigate(); //nav path
  const location = useLocation();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials) => {
    // TODO: post login credentials to API
    const loginResult = await postLogin(credentials);
    // TODO: set token to local storage
    window.localStorage.setItem('ilkan-token', loginResult.token);
    // TODO: set user to state
    setUser(loginResult.user);
    // TODO: navigate to home
    navigate('/'); //may not be valid place for handling navigation, bad place for reusability!?!?! t.ile
  };

  const handleLogout = () => {
    try {
      // TODO: remove token from local storage
      localStorage.removeItem('ilkan-token');
      // TODO: set user to null
      setUser(null);
      // TODO: navigate to home
      navigate('/');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      // TODO: get token from local storage
      const token = localStorage.getItem('ilkan-token');
      // TODO: if token exists, get user data from API
      if (token) {
        const userResult = await getUserByToken(token);
        // TODO: set user to state
        setUser(userResult.user);
        /*// TODO: navigate to home
        navigate('/');*/
        navigate(location.pathname);
      }
    } catch (e) {
      //if token not valid
      handleLogout();
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
