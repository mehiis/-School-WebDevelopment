// mock data
const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3639,
    name: 'Jussi Kurki',
    username: 'jk666',
    email: 'jussimmmn@metropolia.fi',
    role: 'admin',
    password: 'passu',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUsersById = (id) => {
  return userItems.find((item) => item.cat_id == id);
};

const addUser = (user) => {
  const {cat_name, weight, owner, filename, birthdate} = user;
  const newId = userItems[0].cat_id + 1;
  userItems.unshift({
    //unshift adds this item to [0] cell of the array, could be also push
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return {cat_id: newId};
};

export {listAllUsers, findUsersById, addUser};
