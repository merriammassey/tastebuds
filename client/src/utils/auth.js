// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";
import Event from "../pages/Event";
// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
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
    var modal = document.getElementById("signup-modal");
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    //window.location.assign("/");
    //let { id } = useParams();
    if (window.location.toString().includes("event")) {
      //window.location.assign("/event");
      const handleModalClose = Event.handleModalClose;
      handleModalClose(); //doesn't work
      //Event.handleAddEvent();
    } else {
      //window.location.assign(window.location.href);
      window.location.assign("/");
    }
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    window.location.assign("/");
    // this will reload the page and reset the state of the application
    //let { id } = useParams();
    /* if (!window.location.toString().includes("event")) {
      window.location.assign("/");
    } else {
      //window.location.assign(window.location.href);
      setShowModal(false);
    } */
  }
}

export default new AuthService();
