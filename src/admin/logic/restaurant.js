module.exports = class extends think.Logic {
  updateAction() {
    this.allowMethods = 'get';
    this.rules = {
      name: {string: true},
      phone: {string: true},
      address: {string: true},
      remark: {string: true}
    };
  }
}