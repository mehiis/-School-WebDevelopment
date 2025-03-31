'use strict';
import data from './data.js';
import utils from './utils.js';

let previousSearchWord = "";

//THE FUNCTIONALITY OF THE SEARCH BAR, FILTERING LOGIC WHEN WRITTEN
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const search = document.querySelector('#restaurant-search');

  if (previousSearchWord !== search.value) {
    data.filterWithWord(search.value);
    previousSearchWord = search.value;
  }
});

//DISPLAY THE !SIGN IN! MODALE
const signInButton = document.querySelector("#sign-in-button");
signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  openModal();
  displaySignIn();
});


//DISPLAY THE !SIGN UP! MODALE
const signUpButton = document.querySelector("#sign-up-button");
signUpButton.addEventListener("click", (event) => {
  event.preventDefault();
  openModal();
  displaySignUp();
});

async function createCards(listOfRestaurants) {
  const content = document.querySelector('#content');
  content.innerHTML = '';

  //CHECK IF THE LIST IS EMPTY, THEN DISPLAY ERROR MESSAGE, ELSE LOOP THROUGHT EVERY RESTAURANT AND CREATE CONTENT CARDS.
  if(listOfRestaurants.length === 0){
    const article = document.createElement('article');
    article.classList.add('content-card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('content-header');
    article.append(cardHeader);

    const search = document.querySelector('#restaurant-search');
    const errorText = document.createElement('p');
    errorText.innerText = `Hakusanalla "${search.value}" ei löytynyt yhtään ravintolaa...`;
    cardHeader.append(errorText);

    content.append(
      article
    );
  } else{
    for (const restaurant of listOfRestaurants) {
      await createContentCard(restaurant);
    }
  }
}

async function createContentCard(restaurant) {
  const content = document.querySelector('#content');

  const article = document.createElement('article');
  article.classList.add('content-card');

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('content-header');
  article.append(cardHeader);

  const restaurantName = document.createElement('h2');
  restaurantName.classList.add('restaurant-name');
  restaurantName.innerText = `${restaurant.name} (${restaurant.company})`;

  const heartButton = document.createElement('button');
  heartButton.classList.add('heart-button');

  heartButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(restaurant.name + ' added to favourites.');
  });

  const heartIcon = document.createElement('img');
  heartIcon.classList.add('heart-icon');
  heartIcon.src = './img/heart-unselected.png';
  heartIcon.alt =
    'Icon picture indicating that this is not selected as a favourite restautrant.';

  heartButton.append(heartIcon);

  cardHeader.append(restaurantName, heartButton);

  const restaurantAddress = document.createElement('p');
  restaurantAddress.classList.add('restaurant-address');
  restaurantAddress.innerHTML = `${restaurant.address}, ${restaurant.postalCode}, ${restaurant.city} <br> ${restaurant.phone}`;

  const todayHeader = document.createElement('h3');
  todayHeader.classList.add('clear');
  todayHeader.innerText = 'Tänään';

  const todayInMenu = document.createElement('p');

  let todayMenuItems = [];
  try {
    const todayMenuItemsResponse = await data.getDailyMenu(
      restaurant._id,
      'fi'
    );
    todayMenuItems = todayMenuItemsResponse.courses;
  } catch {
    /* empty */
  }

  for (const {name, price, diets} of todayMenuItems) {
    let checkedPrice = price;
    let checkDiets = diets;

    if (checkedPrice == undefined) {
      checkedPrice =
        '<i><span style="color: #ff0000">(Hinta ei saatavilla.)</span></i>';
    }

    if (checkDiets == undefined) {
      checkDiets =
        '<i><span style="color: #ff0000">(Allergeenit ei saatavilla.)</span></i>';
    }

    todayInMenu.innerHTML += `${name}  ${checkedPrice}  <strong>${checkDiets}</strong><br><br>`;
  }

  if (todayMenuItems[0] == null) {
    todayInMenu.innerHTML =
      '<p><i>Päivän ruokalistaa ei ole saatavilla... :(</i></p>';
  }

  const buttonDiv = document.createElement('div');

  const weeklyMenuButton = document.createElement('button');
  weeklyMenuButton.classList.add('content-card-button');
  weeklyMenuButton.innerText = 'KATSO VIIKON RUOKALISTA';
  weeklyMenuButton.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
    displayWeeklyMenu(restaurant);
  });

  const openMapLocationButton = document.createElement('button');
  openMapLocationButton.classList.add('content-card-button');
  openMapLocationButton.innerText = 'KATSO KARTALTA';
  openMapLocationButton.addEventListener('click', (event) => {
    event.preventDefault();

    openModal();
    displayMap(restaurant.location);
  });

  buttonDiv.append(weeklyMenuButton, openMapLocationButton);

  const separator = document.createElement('hr');
  separator.classList.add('separator');

  content.append(
    article,
    restaurantAddress,
    todayHeader,
    todayInMenu,
    buttonDiv,
    separator
  );
}

