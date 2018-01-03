module.exports = class extends think.Logic {
  indexAction() {}

  createAction() {
    this.allowMethods = 'get';
    this.rules = {
      open_id: {required: true, string: true},
      shipping_fee: {required: true, string: true},
      type: {required: true, string: true}
    };
  }

  paymentAction() {
    this.allowMethods = 'get';
    this.rules = {
      order_id: {required: true, string: true},
      open_id: {required: true, string: true}
    };
  }

  cancelAction() {
    this.allowMethods = 'get';
    this.rules = {
      order_id: {required: true, string: true},
      open_id: {required: true, string: true}
    };
  }

}