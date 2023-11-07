import { GoogleAuth } from "google-auth-library";

class QuestionServiceInstance {
    constructor() {
        this.targetAudience = "https://question-service-image-3bicbrzzhq-an.a.run.app/"
        this.auth = new GoogleAuth();
        this.client = null;
        this.bearer = null;
        this.api = "https://question-service-image-3bicbrzzhq-an.a.run.app/api/questions/random"
    }


    async connect() {
        // this.client = await this.auth.getClient();
        // this.token = await this.client.getAccessToken();
        // this.bearer = this.token.res.data.id_token;
        this.client = await this.auth.getIdTokenClient(this.targetAudience);
        this.bearer = await this.client.idTokenProvider.fetchIdToken(this.targetAudience);
    }

    // Errors will be Handeled by Caller
    async getNewQuestion(oldId) {
        // Incase Token gets refreshed

        if (this.client == null) {
            throw new Error("QUESTION_SERVICE ERROR:  Client not intalised");
        }
        const apiUrl = this.api + "/" + oldId;
        console.log(this.client);
        console.log(`Making request to Url : ${apiUrl}`);

        const response = await this.client.request({ url: apiUrl});

        return response.data.question[0].questionId
    }
    
}


export default QuestionServiceInstance;