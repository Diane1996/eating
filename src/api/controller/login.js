const Base = require('./base.js');


module.exports = class extends Base {
  async indexAction() {
    const APPID = 'wx4070622d466513a9';
    const SECRET = '9eeb61209b2619d7cb49df6e3a1faf4d';
    const JSCODE = this.get('code');
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code';
    const json = await this.fetch(url).then(res => res.json());
    console.log(json);
    this.success({result: json});
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

};
