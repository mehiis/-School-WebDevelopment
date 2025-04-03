import {addUser, findUserById, listAllUsers} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  //!!! usually only one route parameter !!!
  const user = findUserById(req.params.id); //params = /users/:usedID/books/:bookId ...:3000/users/43/books/8989 |  return obj  ---> {userid": "32, "book_id": "8989"}
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added. ;)', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  res.json({message: 'User item updated.'});
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  res.json({message: 'User item deleted.'});
  res.sendStatus(200);
};

export {getUser, getUserById, postUser, putUser, deleteUser};
