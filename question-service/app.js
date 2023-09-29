import { routes } from "./routes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// First Test Program

const uri =
  "mongodb+srv://rehmmann:rehman@cluster0.qredme9.mongodb.net/Peer-prep?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
  const app = express();
  app.use(cors({
    origin: '*'
  }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/api", routes);

  app.listen(8000, () => {
    console.log("App Intialised on port 8000");
  });
});

// async function connect() {
//   try {
//     await mongoose.connect(uri);
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log("Error connecting to MongoDB", err);
//   }
// }

// connect();

// app.get("/", (req, res) => {
//   res.send("Welcome to Peerprep User Service");
// });

// app.use("/api", routes);

// app.listen(8080, () => {
//   console.log("App Intialised on port 8080");
// });
