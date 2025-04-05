import {
  addCat,
  removeCat,
  findCatById,
  listAllCats,
  findCatByOwnerId,
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
  req.body.filename = req.file.filename; //THIS BEFORE RESULT, BECAUSE WE HAVE TO GET THE FILENAME TO TRANSFER IT TO RESULT ->
  const result = await addCat(req.body); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!

  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added. ;)', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  /* */
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!

  if (result) {
    res.status(200);
  }
};

const getCatByOwnerId = async (req, res) => {
  const cat = findCatByOwnerId(req.params.id);
  if (cat) {
    res.json(await cat);
  } else {
    res.sendStatus(404);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByOwnerId};
