import navigationLoggedIn from "./components/navigationLoggedIn.js";
import navigationLoggedOut from "./components/navigationLoggedOut.js";

let isLogin = false;

async function login() {
  isLogin = true;
  //console.log('Logged in succesfully. Is logged in: ', isLogin);

  await navigationLoggedIn.logInNav();
}

async function logout() {
  sessionStorage.removeItem('token');

  isLogin = false;
  //console.log('Logged out succesfully. Is logged in: ', isLogin);

  await navigationLoggedOut.logOutNav();
}

export default {login, logout};
