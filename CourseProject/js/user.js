import navigationLoggedIn from './components/navigationLoggedIn.js';
import navigationLoggedOut from './components/navigationLoggedOut.js';
import data from './data.js';

let isLogin = false;
let favouriteRestaurantId = '';

async function login() {
  isLogin = true;
  await navigationLoggedIn.logInNav();
  location.reload();
}

async function logout() {
  sessionStorage.removeItem('token');

  isLogin = false;
  await navigationLoggedOut.logOutNav();
  location.reload();
}

async function getUserInformation() {
  try {
    if (window.sessionStorage.getItem('token')) {
      const info = await data.getUserData();
      favouriteRestaurantId = info.favouriteRestaurant;
    }
  } catch {}
}

export default {
  login,
  logout,
  getUserInformation,
  favouriteRestaurantId,
  isLogin,
};
