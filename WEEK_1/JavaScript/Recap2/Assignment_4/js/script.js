'use strict';
const numArray = [4, 5, 2, 9, 1, 7, 6, 3, 8];

document.querySelector('#target').innerHTML = `Original array: ${numArray}`;

function sortArray(numArray) {
  return numArray.sort(function (a, b) {
    return a - b;
  });
}

console.log(
  `Original array: ${numArray}\nSorted array: ${sortArray(numArray)}`
);

document.querySelector(
  '#target'
).innerHTML += `<br>Sorted array: ${sortArray(
  numArray
)}`;
