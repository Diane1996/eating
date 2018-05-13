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

  async getFoodListByOrderIdAction() {
    var value = this.get();
    var order_id = value.order_id;
    const _this = this;

    const orderItemList = await this.model('order_item')
      .where({order_id: order_id})
      .select();
    console.log('orderItemList: ', orderItemList);
    return _asyncToGenerator(function * () {
      const result = yield _this.model('foodControl').selectAllOrderMenu(order_id);
      for (var i = 0; i < result.length; i++) {
        var data = result[i];
        for (var j = 0; j < orderItemList.length; j++) {
          if (result[i].food_id === orderItemList[j].food_id) {
            data.count = orderItemList[j].count;
          }
        }
        result[i] = data;
      }

      _this.success({result: result});
    })();
  }
};
