[DEMO](https://users.metropolia.fi/~nikomeh/WebSoftwareDevelopment/WEEK_1/JavaScript/Recap2/Assignment_5/)

Enhance the existing sortArray function to include an additional parameter that defines whether the array should be sorted in ascending or descending order.

Create a function called sortArray that takes two parameters: numbers (an array of numbers) and order (a string indicating the sorting order). If the order parameter is set to "asc" (ascending), the function should sort the numbers array in ascending order. If the order parameter is set to "desc" (descending), the function should sort the numbers array in descending order. Return a new array with the sorted numbers.

Test the function by passing different arrays and sorting orders.

´´´
Example Usage:
const numbers = [5, 2, 8, 1, 9];

console.log(sortArray(numbers,"asc")); // Output: [1, 2, 5, 8, 9]
console.log(sortArray(numbers, "desc")); // Output: [9, 8, 5, 2, 1]
´´´
