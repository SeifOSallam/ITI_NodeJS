const express = require('express');

const router = express.Router();
const todoController = require('../Controllers/todos');
const asyncWrapper = require('../wrapper/asyncWrapper');

// const auth = require('../validation/auth');

router.get('/', async (req, res) => {
  const getTodos = await todoController.getTodos(req.query);
  res.json(getTodos);
});

router.post('/', async (req, res, next) => {
  const [err, postedTodo] = await asyncWrapper(todoController.createTodo(req.body));
  if (!err) {
    return res.json(postedTodo);
  }
  return next(err);
});

router.delete('/:id', async (req, res, next) => {
  const [err, deletedTodo] = await asyncWrapper(todoController.deleteTodo(req.params.id));
  if (!err) {
    return res.json(deletedTodo);
  }
  return next(err);
});

router.patch('/:id', async (req, res, next) => {
  const [err, updatedTodo] = await asyncWrapper(todoController.updateTodo(req.params.id, req.body));
  if (!err) {
    return res.json(updatedTodo);
  }
  return next(err);
});

module.exports = router;
