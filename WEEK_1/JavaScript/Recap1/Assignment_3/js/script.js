"use strict";

let a, b, c, result;

while (isNaN(a)) {
  a = parseFloat(prompt("Input three sides of a triganles\n\nSide a:"));
}

while (isNaN(b)) {
  b = parseFloat(prompt("Side b:"));
}

while (isNaN(c)) {
  c = parseFloat(prompt("Side c:"));
}

if (a === b && b === c && a === c) {
  result = "equilateral";
} else if (a !== b && b !== c && a !== c) {
  result = "scalene";
} else {
  result = "isosceles";
}

document.querySelector("#target").innerHTML = "The triangle is " + result + ".";
