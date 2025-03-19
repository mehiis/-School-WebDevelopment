'use strict';
const numArrayOne   = [4, 5, 2, 9, 1, 7, 6, 3, 8];
const numArrayTwo   = [6, 12, 45, 97, 28, 91, 1003];
const numArrayThree = [-5, -100, 0, -4, 6, -45, -5];


document.querySelector('#target').innerHTML += `Original array 1: ${numArrayOne}  <br>`;
document.querySelector('#target').innerHTML += `Original array 2: ${numArrayTwo}  <br>`;
document.querySelector('#target').innerHTML += `Original array 3: ${numArrayThree}<br>`;


function sortArray(numArray, sortType) {
  switch (sortType) {
    case 'asc':
      return numArray.sort(function (a, b) {
        return a - b;
      });
    case 'desc':
      return numArray.sort(function (a, b) {
        return b - a;
      });
  }
}

//CONSOLE
console.log(
  `Array 1: ${numArrayOne}\nArray 1 (Ascending): ${sortArray(numArrayOne, "asc")}\nArray 1 (Descending): ${sortArray(numArrayOne, "desc")}\n\nArray 2: ${numArrayTwo}\nArray 2 (Ascending): ${sortArray(numArrayTwo, "asc")}\nArray 2 (Descending): ${sortArray(numArrayTwo, "desc")}\n\nArray 2: ${numArrayThree}\nArray 3 (Ascending): ${sortArray(numArrayThree, "asc")}\nArray 3 (Descending): ${sortArray(numArrayThree, "desc")}`
);


//HTML
document.querySelector('#target').innerHTML += `<br>Ascending array 1: ${sortArray(
  numArrayOne, "asc"
)}<br>`;
document.querySelector('#target').innerHTML += `Ascending array 2: ${sortArray(
  numArrayTwo, "asc"
)}<br>`;
document.querySelector('#target').innerHTML += `Ascending array 3: ${sortArray(
  numArrayThree, "asc"
)}<br>`;

document.querySelector('#target').innerHTML += `<br>Descending array 1: ${sortArray(
  numArrayOne, "desc"
)}<br>`;
document.querySelector('#target').innerHTML += `Descending array 2: ${sortArray(
  numArrayTwo, "desc"
)}<br>`;
document.querySelector('#target').innerHTML += `Descending array 3: ${sortArray(
  numArrayThree, "desc"
)}<br>`;
