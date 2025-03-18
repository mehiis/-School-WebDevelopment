'use strict';

const fruits = ['apple', 'banana', 'orange', ' grape', 'kiwi'];
let vegetables = [];

console.log(
  `Fruits: ["${fruits[0]}", "${fruits[1]}", "${fruits[2]}", "${fruits[3]}", "${fruits[4]}"]`
);
console.log(`Length of Fruits: ${fruits.length}`);
console.log(`Element at Index 2: "${fruits[2]}"`);
console.log(`Last Element of Fruits: "${fruits[fruits.length - 1]}"`);

for (let i = 0; i < 3; i++) {
  vegetables.push(prompt(`Write a vegetable (${i + 1}/3):`));
}

console.log(
  `Vegetables: ["${vegetables[0]}", "${vegetables[1]}", "${vegetables[2]}"]`
);
console.log(`Length of Vegetables: ${vegetables.length}`);
