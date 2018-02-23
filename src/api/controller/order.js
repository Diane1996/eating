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

module.exports = class extends Base {
  async indexAction() {

  }

  async createAction() {
    const orderId = Math.random().toString(16).substring(2, 10);
    const value = this.get();
    const addOrderData = {
      order_id: orderId,
      open_id: value.open_id,
      shipping_fee: value.shipping_fee,
      type: value.type,
      desk_num: value.desk_num,
      people_num: value.people_num,
      receiver_id: value.receiver_id,
      create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      status: ORDER_CODE.PAY_NO,
      remark: value.remark
    };
    const OrderItemData = JSON.parse(value.food_data);
    const result = await this.model('order')
      .where({order_id: orderId})
      .thenAdd(addOrderData);
    var dataList = [];
    console.log(OrderItemData[0].food_id)
    for (const item of OrderItemData) {
      console.log(typeof item.food_id)
      dataList.push({food_id: item.food_id[0], order_id: orderId, count: item.count});
    }

    console.log(dataList);
    const resultOrderItem = await this.model('order_item').addMany(dataList);
    console.log(resultOrderItem);

    if (result === 0 || resultOrderItem === 0) {
      this.ctx.response.body = '订单已存在，不能添加';
      this.fail('402091', 'Order_exist_Error');
    } else {
      this.ctx.response.body = '添加数据成功';
      this.success({result: result});
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
}