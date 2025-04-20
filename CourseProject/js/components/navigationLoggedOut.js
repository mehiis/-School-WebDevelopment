import modal from './modal.js';
import data from '../data.js';
import utils from '../utils.js';
import toggleMobileMenu from './mobileMenu.js';

function logOutNav() {
  const nav = document.querySelector('#desktop-navigation');
  logOutNavMobile();
  nav.innerHTML = '';

  const signInLi = document.createElement('li');
  const signInButton = document.createElement('button');
  signInButton.classList.add('nav-button');
  signInButton.id = 'sign-in-button';
  signInButton.innerText = 'Kirjaudu';
  signInLi.append(signInButton);

  const signUpLi = document.createElement('li');
  const signUpButton = document.createElement('button');
  signUpButton.classList.add('nav-button');
  signUpButton.id = 'sign-up-button';
  signUpButton.innerText = 'Rekisteröidy';
  signUpLi.append(signUpButton);

  nav.append(signInLi, signUpLi);

  //DISPLAY THE !SIGN IN! MODALE
  signInButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.openModal();
    modal.displaySignIn();
  });

  //DISPLAY THE !SIGN UP! MODALE
  signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.openModal();
    modal.displaySignUp();
  });

  const loginButton = document.querySelector('#login-button');
  loginButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const infoText = document.querySelector("#info-text-login");
    infoText.innerText = "";

    const promise = await data.loginUser(username, password);
    console.log("asd", promise);

    if(promise === undefined){
      infoText.innerText = "Virhe! Kirjautuminen ei onnistunut!"
    }
  });

  const registerButton = document.querySelector('#register-button');
  registerButton.addEventListener('click', async (event) => {
    event.preventDefault();

    //FIRST CHECK LOGIN INFO
    const infoText = document.querySelector('#info-text-register');
    infoText.innerText = '';

    const username = document.querySelector('#new-username').value;
    const email = document.querySelector('#new-email').value;
    const password = document.querySelector('#new-password').value;
    const terms = document.querySelector('#terms').checked;
    const usernameHasSpaces = utils.checkForWhiteSpace(username);
    const emailHasSpaces = utils.checkForWhiteSpace(email);
    const passwordHasSpaces = utils.checkForWhiteSpace(password);

    //INVALID USERNAME
    if (usernameHasSpaces || username.length < 3) {
      infoText.innerText =
        'Käyttäjätunnus on oltava vähintään 4 merkkiä eikä sisällä välejä.';
      return;
    }

    //INVALID EMAIL
    if (emailHasSpaces || email.length < 3 || !email.includes('@')) {
      infoText.innerText = "Sähköpostissa on oltava '@' merkki.";
      return;
    }

    //INVALID PASSWORD
    if (passwordHasSpaces || password.length < 7) {
      infoText.innerText = 'Salasanan on oltava vähintää 8 merkkiä.';
      return;
    }

    //ACCEPT TERMS OF SERVICE!!!
    if (!terms) {
      infoText.innerText = 'Hyväksy käyttäjäehdot.';
      return;
    }

    const response = await data.checkUsernameAvailability(username);

    //CHECK IF THE USERNAME IS NOT TAKEN
    if (!response) {
      infoText.innerText = 'Käyttäjätunnus on jo käytössä.';
      return;
    } else {
      //USERNAME AVAILABLE PROCEED!
      const response = await data.registerUser(username, email, password);

      if (response == 200) {
        modal.closeModal();
      } else if (response == 400) {
        infoText.innerText = 'Sähköposti on jo käytössä.';
      } else {
        infoText.innerText =
          'Verkkovirhe, joku meni pieleen. Kokeile uudestaan.';
      }
    }
  });
}

function logOutNavMobile(){
  const nav = document.querySelector('#mobile-menu-modal');
  nav.innerHTML = '';

  //CLOSE BUTTON
  const closeLi = document.createElement("li");
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-menu-button");
  closeButton.innerHTML = "&#10006;";
  closeLi.append(closeButton);

  //SIGN IN BUTTON
  const signInLi = document.createElement("li");
  const signInButton = document.createElement("button");
  signInButton.innerText = "Kirjaudu sisään";
  signInButton.classList.add("menu-button");
  signInLi.append(signInButton);

  //REGISTER BUTTON
  const signUpLi = document.createElement("li");
  const signUpButton = document.createElement("button");
  signUpButton.innerText = "Rekisteröidy";
  signUpButton.classList.add("menu-button");
  signUpLi.append(signUpButton);

  const content = document.createElement("ul");
  content.classList.add("list-strip");
  content.append(closeLi, signInLi, signUpLi);
  nav.append(content);

  signInButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMobileMenu();

    modal.openModal();
    modal.displaySignIn();
  });

  signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMobileMenu();

    modal.openModal();
    modal.displaySignUp();
  });

  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMobileMenu();
  });
}

export default {logOutNav};
