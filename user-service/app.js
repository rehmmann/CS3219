const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 8080

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API backend' })
})

app.get('/users', db.getUsers)
app.get('/users/signedin/:id', db.getUserById)
app.get('/users/login', db.loginUser)
app.post('/users', db.createUser)
app.put('/users/signedin/:id', db.updateUser)
app.delete('/users/signined/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App user service running on port ${port}.`)
})
