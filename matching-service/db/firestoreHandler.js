import { Filter, Firestore } from '@google-cloud/firestore';

class FirestoreHandler {
    constructor(projectId) {
        this.db = null;
        this.projectId = projectId;
    }
    
    // Connects the database
    connect() {
        this.db = new Firestore({
            projectId: this.projectId,
          });
    }

    //Write To Database
    // collection is the name of the collection
    // docData should be a json Object
    async write(collectId, docId, docData) {
        if (this.db == null) {
            throw new Error(`DATABASE ERROR:: Database not intialised`);
        }
        try {
        await this.db.collection(collectId).doc(docId).set(docData);
        } catch(err) {
            throw new Error(`DATABASE_ADD ERROR: Could Not Add to Collection; ${collectId}, Document; ${docId} and Document Data; ${docData}: ${err} `)
        }
    }

    //Query Database (Read)
    // Only And Queries Can be executed
    async readwithAndQuery(collectId, order,orderPref, limit, predicates) {
        if (this.db == null){
            throw new Error(`DATABASE ERROR: Database not intialised`);
        } 
        const collectRef = this.db.collection(collectId);
        let query = collectRef;
        for(var p in predicates) {
            // Chains the And Where statements together
            var pred = predicates[p];
            query = query.where(pred.getCond1() , pred.getOp(), pred.getCond2());
        }
        const snapshot = await query.orderBy(order, orderPref).limit(limit).get();
        if (snapshot.empty) {
            console.log(`No Matching document with collection: ${collectId}, order: ${order} and limit: ${limit}`);
            return null;
        } 
        const res = {}
            snapshot.forEach(doc => {
                res[doc.id] = doc.data();
              });
            
        return res;

    }

    async readwithOrQuery(collectId, order,orderPref, limit, predicates) {
        if (this.db == null){
            throw new Error(`DATABASE ERROR: Database not intialised`);
        } 
        const collectRef = this.db.collection(collectId);
        let query = collectRef;
        let filters = [];
        for(var p in predicates) {
            // Chains the And Where statements together
            var pred = predicates[p];
            console.log(pred);
            filters.push(Filter.where(pred.getCond1() , pred.getOp(), pred.getCond2()));
        }

        console.log(`Filters are ${filters}`);

        const snapshot = await query.where(Filter.or.apply(null, filters)).orderBy(order, orderPref).limit(limit).get();
        if (snapshot.empty) {
            console.log(`No Matching document with collection: ${collectId}, order: ${order} and limit: ${limit}`);
            return null;
        } 
        const res = {}
            snapshot.forEach(doc => {
                res[doc.id] = doc.data();
              });
            
        return res;

    }

    // returns Json Object of the query executed
    async readwithoutQuery(collectId, order,orderPref, limit) {
        if (this.db == null){
            throw new Error(`DATABASE ERROR: Database not intialised`);
        } 

            const collectRef = this.db.collection(collectId);
            const snapshot = await collectRef.orderBy(order, orderPref).limit(limit).get();
            if (snapshot.empty) {
                console.log(`No Matching document with collection: ${collectId}, order: ${order} and limit: ${limit}`);
                return null;
            }
            const res = {}
            snapshot.forEach(doc => {
                res[doc.id] = doc.data();
              });
            
            return res;

    }
    

    //Delete Database
    async delete(collectId, docId) {
        if (this.db == null) {
            throw new Error(`DATABASE ERROR: Database not intialised`);
        }
        try {
        await this.db.collection(collectId).doc(docId).delete();
        } catch(err) {
            throw new Error(`DATABASE_DELETE ERROR: Could Not Delete from Collection; ${collectId}, Document; ${docId} : ${err} `)
        }
    }

}

export default FirestoreHandler;