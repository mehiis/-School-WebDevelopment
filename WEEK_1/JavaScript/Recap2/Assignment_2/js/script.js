'use strict';

const numbers = [];
const p = document.getElementById('target');

for (let i = 0; i < 5; i++) {
  const num = parseInt(prompt(`Type a whole value number[${i + 1}/5]`));

  if (isNaN(num)) {
    i--;
  } else {
    numbers.push(num);
  }
}

p.innerHTML += `Numbers: ${numbers}<br>`;
let searhForNum;

while (isNaN(searhForNum)) {
  searhForNum = parseInt(prompt(`Search for a number: `));
}

if (numbers.includes(searhForNum)) {
  p.innerHTML += `Number ${searhForNum} is found in the array.<br>`;
} else {
  p.innerHTML += `Number ${searhForNum} not found in the array.<br>`;
}

numbers.pop(numbers.length - 1);
p.innerHTML += `Updated Numbers: ${numbers}<br>`;

p.innerHTML += `Sorted Numbers: ${numbers.sort(function (a, b) {
  return a - b;
})}`;
