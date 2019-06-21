import BaseModule from './BaseModule';

class UserModule extends BaseModule {
  constructor () {
    super();
    this.$http = this.axios.create({
      baseURL: 'http://user-srv.7mud.com/api'
    });
  }

  login ({ mobile = undefined, password = undefined }) {
    return this.$http.post('/user/login', {
      mobile: mobile,
      password: password
    });
  }

  logout () {
    return this.$http.post('/user/logout');
  }

  register ({ mobile = undefined, password = undefined }) {
    return this.$http.post('/user/register', {
      mobile: mobile,
      password: password
    });
  }

  getUserInfo () {
    return this.$http.post('/user/info');
  }
}

export default new UserModule();
