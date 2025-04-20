import components from '../components.js';
import user from '../user.js';
import modal from './modal.js';
import toggleMobileMenu from './mobileMenu.js';

function logInNav() {
  user.getUserInformation();

  const nav = document.querySelector('#desktop-navigation');
  logInNavMobile();
  nav.innerHTML = '';

  const myInfoLi = document.createElement('li');
  const myInfoButton = document.createElement('button');
  myInfoButton.classList.add('nav-button');
  myInfoButton.innerText = 'Omat tiedot';
  myInfoLi.append(myInfoButton);

  const favRestaurantLi = document.createElement('li');
  const favRestaurantButton = document.createElement('button');
  favRestaurantButton.classList.add('nav-button');
  favRestaurantButton.innerText = 'Suosikki';
  favRestaurantLi.append(favRestaurantButton);

  const logOutLi = document.createElement('li');
  const logOutButton = document.createElement('button');
  logOutButton.classList.add('nav-button');
  logOutButton.innerText = 'Kirjaudu ulos';
  logOutLi.append(logOutButton);

  nav.append(myInfoLi, favRestaurantLi, logOutLi);

  logOutButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (components.lastHeartedIcon !== undefined) {
      components.removeLastHeartIcon(components.lastHeartedIcon);
    }

    user.logout();
  });

  myInfoButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.openModal();
    modal.displayMyPage();
  });

  favRestaurantButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.openModal();
    modal.displayFavouriteRestaurant();
  });
}

function logInNavMobile() {
  const nav = document.querySelector('#mobile-menu-modal');
  nav.innerHTML = '';

  //CLOSE BUTTON
  const closeLi = document.createElement('li');
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-menu-button');
  closeButton.innerHTML = '&#10006;';
  closeLi.append(closeButton);

  //MY INFOMARTION BUTTON
  const myInfoLi = document.createElement('li');
  const myInfoButton = document.createElement('button');
  myInfoButton.innerText = 'Omat tiedot';
  myInfoButton.classList.add('menu-button');
  myInfoLi.append(myInfoButton);

  //FAV RESTAURANT BUTTON
  const favRestaurantLi = document.createElement('li');
  const favRestaurantButton = document.createElement('button');
  favRestaurantButton.innerText = 'Suosikki ravintola';
  favRestaurantButton.classList.add('menu-button');
  favRestaurantLi.append(favRestaurantButton);

  //LOGOUT BUTTON
  const logoutLi = document.createElement('li');
  const logoutButton = document.createElement('button');
  logoutButton.innerText = 'Kirjaudu ulos';
  logoutButton.classList.add('menu-button');
  logoutLi.append(logoutButton);

  const content = document.createElement('ul');
  content.classList.add('list-strip');
  content.append(closeLi, myInfoLi, favRestaurantLi, logoutLi);
  nav.append(content);

  myInfoButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMobileMenu();

    modal.openModal();
    modal.displayMyPage();
  });

  favRestaurantButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMobileMenu();

    modal.openModal();
    modal.displayFavouriteRestaurant();
  });

  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMobileMenu();

    if (components.lastHeartedIcon !== undefined) {
      components.removeLastHeartIcon(components.lastHeartedIcon);
    }

    user.logout();
  });

  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMobileMenu();
  });
}

export default {logInNav};
