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
const add = document.querySelector(".add-btn");
const submit = document.querySelector("#submit-add");
const mdl = document.querySelector('#the-modal');

let curId = todoList.length;

add.addEventListener('click', function(event) {
  event.preventDefault();
  
  mdl.showModal();
});

submit.addEventListener('click', function(event) {
  event.preventDefault();
  curId++;
  const text = document.querySelector("#text-input");
  ul.insertAdjacentElement('beforeend', createListItem(text.value, false, curId));
  addToArray(curId, text.value, false);
  text.value = "";
  mdl.close();

  console.log(todoList);
});

for (const toDo of todoList) {
  ul.insertAdjacentElement('beforeend', createListItem(toDo.task, toDo.completed, toDo.id));
}

function createListItem(task, checked, id){
  const l = document.createElement("li");

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.id = `todo-${id}`
  cb.checked = checked;

  cb.addEventListener('change', function (event) {
    updateArray(id);
  });

  const lbl = document.createElement("label");
  lbl.innerText = task;
  lbl.htmlFor = `todo-${id}`;

  const del = document.createElement("button");
  del.innerText = "X";

  del.addEventListener('click', function (event) {
    event.preventDefault();
    removeFromArray(id);
    ul.removeChild(l);
    console.log(todoList);
  });

  l.append(cb, lbl, del)
  return l;
}

function addToArray(_id, _task, _completed){
  console.log("ADDING TASK WITH WITH ID " + _id + ": " + _task);
  
  const toDo =   {
    id: _id,
    task: _task,
    completed: _completed,
  };

  todoList.push(toDo);
}

function removeFromArray(id){
  console.log("REMOVING WITH ID " + id);

  for(let i = 0; i < todoList.length; i++){
    if(id === todoList[i].id){
      console.log(todoList[i].task + " removed.");

      todoList.splice(i, 1);
    }
  }
}

function updateArray(_id){
  console.log(`Updating task with id ${_id}.`);

  for(let i = 0; i < todoList.length; i++){
    if(_id === todoList[i].id){
      let _completed = !todoList[i].completed;

      console.log(`Task with ID ${todoList[i].id}: ${todoList[i].task} is now ${_completed}.`);
      todoList[i].completed = _completed;
    }
  }

  console.log(todoList);
}

console.log(todoList);