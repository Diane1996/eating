module.exports = class extends think.Logic {
  addAction() {
    this.allowMethods = 'get';
    this.rules = {
      category_id: {required: true, string: true},
      food_id: {string: true},
      price: {required: true, double: true},
      picture: {required: true, string: true},
      name: {required: true, string: true},
      sales: {required: true, int: true}
    };
  }

  deleteAction() {
    this.allowMethods = 'get';
    this.rules = {
      food_id: {required: true, string: true}
    };
  }
  updateAction() {
    this.allowMethods = 'get';
    this.rules = {
      category_id: {required: true, string: true},
      food_id: {required: true, string: true},
      price: {double: true},
      picture: {string: true},
      name: {string: true},
      sales: {int: true}
    };
  }
}