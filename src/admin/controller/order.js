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

const TYPE_CODE = {
  DINE_IN: 0,
  TAKEAWAY: 1,
  TAKEOUT: 2
};

module.exports = class extends Base {
  async indexAction() {
    const info = this.get();
    const TYPE = info.type;
    const orderId = info.order_id;
    const deskNum = info.desk_num;
    const peopleNum = info.people_num;
    let result;
    switch (TYPE) {
      case TYPE_CODE.DINE_IN:
        result = await this.model('order')
          .where({order_id: orderId})
          .update({
            type: TYPE,
            desk_num: deskNum,
            people_num: peopleNum
          });

        await this.orderAction(ORDER_CODE.RECEIVE, orderId); // 商家接单
        await this.orderAction(ORDER_CODE.END, orderId); // 订单完成
        await this.orderAction(ORDER_CODE.REFUND, orderId); // 退款成功
        break;
      case TYPE_CODE.TAKEAWAY:
        result = await this.model('order')
          .where({order_id: orderId})
          .update({
            type: TYPE
          });
        await this.orderAction(ORDER_CODE.RECEIVE, orderId); // 商家接单
        await this.orderAction(ORDER_CODE.END, orderId); // 订单完成
        await this.orderAction(ORDER_CODE.REFUND, orderId); // 退款成功
        break;
      case TYPE_CODE.TAKEOUT:
        result = await this.model('order')
          .where({order_id: orderId})
          .update({
            type: TYPE
          });
        await this.orderAction(ORDER_CODE.RECEIVE, orderId); // 商家接单
        await this.orderAction(ORDER_CODE.DELIVER, orderId); // 商家送餐
        await this.orderAction(ORDER_CODE.END, orderId); // 订单完成
        await this.orderAction(ORDER_CODE.REFUND, orderId); // 退款成功
        break;
    }
  }

  // 商家通过更改status来更新订单状态
  async orderAction() {
    const value = this.get();
    const CODE = value.status;
    const orderId = value.orderId;
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateData = {
      status: CODE
    };
    switch (CODE) {
      case ORDER_CODE.RECEIVE:
        updateData.orderRece_time = time;
        break;
      case ORDER_CODE.DELIVER:
        updateData.deliver_time = time;
        break;
      case ORDER_CODE.END:
        updateData.end_time = time;
        break;
      case ORDER_CODE.REFUND:
        updateData.refund_time = time;
        break;
    }
    const result = await this.model('order')
      .where({order_id: orderId})
      .update(updateData);
    if (result == 0) {
      this.ctx.response.body = '订单不存在，无法修改';
      this.jsonp('402021', 'Order_Receive_Error');
    } else {
      this.ctx.response.body = '商家已经接单，请等待';
      this.jsonp({result: result});
    }
  }

  async getAllOrderListAction() {
    var result = await this.model('order').select();
    this.jsonp(result.reverse());
  }

  // 获取单个的详细信息
  async getOneDetailAction() {
    var value = this.get();
    var order_id = value.order_id;
    var orderDetail = await this.model('food')
      .alias('food')
      .join({
        table: 'order_item',
        join: 'left',
        as: 'order_item',
        on: ['food_id', 'food_id']
      })
      .where({order_id: order_id})
      .select();

    orderDetail = JSON.parse(JSON.stringify(orderDetail));

    this.jsonp({result: orderDetail});
  }
};
