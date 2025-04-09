import utils from '../utils.js'
import data from '../data.js'

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

function hideModalContent() {
  const map = document.querySelector('#map');
  map.style.display = 'none';

  const weeklyMenu = document.querySelector('#weekly-menu');
  weeklyMenu.style.display = 'none';

  const signIn = document.querySelector('#sign-in');
  signIn.style.display = 'none';

  const signUp = document.querySelector('#sign-up');
  signUp.style.display = 'none';

  const username = document.querySelector("#new-username");
  username.value = "";
  const email = document.querySelector("#new-email");
  email.value = "";
  const password = document.querySelector("#new-password");
  password.value = "";

  const myPage = document.querySelector('#my-page');
  myPage.style.display = 'none';


}

async function displayWeeklyMenu(restaurant) {
  console.log('r', restaurant);

  const weeklyMenu = document.querySelector('#weekly-menu');
  weeklyMenu.innerHTML = '';

  const weeklyMenuHeader = document.createElement('h2');
  weeklyMenuHeader.id = 'week-menu-header';
  weeklyMenuHeader.innerHTML = `${restaurant.name.toUpperCase()} - VIIKON RUOKALISTA`;
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

    if(menuOfWeek.length === 0){
      const notFound = document.createElement('h4');
      notFound.innerText = 'Viikon ruokalistaa ei löytynyt. :(';

    weeklyMenu.append(notFound);
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

async function displayMyPage(){
  const userData = await data.getUserData();
  const myPage = document.querySelector('#my-page');

  const idInput = document.querySelector("#my-id");
  idInput.value = userData._id;

  const usernameInput = document.querySelector("#my-username");
  usernameInput.value = userData.username;

  const emailInput = document.querySelector("#my-email");
  emailInput.value = userData.email;

  const password = document.querySelector("#my-password");

  const modifyButton = document.querySelector("#modify-user");
  const confirmModificationButton = document.querySelector("#confirm-user");
  modifyButton.style.display = 'block';
  confirmModificationButton.style.display = 'none';

  usernameInput.disabled = true;
  emailInput.disabled = true;
  password.value = "PASSWORD";
  password.disabled = true;

  modifyButton.addEventListener('click', (event) => {
    event.preventDefault();

    usernameInput.disabled = false;
    emailInput.disabled = false;
    password.value = "";
    password.disabled = false;

    modifyButton.style.display = 'none';
    confirmModificationButton.style.display = 'block';
  });

  confirmModificationButton.addEventListener('click', (event) => {
      event.preventDefault();

      usernameInput.disabled = true;
      emailInput.disabled = true;
      password.value = "PASSWORD";
      password.disabled = true;

      //POST MODIFIED USER DATA!

      confirmModificationButton.style.display = 'none';
      modifyButton.style.display = 'block';
  });


  myPage.style.display = 'block';
}


export default {openModal, closeModal, displayMap, displaySignIn, displaySignUp, displayWeeklyMenu, displayMyPage}
