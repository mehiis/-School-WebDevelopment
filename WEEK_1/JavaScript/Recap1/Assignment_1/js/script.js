'use strict';

let celsius;

while (isNaN(celsius)) {
  celsius = parseFloat(prompt('Type celsius degrees.'));
}

const celsiusToKelvin = celsius + 273.15;
const celsiusToFahrenheit = celsius * 1.8 + 32;

document.querySelector('#target').innerHTML =
  celsius +
  ' celsius is ' +
  celsiusToKelvin +
  ' Kelvins and ' +
  celsiusToFahrenheit +
  ' Fahrenheits.';
