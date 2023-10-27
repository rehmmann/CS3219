import express from "express";
import Question from "./question-model.js";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };
import admin from "firebase-admin";
import {
  createQuestion,
  getRandomQuestion,
  getFilteredQuestions,
  deleteQuestion,
  updateQuestion,
  getRandomFilteredQuestions,
  getQuestionById,
} from "./question-controller.js";

let router = express.Router();
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const guard = ( roles) => {
  return async (req, res, next) => {
    try {
      const idToken = req.headers.authorization.split(' ')[1];
      const decodedToken = await firebaseApp.auth().verifyIdToken(idToken);
      const userRoles = decodedToken.roles;
      roles.forEach(role => {
        if (!userRoles.includes(role)) {
          throw new Error('Unauthorized');
        }
      });
      next();
    } catch (err) {
      res.status(401).send('Unauthorized');
    }
  };
}
//Create new question based on request body
router
  .use(guard(["ADMIN"]))
  .post("/questions/new", createQuestion);

//Get random question
router
  .use(guard([]))
  .get("/questions/random", getRandomQuestion);

//Get list of questions based on query parameters
router
  .use(guard([]))
  .get("/questions", getFilteredQuestions);

//Get 1 random question based on query parameters
router
  .use(guard([]))
  .get("/questions/random-filtered", getRandomFilteredQuestions);

router
  .use(guard([]))
  .get("/questions/:id", getQuestionById);
// Updates a question based on questionId
router
  .use(guard(["ADMIN"]))
  .put("/questions/:id", updateQuestion);

//Delete question based on questionId
router
  .use(guard(["ADMIN"]))
  .delete("/questions/:id", deleteQuestion);

router.get("/questions/test", (req, res) => { res.send("Question Service Version 8"); });

export let routes = router;
