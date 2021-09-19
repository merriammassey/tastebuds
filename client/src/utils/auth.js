// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";
// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a valid saved token
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        //REMOVE expired token
        this.logout();
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    if (window.location.toString().includes("event")) {
      document.getElementById("eventModal").style.display = "none";
      //document.getElementById("backdrop").style.display = "none"; //event.js line 175
    } else {
      window.location.reload();
    }
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
