const jwt = require('jsonwebtoken');
const { Users } = require('../Models/users');
const { Todos } = require('../Models/todos');
const { CustomError } = require('../errors/mongoError');

const getUsers = async (userId) => {
  const users = await Users.find({ _id: userId });
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

const loginUser = async (userData) => {
  const { username, password } = userData;
  const user = await Users.findOne({ username })
    .catch(() => {
      throw new CustomError('Invalid credentials', 403);
    });

  const valid = await user.verifyPassword(password);
  if (!valid) {
    throw new CustomError('Invalid credentials', 403);
  }
  const jwtSecretKey = process.env.JWT_SECRET;
  const data = {
    time: Date(),
    userId: user.id,
  };
  const token = jwt.sign(data, jwtSecretKey, { expiresIn: '2h' });
  user.token = token;
  return user;
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  userTodos,
  loginUser,
};
