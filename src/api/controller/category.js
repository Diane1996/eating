const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const category = await this.model('category').select();

    if (think.isEmpty(category)) {
      this.ctx.response.body = '数据不存在请重试';
      this.fail('402041', 'Category_Empty_Error');
    } else {
      this.ctx.response.body = category;
      this.success({result: category});
    }
  }

  async getAllCateAction() {
  }
};