const Base = require('./base.js');

module.exports = class extends Base {
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

  // 先通过微信接口获取openid,在数据库中验证是否有用户的数据，如果没有用户数据就将用户的基本信息插入说数据库中，
  // 如果有就直接登录（并更新登录信息）

  async loginAction() {
    const username = this.get('username');
    const password = this.get('password');

    const user = await this.model('admin').where({username: username, password: password}).select();
    if (think.isEmpty(user)) {
      this.ctx.body = '用户名或密码错误';
      return this.fail(401, '用户名或密码错误');
    } else {
      this.ctx.body = '登录成功';
      await this.session('username', user[0].username);
      console.log(await this.session('username'), user[0].username, user);
      return this.success({userInfo: user[0]});
    }
  }

  logoutAction() {
    this.ctx.body += 'logout';
  }
};
