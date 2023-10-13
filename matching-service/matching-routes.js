import express from "express";

import {
  findMatch,
  checkMatch,
  removeUser
} from "./matching-controller.js";

let router = express.Router();

//Find the Match for the user
router.post("/match/findMatch", findMatch);

//Check user Matched
router.post("/match/checkMatch", checkMatch);

// Remove User
router.post("/match/removeUser",removeUser)



export let routes = router;
