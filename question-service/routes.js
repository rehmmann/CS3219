import express from "express";
import Question from "./question-model.js";
import {
  createQuestion,
  getRandomQuestion,
  getFilteredQuestions,
  deleteQuestion,
} from "./question-controller.js";

let router = express.Router();

//Create new question based on request body
router.post("/questions/new", createQuestion);

//Get random question
router.get("/questions/random", getRandomQuestion);

//Get question based on query parameters
router.get("/questions", getFilteredQuestions);

//Delete question based on questionId
router.delete("/questions/:id", deleteQuestion);

router.get("/questions/test", (req, res) => {
  res.send("Question Service Version 6");
});

export let routes = router;
