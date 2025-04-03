import {addUser, findUsersById, listAllUsers} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  //!!! usually only one route parameter !!!
  const user = findUsersById(req.params.id); //params = /users/:usedID/books/:bookId ...:3000/users/43/books/8989 |  return obj  ---> {userid": "32, "book_id": "8989"}
  if (user) {
    res.json(user);
  } else {
    res.sendStatus('APUA?!?!?!?!?!?' + 404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!
  if (result.cat_id) {
    res.status('HIENOSTI MENEE!: ' + 201);
    res.json({message: 'New cat added. ;)', result});
  } else {
    res.sendStatus('AAAARGHHH!!! AUTTAKAAA NYT OIKEESTI?!?!?!?!?' + 400);
  }
};

const putUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

export {getUser, getUserById, postUser, putUser, deleteUser};
