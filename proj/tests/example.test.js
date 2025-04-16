// example.test.ts
import {add} from '../example.js';

test('add function should correctly add two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
