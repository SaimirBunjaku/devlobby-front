import { Api } from "./ApiService";

export class AuthService {
  static async login(data) {
    return await Api.request("POST", "/user/login", data);
  }

  static async signup(data) {
    return await Api.request("POST", "/user/signup", data);
  }

  static async verifySignup(id, token) {
    return await Api.request("GET", `/user/${id}/verify/${token}`);
  }

  static async getUserById(userId) {
    return await Api.request("GET", `/user/${userId}`)
  }

  static async reqResetCode(email) {
    return await Api.request("POST", '/user/req-reset', email);
  }

  static async verifyResetCode(data) {
    return await Api.request("POST", '/user/verify-code', data)
  }

  static async changePassword(data) {
    return await Api.request("POST", '/user/new-password', data)
  }
  
  static async adminLogin(data) {
    return await Api.request("POST", "/user/admin/login", data);
  }

  static async updateUserProfile(userId, data) {
    return await Api.request("PUT", `/user/${userId}/profile`, data);
  }

  static async getUserProfile(userId) {
    return await Api.request("GET", `/user/${userId}/profile`);
  }
  
}
