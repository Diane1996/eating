const Base = require('./base.js');
function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function(value) {
            step('next', value);
          }, function(err) {
            step('throw', err);
          });
        }
      }

      return step('next');
    });
  };
}

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
      name: info.name,
      food_id: foodid,
      price: info.price,
      picture: info.picture,
      sales: 0,
      category_id: info.category_id
    };
    const result = await this.model('food')
      .where({name: info.name})
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

  async getFoodListByOrderIdAction() {
    var value = this.get();
    var order_id = value.order_id;
    const _this = this;

    var orderItemList = await this.model('order_item')
      .where({order_id: order_id})
      .select();
    orderItemList = JSON.parse(JSON.stringify(orderItemList));
    console.log('orderItemList: ', orderItemList);
    Promise.all(orderItemList.map((item) => {

    }));
    return _asyncToGenerator(function * () {
      const result = yield _this.model('foodControl').selectAllOrderMenu(order_id);
      console.log('resultresult: ', result);
      for (let i = 0; i < result.length; i++) {
        let data = result[i];
        for (let j = 0; j < orderItemList.length; j++) {
          if (result[i].food_id === orderItemList[j].food_id) {
            data.count = orderItemList[j].count;
          }
        }
        result[i] = data;
        if (i === (result.length - 1)) {
          console.log('result: ', result)
          _this.success({result: result});

        }
      }
    })();
  }
};
