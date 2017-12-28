const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    await this.updateAction();
  }

  async updateAction() {
    const name = this.get('name');
    const phone = this.get('phone');
    const address = this.get('address');
    const remark = this.get('remark');
    const result = await this.model('restaurant')
      .where({id: 1}).update({
        name: name,
        phone: phone,
        address: address,
        remark: remark
      });
    if (result == 0) {
      this.ctx.response.body = '修改出错，请稍后再试';
      this.fail('402011', 'Restaurant_Error');
    } else {
      this.ctx.response.body = '数据修改成功';
      this.success({result: result});
    }
  }
}