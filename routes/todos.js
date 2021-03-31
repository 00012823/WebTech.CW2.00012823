const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const root = path.dirname(
  require.main.filename || process.require.main.filename
);
const db = path.join(root, 'database/todos.json')

router.get("/not-completed", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) throw err

    const todos = JSON.parse(data)
    const notCompletedTodos = todos.filter((todo) => !todo.completed);

    res.render("not-completed", { todos: notCompletedTodos });
  })
});

router.post("/not-completed", (req, res) => {
  const todo = req.body.todo;

  if (todo.trim() === '') {
    fs.readFile(db, (err, data) => {
        if (err) throw err;
      const todos = JSON.parse(data);
      const notCompletedTodos = todos.filter((todo) => !todo.completed);
      

      res.render("not-completed", { error: true, todos: notCompletedTodos });
    });
  } else {
    fs.readFile(db, (err, data) => {
      if (err) throw err
      const todos = JSON.parse(data);

      todos.push({
        id: id(),
        text: todo
      })

      fs.writeFile(db, JSON.stringify(todos), err => {
        if (err) throw err
        const notCompletedTodos = todos.filter((todo) => !todo.completed);


        res.render("not-completed", { success: true, todos: notCompletedTodos });
      })
    })
  }
})

router.get("/not-completed/:id/complete", (req, res) => {
  fs.readFile(db, (err, data) => {
      if (err) throw err;
    const todos = JSON.parse(data);
    
    todos.find((todo) => todo.id == req.params.id).completed = true;

    fs.writeFile(db, JSON.stringify(todos), (err) => {
        if (err) throw err;

        const notCompletedTodos = todos.filter((todo) => !todo.completed);

        res.render("not-completed", { completed: true, todos: notCompletedTodos });
    });
  });
});

router.get("/completed", (req, res) => {
    fs.readFile(db, (err, data) => {
        if (err) throw err;

        const todos = JSON.parse(data);
        const completedTodos = todos.filter((todo) => todo.completed);

        res.render("completed", { todos: completedTodos });
    });
});

router.get('/:id', (req, res) => {
  fs.readFile(db, (err, data) => {
      if (err) throw err;

      const todos = JSON.parse(data);
      const todo = todos.find((todo) => todo.id == req.params.id);

      res.render("todo", { todo: todo });
  });
})

function id() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = router;