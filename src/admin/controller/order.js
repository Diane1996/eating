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
    await this.orderReceiveAction();
  }

  // 商家通过更改status来更新订单状态
  async orderReceiveAction() {
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    const orderId = this.get('order_id');
    const status = ORDER_CODE.RECEIVE;
    const result = await this.model('order')
      .where({order_id: orderId})
      .update({
        status: status,
        orderRece_time: time
      });
    if (result == 0) {
      this.ctx.response.body = '订单不存在，无法修改';
      this.fail('402021', 'Order_Receive_Error');
    } else {
      this.ctx.response.body = '商家已经接单，请等待';
      this.success({result: result});
    }
  }
};
