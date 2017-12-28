const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    // await this.addAction();
    // await this.updateAction();
    await this.deleteAction();
    // await this.selectAction();
  }

  /**
   *
   * @returns {Promise.<*>}
   */
  async addAction() {
    const id = this.get('category_id');
    const name = this.get('category_name');
    const picture = this.get('category_picture');
    const result = await this.model('category')
      .thenAdd({category_id: id,
        category_name: name,
        category_picture: picture
      }, {category_id: id});

    if (result.type === 'exist') {
      this.ctx.body = '数据已经存在，不能重复插入';
      return this.fail(402, '数据已经存在，不能重复插入');
    } else {
      this.ctx.body = '数据插入成功';
      return this.success({result: result});
    }
  };

  async deleteAction() {
    const id = this.get('category_id');
    const result = await this.model('category')
      .where({category_id: id}).delete();

    if (result == 0) {
      this.ctx.body = '数据不存在';
      return this.fail(402, '数据不存在');
    } else {
      this.ctx.body = '数据删除成功';
      return this.success({result: result});
    }
  }

  async updateAction() {
    const id = this.get('category_id');
    const name = this.get('category_name');
    const picture = this.get('category_picture');
    const result = await this.model('category')
      .where({category_id: id})
      .update({category_name: name,
        category_picture: picture
      });

    if (result == 0) {
      this.ctx.body = '数据不存在，更新失败';
      return this.fail(402, '数据不存在，更新失败');
    } else {
      this.ctx.body = '数据更新成功';
      return this.success({result: result});
    }
  }

  async selectAction() {
    const name = this.get('category_name');
    const result = await this.model('category')
      .where({category_name: name}).find();

    if (this.isEmpty(result)) {
      this.ctx.body = '数据不存在';
      return this.fail(402, '数据不存在');
    } else {
      this.ctx.body = '数据查询成功';
      return this.success({result: result});
    }
  }

};
