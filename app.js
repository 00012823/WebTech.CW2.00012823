const express = require('express')
const app = express()
const PORT = 1111
const todos = require("./routes/todos.js");

app.set('view engine', 'pug')

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/todos', todos)

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});