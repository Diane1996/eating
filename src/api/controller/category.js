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

  async addCategoryAction() {
    var info = this.get();
    var name = info.name;
    var openid = info.openid;
    var picture = info.picture;
    var category_id = Math.random().toString(16).substring(2, 10);
    var data = {
      category_name: name,
      category_id: category_id,
    }
    const result = await this.model('category')
      .add(data);
  }

  async getCategoryAction() {
    var info = this.get();
    var name = info.name;
    var data = {
      category_name: name
    }
    const result = await this.model('category')
      .where(data)
      .select();
    console.log(result);
    this.success({result: result});
  }


};