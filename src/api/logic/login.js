module.exports = class extends think.Logic {
  indexAction() {
    this.allowMethods = 'get';
    this.rules = {
      username: {required: true, string: true},
      password: {required: true, string: true}
    };

    // let flag = this.validate(rules);
    // this.ctx.body = this.param('a');
  }
};
