let isLogin = false;

function login() {
  isLogin = true;
  console.log('Logged in ', isLogin);
}

function logout() {
  isLogin = false;
  console.log('Logged out ', isLogin);
}

export default {login, logout};
