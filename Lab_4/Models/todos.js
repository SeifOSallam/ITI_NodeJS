const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    status: {
      type: String,
      required: true,
      default: 'to-do',
      enum: ['to-do', 'in-progress', 'done'],
    },
    tags: [{
      type: String,
      maxlength: 10,
    }],
  },
  { timestamps: true },
);

todosSchema.pre('findOneAndUpdate', function foau(next) {
  this.options.runValidators = true;
  next();
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = {
  Todos,
};
