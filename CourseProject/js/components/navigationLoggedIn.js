import user from '../user.js';
import modal from './modal.js';

function logInNav(){
  const nav = document.querySelector("#desktop-navigation");
  nav.innerHTML = "";

  const myInfoLi = document.createElement("li");
  const myInfoButton = document.createElement("button");
  myInfoButton.classList.add("nav-button");
  myInfoButton.innerText = "Omat tiedot"
  myInfoLi.append(myInfoButton);

  const favouritesLi = document.createElement("li");
  const favouritesButton = document.createElement("button");
  favouritesButton.classList.add("nav-button");
  favouritesButton.innerText = "Suosikit"
  favouritesLi.append(favouritesButton);

  const logOutLi = document.createElement("li");
  const logOutButton = document.createElement("button");
  logOutButton.classList.add("nav-button");
  logOutButton.innerText = "Kirjaudu ulos"
  logOutLi.append(logOutButton);

  nav.append(myInfoLi, favouritesLi, logOutLi);

  logOutButton.addEventListener('click', (event) => {
    event.preventDefault();
    user.logout();
  });

  myInfoButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("asd");
    modal.openModal();
    modal.displayMyPage();
  });
}

  export default {logInNav};
