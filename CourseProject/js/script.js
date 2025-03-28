'use strict';

import components from './components.js';
import data from './data.js';

async function main() {
  await data.fetchAllRestaurants(); //Fetch data from restaurants.
  data.restaurantAmountToLoad(10); //how many restaurants would you like to load on a website at a time.
  data.updateRestaurantsToLoad();

  components.createCards(data.listOfRestaurantsToShow);
}

main();
