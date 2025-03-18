'use strict';

let num;
let sum = 0;

while (isNaN(num) || num < 0) {
  num = parseInt(prompt('Input a positive number:'));
}

for (let i = 1; i <= num; i++) {
  sum += i;
}

document.querySelector('#target').innerHTML =
  'Sum of all natural numbers up to ' + num + ' is ' + sum + '.';
