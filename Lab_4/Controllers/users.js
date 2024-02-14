const { Users } = require('../Models/users');
const { Todos } = require('../Models/todos');
const { CustomError } = require('../errors/mongoError');

const getUsers = async () => {
  const users = await Users.find();
  return users;
};

const createUser = async (user) => {
  const newUser = await Users.create(user)
    .catch((err) => {
      throw new CustomError(err, 404);
    });
  return newUser;
};

const deleteUser = async (id) => {
  const deletedUser = await Users.deleteOne({ _id: id })
    .catch((err) => {
      throw new CustomError(err, 404);
    });
  return deletedUser;
};

const updateUser = async (id, newUser) => {
  const updatedUser = await Users
    .findOneAndUpdate({ _id: id }, newUser, { new: true })
    .catch((err) => {
      throw new CustomError(err, 404);
    });
  return updatedUser;
};

const userTodos = async (userID) => {
  const usertodos = await Todos.find({ userId: userID })
    .catch((err) => {
      throw new CustomError(err, 404);
    });
  return usertodos;
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  userTodos,
};
