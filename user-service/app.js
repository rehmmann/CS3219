require('dotenv').config();
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require("./routes.js");
const port = 8080

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API backend' })
})

app.use("/api", routes);

app.listen(port, () => {
  console.log(`App user service running onasdpccccort ${port}.`)
})
