const express = require('express');

const router = express.Router();
const todoController = require('../Controllers/todos');
const asyncWrapper = require('../wrapper/asyncWrapper');
const validator = require('../validation/tokenAuth');

router.use(validator.validateToken);

router.get('/', async (req, res) => {
  const getTodos = await todoController.getTodos(req.user.userId, req.query);
  res.json(getTodos);
});

router.post('/', async (req, res, next) => {
  req.body.userId = req.user.userId;
  const [err, postedTodo] = await asyncWrapper(todoController.createTodo(req.body));
  if (!err) {
    return res.json(postedTodo);
  }
  return next(err);
});

router.delete('/:id', async (req, res, next) => {
  // eslint-disable-next-line max-len
  const [err, deletedTodo] = await asyncWrapper(todoController.deleteTodo(req.user.userId, req.params.id));
  if (!err) {
    return res.json(deletedTodo);
  }
  return next(err);
});

router.patch('/:id', async (req, res, next) => {
  // eslint-disable-next-line max-len
  const [err, updatedTodo] = await asyncWrapper(todoController.updateTodo(req.user.userId, req.params.id, req.body));
  if (!err) {
    return res.json(updatedTodo);
  }
  return next(err);
});

module.exports = router;
