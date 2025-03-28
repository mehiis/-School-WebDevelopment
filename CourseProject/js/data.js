'use strict';
import utils from './utils.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

let listOfaLLRestaurants = [];
let listOfRestaurantsToShow = [];
let amountOfRestaurantsToLoad = 10;

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
  //Errors in when called in './js/components.js' @ createContentCards() function.
  return await utils.fetchData(
    `${apiUrl}/restaurants/daily/${id}/${language}/`
  );
}

export default {
  listOfaLLRestaurants,
  listOfRestaurantsToShow,
  fetchAllRestaurants,
  restaurantAmountToLoad,
  updateRestaurantsToLoad,
  getDailyMenu,
};
