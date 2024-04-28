import { Api } from "./ApiService";

export class ChallengeService {
    static async CreateChallenge(data) {
        return await Api.request("POST", "/challenge/", data);
    }

    static async GetChallenges() {
        return await Api.request("GET", "/challenge/");
    }

    static async GetChallengeById(challengeId) {
        return await Api.request("GET", `/challenge/${challengeId}`);
    }

    static async UpdateChallenge(challengeId, data) {
        return await Api.request("PUT", `/challenge/${challengeId}`, data);
    }

    static async DeleteChallenge(challengeId) {
        return await Api.request("DELETE", `/challenge/${challengeId}`);
    }
}

export default ChallengeService;