function hideModalContent() {
  const map = document.querySelector('#map');
  map.style.display = 'none';

  const weeklyMenu = document.querySelector('#weekly-menu');
  weeklyMenu.style.display = 'none';

  const signIn = document.querySelector('#sign-in');
  signIn.style.display = 'none';

  const signUp = document.querySelector('#sign-up');
  signUp.style.display = 'none';
}

function openModal() {
  hideModalContent();
  const mdl = document.querySelector('#modale');
  const closeButton = document.querySelector('#close-modal-button');
  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    closeModal();
  });

  mdl.showModal();
}

function closeModal() {
  hideModalContent();
  const mdl = document.querySelector('#modale');
  mdl.close();
}

async function displayWeeklyMenu(restaurant) {
  const weeklyMenu = document.querySelector('#weekly-menu');
  weeklyMenu.innerHTML = '';

  const weeklyMenuHeader = document.createElement('h2');
  weeklyMenuHeader.id = 'week-menu-header';
  weeklyMenuHeader.innerText = `${restaurant.name.toUpperCase()} - VIIKON RUOKALISTA`;
  weeklyMenu.append(weeklyMenuHeader);

  weeklyMenu.style.display = 'block';

  try {
    const menuOfWeekPromise = await data.getWeeklyMenu(restaurant._id, 'fi');
    const menuOfWeek = menuOfWeekPromise.days;

    for (const menu of menuOfWeek) {
      const date = document.createElement('h4');
      date.innerText = menu.date.toUpperCase();

      const food = document.createElement('p');
      for (const item of menu.courses) {
        let checkedPrice = item.price;
        let checkedDiets = item.diets;

        if (checkedPrice == undefined) {
          checkedPrice =
            '<i><span style="color: #ff0000">(Hinta ei saatavilla.)</span></i>';
        }

        if (checkedDiets == undefined) {
          checkedDiets =
            '<i><span style="color: #ff0000">(Allergeenit ei saatavilla.)</span></i>';
        }

        food.innerHTML += `${item.name}, ${checkedPrice}, <strong>${checkedDiets}</strong> <br> <br>`;
      }

      weeklyMenu.append(date, food);
    }
  } catch {
    const notFound = document.createElement('h4');
    notFound.innerText = 'Viikon ruokalistaa ei löytynyt. :(';

    weeklyMenu.append(notFound);
  }
}

function displayMap(location) {
  //SET HERE WHAT RESTAURANTS TO DISPLAY AND WHERE YOU ARE TMS YMS.
  const mapItem = document.querySelector('#map');
  mapItem.style.display = 'block';

  utils.mapClearMarkers();

  const fixedLocation = [location.coordinates[1], location.coordinates[0]];
  utils.mapAddRestaurantToMap(fixedLocation); //add restaurant to the map
  //PLAYER PIN POINT ADDED IN THE MAIN!!
  utils.mapInit();
}

function displaySignIn(){
  const signIn = document.querySelector('#sign-in');
  signIn.style.display = 'block';
}

function displaySignUp(){
  const signUp = document.querySelector('#sign-up');
  signUp.style.display = 'block';
}

export default {createCards};
