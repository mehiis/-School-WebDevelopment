import components from './components.js';

//MAIN FUCNTION -> Better to be in the end.
const main = async () => {
  await components.getAllRestaurants();
  components.sortAlphabeticly();
  components.createTable();
};

main(); //EXECUTE!
