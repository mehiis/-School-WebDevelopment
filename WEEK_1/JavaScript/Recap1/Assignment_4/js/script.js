"use strict";

let score, grade;

while (isNaN(score) || score < 0 || score > 100) {
  score = parseInt(prompt("Input your exam score 0-100:"));
}

if (score <= 39) {
  grade = 0;
} else if (score > 39 && score <= 51) {
  grade = 1;
} else if (score > 51 && score <= 63) {
  grade = 2;
} else if (score > 63 && score <= 75) {
  grade = 3;
} else if (score > 75 && score <= 87) {
  grade = 4;
} else {
  grade = 5;
}

document.querySelector("#target").innerHTML =
  "Your exam score was " + score + ", so your grade is " + grade + ".";
