"use strict";

let x1, x2, y1, y2;

while (isNaN(x1)) {
  x1 = parseFloat(
    prompt(
      "Welcome to two point distance calculator.\n\nInput Point 1 x value:"
    )
  );
}

while (isNaN(y1)) {
  y1 = parseFloat(prompt("Input Point 1 y value:"));
}

while (isNaN(x2)) {
  x2 = parseFloat(prompt("Input Point 2 x value:"));
}

while (isNaN(y2)) {
  y2 = parseFloat(prompt("Input Point 2 y value:"));
}

const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

document.querySelector("#target").innerHTML =
  "Distance of the two points is " + result + ".";
