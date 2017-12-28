module.exports = class extends think.Logic {
  addAction() {
    this.allowMethods = 'get';
    this.rules = {
      category_name: {required: true, string: true},
      category_picture: {required: true, string: true}
    };
  }

  deleteAction() {
    this.allowMethods = 'get';
    this.rules = {
      category_id: {required: true, string: true}
    };
  }

  updateAction() {
    this.allowMethods = 'get';
    this.rules = {
      category_id: {required: true, string: true},
      category_name: {required: true, string: true},
      category_picture: {required: true, string: true}
    };
  }

  selectAction() {
    this.allowMethods = 'get';
    this.rules = {
      category_name: {required: true, string: true}
    };
  }

}