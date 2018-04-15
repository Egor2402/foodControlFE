export default class Auth {
  static getUserToken() {
    return localStorage.getItem('fc_token');
  }

  static setUserToken(token) {
    localStorage.setItem('fc_token', token);
  }

  static removeUserToken() {
    localStorage.removeItem('fc_token');
  }
}
