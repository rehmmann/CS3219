import Question from "./question-model.js";

async function getQuestion() {
  const count = await Question.countDocuments();
  const skip = Math.floor(Math.random() * count);
  const question = await Question.find().skip(skip).limit(1);
  return question;
}

export async function createQuestion(req, res) {
  var question = new Question(req.body);
  console.log(question);

  question
    .save()
    .then((result) => {
      console.log(result);
      res.json({ message: "Question Created" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Question could not be created.", error: err });
    });
}

export async function getRandomQuestion(req, res) {
  try {
    res.status(200).json({
      question: await getQuestion(),
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

export async function getFilteredQuestions(req, res) {
  try {
    const query = req.query;
    let andQuery = {};
    if (query.id) andQuery.questionId = Number(query.id);
    if (query.complexity) andQuery.questionComplexity = query.complexity;
    if (query.categories) andQuery.questionCategories = query.categories;
    console.log(andQuery);

    const questions = await Question.find(andQuery);
    console.log(questions.length);
    res.status(200).json({
      questions: questions,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

export async function deleteQuestion(req, res) {
  const { id } = req.params;
  Question.deleteOne({ questionId: Number(id) })
    .then((result) => {
      if (result.deletedCount == 1) res.json({ message: "Question Deleted" });
      if (result.deletedCount == 0) res.json({ message: "Question Not Found" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
