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

  async addAction() {
    var info = this.get();
    var foodid = Math.random().toString(16).substring(2, 10);
    var data = {
      food_name: info.name,
      food_id: foodid,
      food_price: info.price,
      food_picture: info.url,
      food_sales: info.sale,
      category_id: info.category_id
    };
    const result = await this.model('food')
      .where({food_name: info.name})
      .thenAdd(data);
    this.success({
      result: result
    });

    if (think.isEmpty(data)) {
      this.ctx.response.body = '数据不存在请重试';
      this.fail('402051', 'Food_empty_Error');
    } else {
      this.ctx.response.body = data;
      this.success({result: data});
    }
  }

  async foodFindAllAction() {
    const foodData = await this.model('food').select();
    const cateGoryData = await this.model('category').select();
    var data = [];
    for (var i = 0; i < cateGoryData.length; i++) {
      var cateGoryName = cateGoryData[i].category_name;
      var list = [];
      var k = 0;
      for (var j = 0; j < foodData.length; j++) {
        if (cateGoryData[i].category_id === foodData[j].category_id) {
          list[k] = {
            name: foodData[j].food_name,
            price: foodData[j].price,
            sales: foodData[j].sales,
            picture: foodData[j].picture
          };
          k++;
          // console.log(list[i])
        }
      }
      data[i] = {
        name: cateGoryName,
        list
      };
    }
    this.success({data});
  }
};
