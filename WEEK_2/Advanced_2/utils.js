const sortListAlphabeticly = (list) => {
  list.sort(function (a, b) {
    return a.name > b.name ? 1 : -1;
  });
};

const filterRestaurantsByCompany = (company, restaurants) => {
  const filteredRestaurants = restaurants.map();

  return filteredRestaurants;
}

export default {filterRestaurantsByCompany, sortListAlphabeticly};
