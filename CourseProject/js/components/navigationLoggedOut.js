import modal from './modal.js';
import data from '../data.js';
import utils from '../utils.js';
import components from '../components.js';

function logOutNav(){
  const nav = document.querySelector("#desktop-navigation");
  nav.innerHTML = "";

  const signInLi = document.createElement("li");
  const signInButton = document.createElement("button");
  signInButton.classList.add("nav-button");
  signInButton.id = "sign-in-button";
  signInButton.innerText = "Kirjaudu"
  signInLi.append(signInButton);

  const signUpLi = document.createElement("li");
  const signUpButton = document.createElement("button");
  signUpButton.classList.add("nav-button");
  signUpButton.id = "sign-up-button";
  signUpButton.innerText = "Rekisteröidy"
  signUpLi.append(signUpButton);

  nav.append(signInLi, signUpLi);

    //DISPLAY THE !SIGN IN! MODALE
  signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.openModal();
    modal.displaySignIn();
  });


  //DISPLAY THE !SIGN UP! MODALE
  signUpButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.openModal();
    modal.displaySignUp();
  });

  const loginButton = document.querySelector("#login-button");
  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    await data.loginUser(username, password);
  });

  const registerButton = document.querySelector("#register-button");
  registerButton.addEventListener("click", async (event) => {
    event.preventDefault();

    //FIRST CHECK LOGIN INFO
    const infoText = document.querySelector("#info-text-register");
    infoText.innerText = "";

    const username = document.querySelector("#new-username").value;
    const email = document.querySelector("#new-email").value;
    const password = document.querySelector("#new-password").value;
    const terms = document.querySelector("#terms").checked;
    const usernameHasSpaces = utils.checkForWhiteSpace(username);
    const emailHasSpaces = utils.checkForWhiteSpace(email);
    const passwordHasSpaces = utils.checkForWhiteSpace(password);

    //INVALID USERNAME
    if(usernameHasSpaces || username.length < 3){
      infoText.innerText = "Käyttäjätunnus on oltava vähintään 4 merkkiä eikä sisällä välejä.";
      return;
    }

    //INVALID EMAIL
    if(emailHasSpaces || email.length < 3 || !email.includes("@")){
      infoText.innerText = "Sähköpostissa on oltava '@' merkki.";
      return;
    }

    //INVALID PASSWORD
    if(passwordHasSpaces || password.length < 7){
      infoText.innerText = "Salasanan on oltava vähintää 8 merkkiä.";
      return;
    }

    console.log(terms);
    //ACCEPT TERMS OF SERVICE!!!
    if(!terms){
      infoText.innerText = "Hyväksy käyttäjäehdot.";
      return;
    }

    const response = await data.checkUsernameAvailability(username);

    //CHECK IF THE USERNAME IS NOT TAKEN
    if(!response){
      infoText.innerText = "Käyttäjätunnus on jo käytössä.";
      return;
    } else{
      //USERNAME AVAILABLE PROCEED!
      const response = await data.registerUser(username, email, password);
      console.log(response);

      if(response == 200){
        modal.closeModal();
      } else if(response == 400){
        infoText.innerText = "Sähköposti on jo käytössä.";
      } else{
        infoText.innerText = "Verkkovirhe, joku meni pieleen. Kokeile uudestaan.";
      }
    }
  });}

  export default {logOutNav};
