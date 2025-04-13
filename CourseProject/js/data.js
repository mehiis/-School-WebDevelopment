'use strict';
import components from './components.js';
import utils from './utils.js';
import user from './user.js';
import modal from './components/modal.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

let listOfaLLRestaurants = [];
let listOfRestaurantsToShow = [];
let amountOfRestaurantsToLoad = 10;

let userLocation;

async function fetchAllRestaurants() {
  try {
    listOfaLLRestaurants = await utils.fetchData(`${apiUrl}/restaurants/`);

    navigator.geolocation.getCurrentPosition(navSuccess, navError, navOptions);
  } catch {
    console.log('Could not fetch restaurants data.');
  }
}

function restaurantAmountToLoad(amount) {
  amountOfRestaurantsToLoad = amount;
}

function updateRestaurantsToLoad() {
  listOfRestaurantsToShow.length = []; //create empty array.

  for (let i = 0; i < amountOfRestaurantsToLoad; i++) {
    listOfRestaurantsToShow.push(listOfaLLRestaurants[i]);
  }
}

async function getDailyMenu(id, language) {
  //Errors catched in when called in './js/components.js' @ createContentCards() function.
  return await utils.fetchData(
    `${apiUrl}/restaurants/daily/${id}/${language}/`
  );
}

async function getWeeklyMenu(id, language) {
  //Errors catched in when called in './js/components.js' @ displayWeeklyMenu() function.
  return await utils.fetchData(
    `${apiUrl}/restaurants/weekly/${id}/${language}/`
  );
}

function filterWithWord(word) {
  listOfRestaurantsToShow = listOfaLLRestaurants.filter((r) => {
    return (
      r.city.toLowerCase().includes(word.toLowerCase()) ||
      r.name.toLowerCase().includes(word.toLowerCase()) ||
      r.postalCode.toLowerCase().includes(word.toLowerCase()) ||
      r.company.toLowerCase().includes(word.toLowerCase()) ||
      r.address.toLowerCase().includes(word.toLowerCase())
    );
  });

  components.createCards(listOfRestaurantsToShow);
}

//PLAYER LOCATION START
const navOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function navSuccess(pos) {
  const crd = pos.coords;
  userLocation = [crd.latitude, crd.longitude];
  utils.mapAddUserToMap(userLocation);

  listOfaLLRestaurants = listOfaLLRestaurants.sort(function (a, b) {
    let aLoc = [a.location.coordinates[1], a.location.coordinates[0]];
    let bLoc = [b.location.coordinates[1], b.location.coordinates[0]];
    return (
      utils.distance(userLocation, aLoc) - utils.distance(userLocation, bLoc)
    );
  });

  updateRestaurantsToLoad();
  listOfaLLRestaurants[0].name =
    '<span style="color:#ef2256;"><i>LÄHIN: </i></span>' +
    listOfaLLRestaurants[0].name;
  components.createCards(listOfRestaurantsToShow);
}

// Function to be called if an error occurs while retrieving location information
function navError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);

  updateRestaurantsToLoad();
  components.createCards(listOfRestaurantsToShow);
}
//PLAYER LOCATION END

//CHECK IF USERNAME IS AVAILABLE.
async function checkUsernameAvailability(username) {
  const response = await utils.fetchData(
    `${apiUrl}/users/available/${username}`
  );
  return response.available;
}

function validEmail(email){
  if(email.includes('@') && email.includes('.') && email.length > 3){
    return true;
  } else {
    return false;
  }

}

async function registerUser(username, email, password) {
  const data = {
    username: username,
    password: password,
    email: email,
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/users',
    fetchOptions
  );
  const json = await response.json();
  return response.status;
}

async function loginUser(username, password) {
  const data = {
    username: username,
    password: password,
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await utils.fetchData(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/auth/login',
      fetchOptions
    );

    window.sessionStorage.setItem('token', response.token);

    modal.closeModal();
    user.login();
  } catch {
    console.log('Login failed.');
  }
}

async function checkAuthorization(){
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await utils.fetchData(apiUrl + "/users/token", fetchOptions);
    return true;
  } catch {
    return false;
  }
}

async function getUserData(){
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await utils.fetchData(apiUrl + "/users/token", fetchOptions , {field: "asd"});
    user.favouriteRestaurantId = response.favouriteRestaurant;
    return response;
  } catch(e) { }
}

async function modifyUserData(newName, newEmail){
  try {
    const data = {
      username: newName,
      email: newEmail,
    };

    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await utils.fetchData(apiUrl + "/users", fetchOptions);

    console.log(response);
  } catch {
    console.log("error modifying user data....");
  }
}

async function changePassword(password){
  try {
    const data = {
      password: password
    };

    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await utils.fetchData(apiUrl + "/users", fetchOptions);

    console.log(response);
  } catch {
    console.log("error changing user password...");
  }
}

async function addFavouriteRestaurant(id){
  try {
    user.favouriteRestaurantId = String(id);
    const data = { favouriteRestaurant:id };

    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await utils.fetchData(apiUrl + "/users", fetchOptions);

    console.log(response);
  } catch {
    console.log("error adding favourite restaurant...");
  }
}

export default {
  listOfaLLRestaurants,
  listOfRestaurantsToShow,
  fetchAllRestaurants,
  restaurantAmountToLoad,
  updateRestaurantsToLoad,
  getDailyMenu,
  getWeeklyMenu,
  navError,
  navSuccess,
  filterWithWord,
  checkUsernameAvailability,
  validEmail,
  registerUser,
  loginUser,
  checkAuthorization,
  getUserData,
  modifyUserData,
  changePassword,
  addFavouriteRestaurant,
  navOptions,
};
