import {
  addCat,
  catDelete,
  findCatById,
  listAllCats,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  //!!! usually only one route parameter !!!
  const cat = findCatById(req.params.id); //params = /users/:usedID/books/:bookId ...:3000/users/43/books/8989 |  return obj  ---> {userid": "32, "book_id": "8989"}
  if (cat) {
    res.json(await cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  const result = await addCat(req.body); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!
  req.body.filename = req.body.filename;
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added. ;)', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await deleteCat(req.body, req.paramsr.id); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!
  if (result) {
    res.status(200);
  }
};

const deleteCat = async (req, res) => {
  const result = await catDelete(req.params.id); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!
  if (result) {
    res.status(200);
  }
};

const getCatByOwnerId = async (req, res) => {};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByOwnerId};
