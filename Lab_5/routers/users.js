const express = require('express');

const router = express.Router();
const userController = require('../Controllers/users');
const asyncWrapper = require('../wrapper/asyncWrapper');
const validator = require('../validation/tokenAuth');
const { CustomError } = require('../errors/mongoError');

router.get('/', validator.validateToken, async (req, res) => {
  const getUsers = await userController.getUsers(req.user.userId);
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

router.patch('/:id', validator.validateToken, async (req, res, next) => {
  if (req.params.id !== req.user.userId) {
    return next(new CustomError('UNAUTHORIZED', 401));
  }
  // eslint-disable-next-line max-len
  const [err, updatedUser] = await asyncWrapper(userController.updateUser(req.params.id, req.body));
  if (!err) {
    return res.json(updatedUser);
  }
  return next(err);
});

router.get('/:id/todos', validator.validateToken, async (req, res, next) => {
  const [err, userTodos] = await asyncWrapper(userController.userTodos(req.params.id));
  if (!err) {
    return res.json(userTodos);
  }
  return next(err);
});

router.post('/login', async (req, res, next) => {
  const [err, user] = await asyncWrapper(userController.loginUser(req.body));
  if (!err) {
    return res.json({
      User: user,
      Token: user.token,
    });
  }
  return next(err);
});

module.exports = router;
