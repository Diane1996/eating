const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    this.ctx.body = '123';
    // return this.display();
  }
};
