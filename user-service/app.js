// First Test Program
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to Peerprep User Service");
});

app.listen(8080, ()=> {
    console.log("App Intialised on port 8080");
});
