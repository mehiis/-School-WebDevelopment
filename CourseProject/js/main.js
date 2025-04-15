'use strict';

import components from './components.js';
import data from './data.js';

async function main() {
  components.loadNavBar();
  data.fetchAllRestaurants(); //Fetch all restaurants to an array.
  data.restaurantAmountToLoad(10); //how many restaurants would you like to load on a website at a time.

  await data.updateRestaurantsToLoad();
}

main();
