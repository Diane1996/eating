module.exports = class extends think.Logic {
  addAction() {
    this.allowMethods = 'post';
    this.rules = {
      open_id: {required: true, string: true},
      name: {required: true, string: true},
      phone: {required: true, string: true},
      address: {required: true, string: true}
    };
  }

  updateAction() {
    this.allowMethods = 'post';
    this.rules = {
      receiver_id: {required: true, string: true}
    };
  }

  deleteAction() {
    this.allowMethods = 'get';
    this.rules = {
      receiver_id: {required: true, string: true}
    };
  }

  findAllAction() {
    this.allowMethods = 'get';
    this.rules = {
      open_id: {required: true, string: true}
    };
  }
}