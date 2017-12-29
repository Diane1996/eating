module.exports = class extends think.Logic {
  orderAction() {
    this.allowMethods = 'get';
    this.rules = {
      order_id: {required: true, string: true}
    };
  }
}










