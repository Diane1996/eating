module.exports = class extends think.Logic {
  indexAction() {}

  createAction() {
    this.allowMethods = 'get';
    this.rules = {
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