'use strict';

// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here
const ul = document.querySelector('#target');
let html = "";

for (const toDo of todoList) {
  let completed = "";

  if(toDo.completed)
    completed = "checked"

  html += 
  `
  <li>
  <input type="checkbox" id="todo-${toDo.id}" ${completed}></input>
  <label for="todo-${toDo.id}">${toDo.task}</label>
  </li>
  `
}

ul.insertAdjacentHTML("beforeend", html);
