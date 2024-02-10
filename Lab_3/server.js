const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const todosRouter = require('./routers/todos')

app.use(express.json())
app.set('view engine', 'pug')
app.use(express.static('public'))


app.use('/todos', todosRouter)


app.listen(PORT, (err) => {})
