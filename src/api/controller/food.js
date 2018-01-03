const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const data = await this.model('food').select();

    if (think.isEmpty(data)) {
      this.ctx.response.body = '数据不存在请重试';
      this.fail('402051', 'Food_empty_Error');
    } else {
      this.ctx.response.body = data;
      this.success({result: data});
    }
  }
}