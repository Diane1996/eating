module.exports = class extends think.Logic {
  addAction() {
    this.allowMethods = 'get';
    this.rules = {
      open_id: {required: true, string: true},
      receiver_name: {required: true, string: true},
      receiver_phone: {required: true, string: true},
      receiver_address: {required: true, string: true}
    };
  }

  updateAction() {
    this.allowMethods = 'get';
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