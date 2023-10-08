import express from "express";

import {
  findMatch,
  checkMatch,
  inspectMatchQueue,
  checkUserInQueue
} from "./matching-controller.js";

let router = express.Router();

//Find the Match for the user
router.post("/match/findMatch", findMatch);

//Check user Matched
router.post("/match/checkMatch", checkMatch);

//Inspect Match Queue
router.post("/match/inspectQueue", inspectMatchQueue);

// Finds user in Queue
router.post("/match/findUser", checkUserInQueue );



export let routes = router;
