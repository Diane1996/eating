module.exports = class extends think.Logic {
  addAction() {
    this.allowMethods = 'get';
    this.rules = {
      username: {required: true, string: true},
      password: {required: true, string: true}
    };
  }

  updateAction() {
    this.allowMethods = 'get';
    this.rules = {
      username: {required: true, string: true},
    };
  }

  deleteAction() {
    this.allowMethods = 'get';
    this.rules = {
      username: {required: true, string: true}
    };
  }

  selectAction() {
    this.allowMethods = 'get';
    this.rules = {
      username: {required: true, string: true}
    };
  }
}