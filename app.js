const express = require('express')
const app = express()
const PORT = 1111
const todos = require("./routes/todos.js");

app.set('view engine', 'pug')

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/todos', todos)

app.listen(PORT, () => {
  console.log(`You app is running on port http://localhost:${ PORT }`)
})