const jwt = require('jsonwebtoken');
const { CustomError } = require('../errors/mongoError');

const validateToken = (req, res, next) => {
  const jwtSecretKey = process.env.JWT_SECRET;

  try {
    const token = req.get('authorization');
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      req.user = verified;
      return next();
    }
    throw new CustomError('UNAUTHORIZED', 401);
  } catch (error) {
    throw new CustomError('Invalid token', 401);
  }
};

module.exports = {
  validateToken,
};
