const _ = require('lodash');

module.exports = class extends think.Model {
  getList() {
    // const user = await this.model('user').limit(2).select();
    // return user;
    return '345';
  }

  otherThing() {
    return 'abc';
  }
};


