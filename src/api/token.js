import { ENV } from "@/utils";
import { jwtDecode } from "jwt-decode";

export class Token {
  setToken(token) {
    localStorage.setItem(ENV.TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(ENV.TOKEN);
  }

  removeToken() {
    localStorage.removeItem(ENV.TOKEN);
  }

  GetUser(token) {
    const tokenDecode = jwtDecode(token);
    return tokenDecode.id;
  }

  hasExpired(token) {
    const tokenDecode = jwtDecode(token);
    const expireDate = tokenDecode.exp * 7200000;
    const currentDate = new Date().getTime();
    if (currentDate > expireDate) {
      return true;
    }
    return false;
  }
}
