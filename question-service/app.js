import dotenv from "dotenv";
import { routes } from "./routes.js";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGO_DB_URL;

mongoose.connect(uri).then(() => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/api", routes);

  app.listen(8080, () => {
    console.log("App Intialised on port 8080");
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
