'use strict';

const evenNumbers = [];
let prompted;

while (prompted !== 'done') {
  prompted = prompt("Enter a number (or 'done' to finish):").toLowerCase();

  if (prompted !== 'done' && !evenNumbers.includes(parseInt(prompted))) {
    if (parseInt(prompted) % 2 === 0) {
      evenNumbers.push(parseInt(prompted));
    }
  }
}

if (evenNumbers.length > 0) {
  document.querySelector('#target').innerHTML = `Even Numbers: ${evenNumbers}`;
} else {
  document.querySelector('#target').innerHTML = `Even Numbers: None`;
}
