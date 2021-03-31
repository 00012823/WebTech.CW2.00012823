const express = require('express')
const app = express()
const PORT = 1111
const todos = require("./routes/todos.js");
const fs = require("fs");

app.set('view engine', 'pug')

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/todos', todos)

app.get('/api/v1/todos', (req, res) => {
  fs.readFile('./database/todos.json', (err, data) => {
      if (err) throw err;

      const todos = JSON.parse(data);

      res.json(todos);
  });
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});