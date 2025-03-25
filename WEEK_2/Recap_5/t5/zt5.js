import {fetchData} from './fetchData.js';

async function init() {
  try { //try catch sinne missä käytetään, jotta voidaan esimerkiksi kertoa verbaalisti käyttäjälle esimerkiksi virheestä esim popup ikkunan kautta.
    const url = 'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/';

    const userData = await fetchData(url);
    console.log(userData);

  } catch (error) {
    console.log('An error occurred:', error);
  }
}

init();
