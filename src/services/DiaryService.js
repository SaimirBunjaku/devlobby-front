import { Api } from "./ApiService";

export class DiaryService {
  static async getAllDiaries() {
    return await Api.request("GET", "/diary")
  }

  static async getDiaryById(id) {
    return await Api.request("GET", `/diary/${id}`)
  }

  static async postDiary(data) {
    return await Api.request("POST", "/diary", data)
  }

  static async updateDiaryPrivacy(data) {
    return await Api.request("PUT", `/diary/private`, data)
  }

  static async updateDiaryUpvoteCount(id, data) {
    return await Api.request("PUT", `/diary/${id}/upvote`, data)
  }

  static async deleteDiary(id) {
    return await Api.request("DELETE", `/diary/${id}`)
  }

  static async getUserDiaries(id) {
    return await Api.request("GET", `/diary/user/${id}`)
  }
}