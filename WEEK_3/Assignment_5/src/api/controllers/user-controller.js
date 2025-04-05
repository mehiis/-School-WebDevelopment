import { removeUser } from '../models/user-model.js';
import {addUser, findUserById, listAllUsers} from '../models/user-model.js';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  //!!! usually only one route parameter !!!
  const user = findUserById(req.params.id); //params = /users/:usedID/books/:bookId ...:3000/users/43/books/8989 |  return obj  ---> {userid": "32, "book_id": "8989"}
  if (user) {
    res.json(await user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added. ;)', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  res.json({message: 'User item updated.'});
  res.sendStatus(200);
};

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!

  if (result) {
    res.status(200);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
