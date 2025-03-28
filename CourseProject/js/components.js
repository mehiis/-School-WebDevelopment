'use strict';
import data from './data.js';
import utils from './utils.js';

async function createCards(listOfRestaurants) {
  for (const restaurant of listOfRestaurants) {
    await createContentCard(restaurant);
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
  restaurantName.innerText = restaurant.name;

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
  restaurantAddress.innerText = `${restaurant.address}, ${restaurant.postalCode}, ${restaurant.city}`;

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

    if(checkDiets == undefined){
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
    displayMap();
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
}

function openModal() {
  hideModalContent();
  const mdl = document.querySelector('#modale');
  const closeButton = document.querySelector("#close-modal-button");
  closeButton.addEventListener('click', (event) =>{
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

function displayWeeklyMenu(restaurant) {
  const weeklyMenu = document.querySelector('#weekly-menu');
  weeklyMenu.style.display = 'block';

  const weekMenu = data.getWeeklyMenu(restaurant, "fi");

  for(const menu of weekMenu){
    //JATKA TÄTÄ!!!!!!!!!!
    console.log(menu);
  }

}

function displayMap() {
  //SET HERE WHAT RESTAURANTS TO DISPLAY AND WHERE YOU ARE TMS YMS.

  const map = document.querySelector('#map');
  map.style.display = 'block';

  utils.mapInit();
}

export default {createCards};
