const { Todos } = require('../Models/todos');
const { CustomError } = require('../errors/mongoError');

const getTodos = async (userId, query) => {
  if (query.status) {
    const todos = await Todos.find({ userId, status: query.status })
      .limit(query.limit).skip(query.skip).populate('userId')
      .exec();
    return todos;
  }
  const todos = await Todos.find({ userId })
    .limit(query.limit).skip(query.skip).populate('userId')
    .exec();
  return todos;
};

const createTodo = async (todo) => {
  const newTodo = await Todos.create(todo)
    .catch((err) => {
      throw new CustomError(err, 404);
    });
  return newTodo;
};

const deleteTodo = async (userId, id) => {
  const deletedTodo = await Todos.deleteOne({ _id: id, userId })
    .catch((err) => {
      throw new CustomError(err, 404);
    });
  return deletedTodo;
};

const updateTodo = async (userId, id, newTodo) => {
  const updatedUser = await Todos
    .findOneAndUpdate({ _id: id, userId }, newTodo, { new: true })
    .catch((err) => {
      throw new CustomError(err, 404);
    });
  return updatedUser;
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
