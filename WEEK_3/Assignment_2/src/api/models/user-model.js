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
    user_id: 666,
    name: 'Mich Jagger',
    username: 'rs6',
    email: 'mj@metropolia.fi',
    role: 'user',
    password: '123',
  },
  {
    user_id: 123,
    name: 'Jussi Petrelius',
    username: 'jussip',
    email: 'jussi.p@metropolia.fi',
    role: 'user',
    password: 'salis',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    //unshift adds this item to [0] cell of the array, could be also push
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return {user_id: newId};
};

export {listAllUsers, findUserById, addUser};
