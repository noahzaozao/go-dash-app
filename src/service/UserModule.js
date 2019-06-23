import BaseModule from './BaseModule';

class UserModule extends BaseModule {
  constructor () {
    super();
    this.config = {
      baseURL: 'http://user-srv.7mud.com/api'
    };
  }

  login ({ mobile = undefined, password = undefined }) {
    return this.post('/user/login', {
      mobile: mobile,
      password: password
    }, this.config);
  }

  logout () {
    return this.post('/user/logout', this.config);
  }

  register ({ mobile = undefined, password = undefined }) {
    return this.post('/user/register', {
      mobile: mobile,
      password: password
    }, this.config);
  }

  getUserInfo () {
    return this.$http.post('/user/info', this.config);
  }
}

export default new UserModule();
