const express = require('express');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/ITI_NodeJS_Lab5');

const app = express();
const PORT = process.env.PORT || 3000;
const todosRouter = require('./routers/todos');
const usersRouter = require('./routers/users');

app.use(express.json());

app.use('/todos', todosRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => { console.log('STARTED'); });
