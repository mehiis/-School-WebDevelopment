'use strict';
import data from './data.js';
import modal from './components/modal.js';
import navigationLoggedIn from './components/navigationLoggedIn.js';
import navigationLoggedOut from './components/navigationLoggedOut.js';
import user from './user.js';
import toggleMobileMenu from './components/mobileMenu.js';

let previousSearchWord = '';
let lastHeartedIcon;
let searchDone = true;

//THE FUNCTIONALITY OF THE SEARCH BAR, FILTERING LOGIC WHEN WRITTEN
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  if (searchDone) {
    const search = document.querySelector('#restaurant-search');

    if (previousSearchWord !== search.value) {
      await data.filterWithWord(search.value);
      previousSearchWord = search.value;
    }
  }
});

const mobileMenuButton = document.querySelector('#mobile-menu-button');
mobileMenuButton.addEventListener('click', (event) => {
  event.preventDefault();
  toggleMobileMenu();
});

async function loadNavBar() {
  const isLoggedIn = await data.checkAuthorization();

  if (!isLoggedIn) {
    navigationLoggedOut.logOutNav();
  } else {
    navigationLoggedIn.logInNav();
  }
}

async function createCards(listOfRestaurants) {
  searchDone = false;

  const content = document.querySelector('#content');
  content.innerHTML = ''; //MAKE SURE THE CONTENT IS EMPTY.

  //CHECK IF THE LIST IS EMPTY, THEN DISPLAY ERROR MESSAGE, ELSE LOOP THROUGHT EVERY RESTAURANT AND CREATE CONTENT CARDS.
  if (listOfRestaurants.length === 0) {
    const article = document.createElement('article');
    article.classList.add('content-card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('content-header');
    article.append(cardHeader);

    const search = document.querySelector('#restaurant-search');
    const errorText = document.createElement('p');
    errorText.innerText = `Hakusanalla "${search.value}" ei löytynyt yhtään ravintolaa...`;
    cardHeader.append(errorText);
    content.append(article);
  } else {
    for (const restaurant of listOfRestaurants) {
      await createContentCard(restaurant);
    }
  }

  searchDone = true;
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
  restaurantName.innerHTML = `${restaurant.name} (${restaurant.company})`;

  const heartButton = document.createElement('button');
  heartButton.classList.add('heart-button');

  const heartIcon = document.createElement('img');
  heartIcon.classList.add('heart-icon');

  try {
    if (window.sessionStorage.getItem('token')) {
      const info = await data.getUserData();
      const favouriteRestaurantId = info.favouriteRestaurant;

      if (favouriteRestaurantId === restaurant._id) {
        lastHeartedIcon = heartIcon;
        heartIcon.src = './img/heart-selected.png';
        heartIcon.alt =
          'Icon picture indicating that this is selected as a favourite restaurant.';
      } else {
        removeLastHeartIcon(heartIcon);
      }
    }
  } catch {
    removeLastHeartIcon(heartIcon);
  }

  heartButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const isLoggedIn = await data.checkAuthorization();

    if (!isLoggedIn) {
      modal.openModal();
      modal.displaySignIn();
      return;
    }

    if (lastHeartedIcon !== undefined) {
      removeLastHeartIcon(lastHeartedIcon);
    }

    lastHeartedIcon = heartIcon;
    heartIcon.src = './img/heart-selected.png';
    heartIcon.alt =
      'Icon picture indicating that this is selected as a favourite restaurant.';
    data.addFavouriteRestaurant(restaurant._id);
  });

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

  weeklyMenuButton.addEventListener('click', async (event) => {
    event.preventDefault();
    modal.openModal();
    modal.displayWeeklyMenu(restaurant);
  });

  const openMapLocationButton = document.createElement('button');
  openMapLocationButton.classList.add('content-card-button');
  openMapLocationButton.innerText = 'KATSO KARTALTA';
  openMapLocationButton.addEventListener('click', (event) => {
    event.preventDefault();

    modal.openModal();
    modal.displayMap(restaurant.location);
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

function removeLastHeartIcon(icon) {
  icon.src = './img/heart-unselected.png';
  icon.alt =
    'Icon picture indicating that this is selected as a favourite restautrant.';
}

export default {createCards, loadNavBar, removeLastHeartIcon, lastHeartedIcon};
