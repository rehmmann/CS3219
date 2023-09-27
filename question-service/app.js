// First Test Program
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://rehmmann:rehman@cluster0.qredme9.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
}

connect();

app.get("/", (req, res) => {
  res.send("Welcome to Peerprep User Service");
});

app.listen(8080, () => {
  console.log("App Intialised on port 8080");
});
