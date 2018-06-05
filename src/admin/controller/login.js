const Base = require('./base.js');

module.exports = class extends Base {
  __before() {
    this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
    this.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers: token,Origin, X-Requested-With, Content-Type, Accept');
    this.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    this.header('Access-Control-Allow-Credentials', true);
    this.header('Content-Type', 'application/javascript');
  }

  async indexAction() {
    await this.loginAction();

    // await this.session(null);
    // this.ctx.res.once('finish', () => {
    //   // this.flush(); // 在请求时将 session flush 到存储容器中
    //   this.ctx.body =this.session('name');
    //   console.log(this.session('name'));
    // });

    // await this.cookie('theme', 'grey');
    // const theme = await this.cookie('theme');
  }

  async loginAction() {
    const username = this.get('username');
    const password = this.get('password');

    var user = await this.model('admin').where({username: username, password: password}).select();
    // user = JSON.parse(JSON.stringify(user));
    if (think.isEmpty(user)) {
      return this.jsonp(401);
    } else {
      await this.session('role', user[0].role);
      await this.session('username', username);
      console.log('role', user[0].role);
      return this.jsonp(user[0]);
    }
  }

  async loginOutAction() {
    await this.session(null);
    this.jsonp('success');
  }

  async getLoginStateAction() {
    var role = await this.session('role');
    var username = await this.session('username');
    var result = {
      role: role,
      username: username
    };
    this.jsonp(result);
  }
};
