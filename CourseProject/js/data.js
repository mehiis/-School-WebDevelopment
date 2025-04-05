'use strict';
import components from './components.js';
import utils from './utils.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

let listOfaLLRestaurants = [];
let listOfRestaurantsToShow = [];
let amountOfRestaurantsToLoad = 10;

let userLocation;

async function fetchAllRestaurants() {
  try {
    listOfaLLRestaurants = await utils.fetchData(`${apiUrl}/restaurants/`);
  } catch {
    console.log('Could not fetch restaurants data.');
  }

  console.log(listOfaLLRestaurants);
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

  console.log('User coordiantes: ' + userLocation);
}

// Function to be called if an error occurs while retrieving location information
function navError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
//PLAYER LOCATION END

//CHECK IF USERNAME IS AVAILABLE.
async function checkUsernameAvailability(username){
  const response = await utils.fetchData(`https://media2.edu.metropolia.fi/restaurant/api/v1/users/available/${username}`);
  return response.available
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
  navOptions,
};
