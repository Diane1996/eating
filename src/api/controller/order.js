const Base = require('./base.js');
const moment = require('moment');

const ORDER_CODE = {
  PAY_NO: 0,
  PAYMENT: 1,
  RECEIVE: 2,
  DELIVER: 3,
  END: 4,
  CANCEL: 5,
  REFUND: 6
};

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
  }
  async findAllAction() {
    const _this = this;
    var value = _this.get();

    var orderList = await _this.model('order')
      .where({open_id: value.open_id})
      .select();
    // var orderArr = [];
    orderList = JSON.parse(JSON.stringify(orderList, ['create_time', 'order_id', 'total_price', 'status', 'first_name', 'first_picture', 'eatingType']));
    for (let i = 0; i < orderList.length; i++) {
      var orderItem = orderList[i];
      switch (orderItem.type) {
        case 0:
          orderItem.orderType = '堂食';
          break;
        case 1:
          orderItem.orderType = '外带';
          break;
        case 2:
          orderItem.orderType = '外卖';
          break;
      }
      orderList[i] = orderItem;
    }

    this.success({orderList: orderList.reverse()});
    // promise 的方法
    // Promise.all(orderList.map(async(item, index) => {
    //   // var foodItem = await _this.model('orderControl').selectAll(item.order_id); // sql
    //
    //   var orderItem = await _this.model('order_item')
    //     .where({order_id: item.order_id})
    //     .select();
    //   orderItem = JSON.parse(JSON.stringify(orderItem)); // 得到菜品id
    //   console.log('orderItem: ', orderItem[0]);
    //   return orderItem[0];
    // })).then((data) => {
    //   console.log('data: ', data);
    //   // orderItemPromise.then(async(res) => {
    //   //   // return new Promise(async(resolve) => {
    //   //   // 去查询菜品的图片和名称
    //   //   var foodItem = await _this.model('food')
    //   //     .where({food_id: res.food_id})
    //   //     .select();
    //   //   foodItem = JSON.parse(JSON.stringify(foodItem)); // 得到菜品id
    //   //   item = JSON.parse(JSON.stringify(item, ['create_time', 'order_id', 'total_price', 'status']));
    //   //   item.picture = foodItem[0].picture;
    //   //   item.name = foodItem[0].name;
    //   //   orderArr.push(item);
    //   //   // console.log('item: ', orderArr);
    //   //   if (index === orderList.length - 1) {
    //   //     return orderArr;
    //   //   }
    //   //   // }).then((data) => {
    //   //   //   return data;
    //   //   // });
    //   // });
    //
    //   _this.success({result: data});
    // });

    // if (think.isEmpty(orderArr)) {
    //   _this.ctx.response.body = '数据不存在';
    //   _this.fail('402091', 'Receiver_id_is_not_exist_Error');
    // } else {
    //   // _this.ctx.response.body = orderArr;
    //   _this.success({result: orderArr});
    // }
  }


  // 获取单个的详细信息
  async getOneDetailAction() {
    var value = this.get();
    var order_id = value.order_id;
    var orderDetail = await this.model('order')
      .where({order_id: order_id})
      .select();
    orderDetail = JSON.parse(JSON.stringify(orderDetail));
    orderDetail = orderDetail[0];
    // switch (orderDetail.type) {
    //   case 0:
    //     orderDetail.orderType = '堂食';
    //     break;
    //   case 1:
    //     orderDetail.orderType = '外带';
    //     break;
    //   case 2:
    //     orderDetail.orderType = '外卖';
    //     break;
    // }

    this.success({result: orderDetail});
  }

  async createAction() {
    const orderId = Math.random().toString(16).substring(2, 10);
    const value = this.get();
    console.log('value: ', value, value.type);
    const addOrderData = {
      order_id: orderId,
      open_id: value.open_id,
      total_price: value.total_price,
      eatingType: value.type,
      desk_num: value.desk_num,
      people_num: value.people_num,
      receiver_id: value.receiver_id,
      create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      // status: ORDER_CODE.PAY_NO,
      status: ORDER_CODE.PAYMENT,
      remark: value.remark,
      first_name: value.first_name,
      first_picture: value.first_picture
    };

    var orderItemData = value.foodList;
    const result = await this.model('order')
      .where({order_id: orderId})
      .thenAdd(addOrderData);
    var dataList = [];
    orderItemData = JSON.parse(orderItemData);
    orderItemData.map((item) => {
      dataList.push({food_id: item.food_id, order_id: orderId, count: item.count});
    });
    console.log('dataList: ', dataList);
    const resultOrderItem = await this.model('order_item').addMany(dataList);
    // console.log('resultOrderItem: ', resultOrderItem);npm

    if (result === 0 || resultOrderItem === 0) {
      this.ctx.response.body = '订单已存在，不能添加';
      this.fail('402091', 'Order_exist_Error');
    } else {
      this.ctx.response.body = '添加数据成功';
      this.success({result: orderId});
    }
  }

  async paymentAction() {
    const value = this.get();
    const addData = {
      order_id: value.order_id,
      open_id: value.open_id,
      payment_time: moment.format('YYYY-MM-DD HH:mm:ss'),
      status: ORDER_CODE.PAYMENT
    };

    const result = await this.model('order')
      .where({order_id: value.order_id})
      .update(addData);
    if (result === 0) {
      this.ctx.response.body = '订单不存在，不能付款';
      this.fail('402092', 'Order_is_not_exist_Payment_Error');
    } else {
      this.ctx.response.body = '付款成功';
      this.success({result: result});
    }
  }

  async cancelAction() {
    const value = this.get();
    const addData = {
      order_id: value.order_id,
      open_id: value.open_id,
      cancel_time: moment.format('YYYY-MM-DD HH:mm:ss'),
      status: ORDER_CODE.CANCEL
    };

    const result = await this.model('order')
      .where({order_id: value.order_id})
      .update(addData);
    if (result === 0) {
      this.ctx.response.body = '订单不存在，不能取消';
      this.fail('402093', 'Order_is_not_exist_Cancel_Error');
    } else {
      this.ctx.response.body = '付款成功';
      this.success({result: result});
    }
  }
};
