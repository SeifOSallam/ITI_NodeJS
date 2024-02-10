const fs = require('fs')

const validateID = (req, res, next) => {
    const todos = JSON.parse(fs.readFileSync('./TodoList.json', 'utf-8'))
    const intID = parseInt(req.params.id)
    if(!todos.find((todo) => todo.id == intID)) {
        res.status(404).send("Todo not found")
    }
    next()
}

const validatePost = (req, res, next) => {
    if (req.body.status || req.body.id || !req.body.title)
        res.status(422).send('Invalid input')
    next()
}

const validateEdit = (req, res, next) => {
    if (req.body.status) {
        if (req.body.status != "to-do" && req.body.status != "in-progress" && req.body.status != "done") {
            res.status(400).send('Invalid values for status')
        }
    }
    next()
}

module.exports = {
    validateID,
    validatePost,
    validateEdit
}