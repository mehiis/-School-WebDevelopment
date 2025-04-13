import components from '../components.js';
import user from '../user.js';
import modal from './modal.js';

function logInNav(){
  user.getUserInformation();
  const nav = document.querySelector("#desktop-navigation");
  nav.innerHTML = "";

  const myInfoLi = document.createElement("li");
  const myInfoButton = document.createElement("button");
  myInfoButton.classList.add("nav-button");
  myInfoButton.innerText = "Omat tiedot"
  myInfoLi.append(myInfoButton);

  const logOutLi = document.createElement("li");
  const logOutButton = document.createElement("button");
  logOutButton.classList.add("nav-button");
  logOutButton.innerText = "Kirjaudu ulos"
  logOutLi.append(logOutButton);

  nav.append(myInfoLi, logOutLi);

  logOutButton.addEventListener('click', (event) => {
    event.preventDefault();

    if(components.lastHeartedIcon !== undefined){
      components.removeLastHeartIcon(components.lastHeartedIcon);
      console.log("remove heart??");
    } else{
      console.log(components.lastHeartedIcon);
    }

    user.logout();
  });

  myInfoButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.openModal();
    modal.displayMyPage();
  });
}

  export default {logInNav};
