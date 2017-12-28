module.exports = class extends think.Logic {
  orderReceiveAction() {
    this.allowMethods = 'get';
    this.rules = {
      order_id: {required: true, string: true}
    }
  }
}










