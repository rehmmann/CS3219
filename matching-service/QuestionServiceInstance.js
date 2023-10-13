import { GoogleAuth } from "google-auth-library";

class QuestionServiceInstance {
    constructor() {
        this.targetAudience = "https://question-service-image-3bicbrzzhq-an.a.run.app/"
        this.auth = new GoogleAuth();
        this.client = null;
        this.bearer = null;
        this.api = "https://question-service-image-3bicbrzzhq-an.a.run.app/api/questions/random-filtered?"
    }


    async connect() {
        // this.client = await this.auth.getClient();
        // this.token = await this.client.getAccessToken();
        // this.bearer = this.token.res.data.id_token;
        this.client = await this.auth.getIdTokenClient(this.targetAudience);
        this.bearer = await this.client.idTokenProvider.fetchIdToken(this.targetAudience);
    }

    // Errors will be Handeled by Caller
    async getQuestionId(difficulty, topic) {
        // Incase Token gets refreshed

        if (this.client == null) {
            throw new Error("QUESTION_SERVICE ERROR:  Client not intalised");
        }
        const queryParams = {
            complexity: difficulty,
            categories: topic,
            id: ''
            // Add more query parameters as needed
          };

          const queryString = Object.keys(queryParams)
          .map((key) => `${key}=${queryParams[key]}`)
          .join('&');
    
        // Append the query string to the API URL
        const apiUrl = this.api + queryString; // Replace with the actual API endpoint and query parameters
        console.log(this.client);
        console.log(`Making request to Url : ${apiUrl} token: ${this.bearer}`);

        const response = await this.client.request({ url: apiUrl});

        return response.data.questions[0].questionId
    }
    
}


export default QuestionServiceInstance;