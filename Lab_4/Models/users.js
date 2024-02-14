/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.password = undefined;
        return ret;
      },
    },
  },
);

usersSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

usersSchema.pre('findOneAndUpdate', function foau(next) {
  this.options.runValidators = true;
  next();
});

const Users = mongoose.model('Users', usersSchema);

module.exports = {
  Users,
};
