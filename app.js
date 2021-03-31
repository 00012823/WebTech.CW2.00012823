const express = require('express')
const app = express()
const PORT = 1111

app.set('view engine', 'pug')

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/not-completed', (req, res) => {
  res.render('not-completed')
})

app.get('/completed', (req, res) => {
  res.render('completed')
})

app.listen(PORT, () => {
  console.log(`You app is running on port http://localhost:${ PORT }`)
})