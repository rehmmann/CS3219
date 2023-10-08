import matcher from "./app.js";



export async function findMatch(req, res) {
    var user= {"id" : req.body.id , "email": req.body.email, "pref" : req.body.pref};
    console.log(user);
  
    matcher
      .addUser(user)
      .then((result) => {
        res
        .status(200)
        .json({ message: `User: ${user.email} added to matching Queue` });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message:`User: ${user.email} could not be added to matching Queue`, error: err.message });
      });
  }


  // Inspect Matching Queue
  export async function inspectMatchQueue(req, res) {
    matcher
    .inspectMatchQueue()
    .then((result) => {
        res
        .status(200)
        .json({matchQueue: result});
    })
    .catch ((err) => {
        res
        .status(500)
        .json({ message:`Could not inspect Matching Queue`, error: err.message });

    });
  }

  // Check user in Match Queue
  export async function checkUserInQueue(req, res) {
    var user= {"id" : req.body.id , "email": req.body.email, "pref" : req.body.pref};
    console.log(user);

    matcher
    .checkUserInMatchQueue(user)
    .then((result) => {
        res
        .status(200)
        .json({userFound: result});
    })
    .catch((err) => {
        res
        .status(500)
        .json({ message:`Could not search for user ${user} in matching queue: `, error: err.message });
    });


  }

  export async function checkMatch(req, res) {
    var user= {"id" : req.body.id , "email": req.body.email, "pref" : req.body.pref};
    console.log(user);
  
    matcher
      .checkUserMatched(user)
      .then((result) => {
        let matched_user = result;
        if (matched_user != null) {
            res
            .status(200)
            .json({ 
                message: `User: ${user.email}  Matched`,
                matched_user: matched_user
                });
        } else {
            res
            .status(200)
            .json({ 
                message: `User: ${user.email} Not Matched`
                });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: `Could not check user: ${user.email} match: `, error: err.message });
      });
  }