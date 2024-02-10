const todosModel = require('../Models/todos')

const getTodos = (querystatus) => {
    return todosModel.getTodos(querystatus);
}
const getTodo = (id) => {
    return todosModel.getTodo(id);
}
const postTodo = (todo) => {
    return todosModel.postTodo(todo);
}
const deleteTodo = (id) => {
    return todosModel.deleteTodo(id)
}
const editTodo = (id, todo) => {
    return todosModel.editTodo(id, todo)
}

module.exports = {
    getTodos,
    getTodo,
    postTodo,
    deleteTodo,
    editTodo
}