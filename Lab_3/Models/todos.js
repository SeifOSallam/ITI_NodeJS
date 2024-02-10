const fs = require('fs')
const todosManipulator = require('../todos')

const getTodos = (querystatus) => {
    const todos = JSON.parse(fs.readFileSync('./TodoList.json', 'utf-8'))
    if (querystatus) {
        return todos.filter((todo) => todo.status === querystatus)
    }
    return todos
}

const getTodo = (id) => {
    const todos = JSON.parse(fs.readFileSync('./TodoList.json', 'utf-8'))
    const intID = parseInt(id)
    return todos.find((todo) => todo.id == intID)
}

const postTodo = (todo) => {
    todosManipulator.addTodo(todo.title)
}

const deleteTodo = (id) => {
    const todos = JSON.parse(fs.readFileSync('./TodoList.json', 'utf-8'))
    const intID = parseInt(id)
    todosManipulator.deleteTodo(intID)
}

const editTodo = (id, todo) => {
    const arguments = []

    arguments.push('-id', id)

    if (todo.title) {
        arguments.push('-t', todo.title)
    }
    if (todo.status) {
        arguments.push('-s', todo.status)
    }

    todosManipulator.editTodo(arguments)
}

module.exports = {
    getTodos,
    getTodo,
    postTodo,
    deleteTodo,
    editTodo
}