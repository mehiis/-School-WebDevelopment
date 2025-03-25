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
const ul = document.querySelector("ul");
for (const toDo of todoList) {
  const l = document.createElement("li");

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.id = `todo-${toDo.id}`
  cb.checked = toDo.completed;

  const lbl = document.createElement("label");
  lbl.innerText = toDo.task;
  lbl.htmlFor = `todo-${toDo.id}`;

  l.append(cb, lbl)

  ul.insertAdjacentElement('beforeend', l);
}

