import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'githubamy.auth0.com',
      audience: 'https://githubamy.auth0.com/userinfo',
      clientID: 'IsDO1PwMc3QF7MBd3yJU8NTSxupjet2E',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
  }
    getProfile() {
      return this.profile;
    }

    handleAuthentication() {
      return new Promise((resolveFn, rejectFn) => {
        this.auth0.parseHash((err, authResult) => {
          if (err) rejectFn(err);
          console.log("authResult *********** ", authResult)
          if (!authResult || !authResult.idToken) {
            return rejectFn(err);
          }
          this.setSession(authResult);
          resolveFn();
        })
      })
    }

    isAuthenticated() {
      return new Date().getTime() < this.expiresAt;
    }
    login() {
      this.auth0.authorize();
    }
    logout() {
      // clear id token and expiration
      this.idToken = null;
      this.expiresAt = null;
    }
    setSession(authResult) {
      this.idToken = authResult.idToken;
      this.profile = authResult.idTokenPayload;
      // set the time that the id token will expire at
      this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    }
}
