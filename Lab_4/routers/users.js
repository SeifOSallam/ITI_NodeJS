const express = require('express');

const router = express.Router();
const userController = require('../Controllers/users');
const asyncWrapper = require('../wrapper/asyncWrapper');

// const auth = require('../validation/auth');

router.get('/', async (req, res) => {
  const getUsers = await userController.getUsers();
  res.json(getUsers);
});

router.post('/', async (req, res, next) => {
  const [err, createdUser] = await asyncWrapper(userController.createUser(req.body));
  if (!err) {
    return res.json(createdUser);
  }
  return next(err);
});

router.delete('/:id', async (req, res, next) => {
  const [err, deletedUser] = await asyncWrapper(userController.deleteUser(req.params.id));
  if (!err) {
    return res.json(deletedUser);
  }
  return next(err);
});

router.patch('/:id', async (req, res, next) => {
  const [err, updatedUser] = await asyncWrapper(userController.updateUser(req.params.id, req.body));
  if (!err) {
    return res.json(updatedUser);
  }
  return next(err);
});

router.get('/:id/todos', async (req, res, next) => {
  const [err, userTodos] = await asyncWrapper(userController.userTodos(req.params.id));
  if (!err) {
    return res.json(userTodos);
  }
  return next(err);
});

module.exports = router;
