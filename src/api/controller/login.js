const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const APPID = 'wx4070622d466513a9';
    const SECRET = '9eeb61209b2619d7cb49df6e3a1faf4d';
    const JSCODE = this.get('code');
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code';
    const json = await this.fetch(url).then(res => res.json());
    const result = await this.model('user')
      .where({openid: {'!=': json.openid}})
      .thenAdd({openid: json.openid});

    this.success({result: json});
  }

  async addUserInfoAction() {
    const userInfo = this.get();
    const username = userInfo.username;
    const avatar = userInfo.avatar;
    const openid = userInfo.openid;

    const data = {
      username: username,
      avatar: avatar
    };
    const result = this.model('user')
      .where({openid: openid})
      .update(data);
  }
};
