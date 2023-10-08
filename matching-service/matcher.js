import amqp from 'amqplib';
class Matcher {
    constructor(matcherName) {
        this.matcherName= matcherName;
        this.channel = null;
        // this.rabbitSettings = {
        //     protocol: 'amqp',
        //     port: 5672,
        //     username: 'guest',
        //     password: 'guest',
        //     vhost : "/",
        //     authMechanism: ['PLAIN', "AMQPLAIN","EXTERNAL"]
        // }
        this.rabbitSettings = process.env.AMQP_URL || 'amqp://localhost:5673';
        this.awaitMatchBuffer = [] // A buffer for users awaiting matches
        this.matched = {} // A Record for users already matched
    }

    
    // Need to be called before running the class
    async intialise() {
        try {
            const conn = await amqp.connect(this.rabbitSettings, 'heartbeat=60');
            console.log("Connection Created.");
    
            const channel = await conn.createChannel();
            console.log("Channel Created...");
    
            const res = await channel.assertQueue(this.matcherName); // Checks if Queue exists , if not creates a queue
            console.log(`Queue with name ${this.matcherName}  Created..`);

            this.channel = channel;

            // intialises the consumer
            channel.consume(this.matcherName,(msg) => this.processMatch(msg));
        }
        catch (err) {
            throw Error(`Matcher Intialisation Error ${err}` )
        }
    }


    // Adds User to the queue
    // Takes in user json object
    async addUser(user) {
        if (this.channel == null) {
            // Channel needs to be intialised before adding to the Queue
            throw Error("Channel Not Intialised")
        }
        try {
            await this.channel.sendToQueue(this.matcherName, Buffer.from(JSON.stringify(user)));
        } catch (err) {
            throw Error(`Could not add user ${user.email} to the queue ${this.matcherName}:  ${err}` )
        }
    }

    // Handler for queue addition 
    async processMatch(msg) {
        if (this.channel == null) {
            // Channel needs to be intialised before adding to the Queue
            throw Error("Channel Not Intialised")
        }

        try {
            const user_obj = JSON.parse(msg.content.toString());
            this.awaitMatchBuffer.push(user_obj);
            this.channel.ack(msg);
            await this.matchCurrent();
        } catch (err) {
            throw new Error(`Process Match Error, Could Not Process incoming users: ${err} `);
        }
    }

    // Matched users in Buffer
    matchCurrent() {
        if (this.awaitMatchBuffer.length < 2) {
            console.log("Only one user in buffer, cannot perform matching");
        } else {
            // User matching can be performed
            // At Max the number of user in Buffer should be 2
            console.log(`The current match buffer:  ${this.awaitMatchBuffer}`);
            // let user1 = this.awaitMatchBuffer.pop();
            // let user2 = this.awaitMatchBuffer.pop();
            
            // this.matched[user1.id] = user2;
            // this.matched[user2.id] = user1;
            for (var i = 1; i < this.awaitMatchBuffer.length; i++ ){
                var curr = this.awaitMatchBuffer[i];
                var isDone = false;
                for (var j = 0; j< i; j++) {
                    // Backward Propagation ensures FCFS
                    var matched_user = this.awaitMatchBuffer[j];


                    if (this.validMatch(curr, matched_user)){
                        // Add the match 
                        this.matched[curr.id] = matched_user;
                        this.matched[matched_user.id] = curr;

                        // Remove these elemnts from the lower index
                        this.awaitMatchBuffer.splice(j, 1);

                        // Remove these elemnts from the upper index
                        this.awaitMatchBuffer.splice(i - 1,1 );
                        isDone = true;
                        break;
                    }
                }
                if (isDone) {
                    break;
                }
            }


        }
    }

    // You can look at the current match Queue
    async inspectMatchQueue() {
        return this.awaitMatchBuffer;
    }

    // Check User in Matching Buffer
    async checkUserInMatchQueue(user) {
        for (var i = 0; i < this.awaitMatchBuffer.length; i++ ){
            var curr = this.awaitMatchBuffer[i];
            if ((curr.id == user.id) && (curr.email == user.email) && (JSON.stringify(curr.pref) == JSON.stringify(user.pref))) {
                return true;
            }
        }
        return false;
    }


    validMatch(user1, user2) {
        return JSON.stringify(user1.pref) == JSON.stringify(user2.pref);
    }

    // Returns User Match  , if the user is matched
    async checkUserMatched(user) {
        try {
            let key = user.id

            if (key in this.matched) {
                let matchedUser = this.matched[key];
                delete this.matched[key];
                return matchedUser
            } else {
                return null;
            }
        } catch (err) {
            throw Error(`Could not check match ${user.email}:  ${err}` )
        }
    }



}

export default Matcher;