import UnmatchedUser from "./models/unmatchedUser.js";
import MatchedUsers from "./models/matchedUsers.js";

class Matcher {
    
    constructor(firestoreHandler, questInst) {
        this.firestoreHandler = firestoreHandler;
        this.QueueOrderBy = "addDatetime";
        this.QueueOrderPref = "asc";
        this.Queuelimit = 1;
        this.questInst = questInst;
    }

    // etiher queus the user ot be matched , or adds the match to the database
    async findMatch(user) {
        const userJson = {"email": user.email, "id": user.id, "topic": user.topic, "difficulty": user.difficulty};
        const umUser = UnmatchedUser.toObject(userJson);
        
        // Search in Unmatched Queue
        const queryRes = await this.firestoreHandler.readwithAndQuery(UnmatchedUser.collectionName, this.QueueOrderBy, this.QueueOrderPref, this.Queuelimit, umUser.getMatchPredicates());


        if (queryRes == null) {
            await this.addUser(umUser);
            console.log(`Added User: ${userJson.email} to Queue`);
        } else {
            // Get Question Id
            const questionId = await this.questInst.getQuestionId(umUser.difficulty, umUser.topic);
            
            console.log(`Question Id is ${questionId}`);
            // Get MatchedUser
            let matchedUserEmail = null;

            for (var key in queryRes) {
                matchedUserEmail = key;
            }
            const matchedUserJson = queryRes[matchedUserEmail];

            // From matcheUserJson
            const matchedJson = {"email1" : umUser.email, "id1": umUser.id ,"email2": matchedUserJson.email , "id2" : matchedUserJson.id, "topic": umUser.topic, "difficulty" : umUser.difficulty, "questionId": questionId};
            // Make Object
            console.log(`MatchedJson ${matchedJson}`);
            const matchedUsers = MatchedUsers.fromJsonToObject(matchedJson);

            // Add Matched user
            await this.addMatchToFind(matchedUsers, matchedUserJson);

            console.log(`Added match: ${matchedJson} to matches db`);
        }
    }


    // Returns the match found for the user email and deals with match Foudn logic
    async checkMatches(user) {
        const userJson = {"email": user.email, "id": user.id, "topic": user.topic, "difficulty": user.difficulty};
        const umUser = UnmatchedUser.toObject(userJson);
        const queryRes = await this.firestoreHandler.readwithOrQuery(MatchedUsers.collectionName, this.QueueOrderBy, this.QueueOrderPref, this.Queuelimit, umUser.getMatchesPredicates());
        if (queryRes != null) {
            // Match Found
            let matchFoundEmail = null;
            for (var key in queryRes) {
                matchFoundEmail = key;
            }
            const matchFound = queryRes[matchFoundEmail];
            const matchObject = MatchedUsers.fromJsonToObject(matchFound);
            
            // Acknowledge the match
            if (matchFound.ack1 || matchFound.ack2) {
                // Match Found & One of the matches already acked 
                // Delete the Match
                await this.deleteMatch(matchFoundEmail);
            } else {
                // match Found but noone acked
                // Ack and store the one Found
                if (userJson.email == matchFoundEmail) {
                    // Current user is user1
                    matchFound.ack1 = true;
                } else {
                    // Current user us user2
                    matchFound.ack2 = true;
                }

                await this.updateMatchFromJson(matchFound,matchFoundEmail);

                

            }
            
            // Returned the match user
            return matchObject.fromJsonToReq(user);

        } 

        // No Match Found
        return null;

    }


    async removeUser(user) {
        const userJson = {"email": user.email, "id": user.id, "topic": user.topic, "difficulty": user.difficulty};
        const umUser = UnmatchedUser.toObject(userJson);
        const unmatchRes = await this.firestoreHandler.readwithAndQuery(UnmatchedUser.collectionName, this.QueueOrderBy, this.QueueOrderPref, this.Queuelimit, umUser.getExactMatchPredicate());
        const matchRes = await this.firestoreHandler.readwithOrQuery(MatchedUsers.collectionName, this.QueueOrderBy, this.QueueOrderPref, this.Queuelimit, umUser.getMatchesPredicates());
        
        if (unmatchRes != null) {
            //Found unmatch
            console.log("Found in Unmatched Queue");
            await this.deleteUser(umUser);

        } else if (matchRes != null) {
            console.log("Found in Matched.");
            // Found a match

            let matchFoundEmail = null;
            for (var key in queryRes) {
                matchFoundEmail = key;
            }
            await this.deleteMatch(matchFoundEmail);

        } else {
            // Not in the database
            throw new Error("Not in the Database");
        }

    }

    // Utiltiy Functions For Add 

    // Takes in Unmatched user object
    async addUser(user) { 
        await this.firestoreHandler.write(UnmatchedUser.collectionName, user.email,user.toFirestore() );
    }


    // Takes in Unmatched user object 
    async addMatchToFind(mUsers, deleteUser) {
        // Add the Match
        await this.firestoreHandler.write(MatchedUsers.collectionName, deleteUser.email, mUsers.toFirestore());

        await this.deleteUser(deleteUser);


        
    }

    // Takes in Matched user json
    async updateMatchFromJson(updateMatchJson, matchFoundEmail) {
        await this.firestoreHandler.write(MatchedUsers.collectionName, matchFoundEmail, updateMatchJson);
    }

    async deleteUser(user) {
        // Delete the Matched User
        await this.firestoreHandler.delete(UnmatchedUser.collectionName, user.email);
    }

    async deleteMatch(matchId) {
        await this.firestoreHandler.delete(MatchedUsers.collectionName, matchId);
    }
}

export default Matcher;