import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  //!!! usually only one route parameter !!!
  const cat = findCatById(req.params.id); //params = /users/:usedID/books/:bookId ...:3000/users/43/books/8989 |  return obj  ---> {userid": "32, "book_id": "8989"}
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus('APUA?!?!?!?!?!?' + 404);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body); //<---- DANGEROUS!!!! IN REAL WORLD HAS TO BE VALIDATED!!!
  if (result.cat_id) {
    res.status('HIENOSTI MENEE!: ' + 201);
    res.json({message: 'New cat added. ;)', result});
  } else {
    res.sendStatus('AAAARGHHH!!! AUTTAKAAA NYT OIKEESTI?!?!?!?!?' + 400);
  }
};

const putCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

export {getCat, getCatById, postCat, putCat, deleteCat};
