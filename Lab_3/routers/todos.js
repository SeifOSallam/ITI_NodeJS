const express = require('express')
const router = express.Router()
const todoController = require('../Controllers/todos');
const auth = require('../validation/auth');



router.get('/', (req, res) => {
    res.render('todos', { todos : todoController.getTodos(req.query.status)})
})

router.get('/:id', auth.validateID,(req, res) => {
    res.json(todoController.getTodo(req.params.id))
})

router.post('/', auth.validatePost, (req, res) => {
    todoController.postTodo(req.body)
    res.send("Todo added successfully")
})

router.delete('/:id', auth.validateID, (req, res) => {
    todoController.deleteTodo(req.params.id)
    res.send("Todo deleted successfully")
})

router.patch('/:id', auth.validateID, auth.validateEdit, (req, res) => {
    todoController.editTodo(req.params.id, req.body)
    res.send("Todo edited successfully")
})

module.exports = router