'use strict';

let num;
const table = document.getElementById('target');

while (isNaN(num) || num < 1) {
  num = parseInt(prompt('Input a positive number:'));
}

for (let x = 1; x <= num; x++) {
  let row = table.insertRow(x - 1);
  for (let y = 1; y <= num; y++) {
    let cell = row.insertCell(y - 1);

    cell.innerHTML = x * y;
  }
}
