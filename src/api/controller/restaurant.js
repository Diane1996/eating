const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const data = await this.model('restaurant').select();
    console.log('data: ', data);
    if (think.isEmpty(data)) {
      this.jsonp('402061', 'Restaurant_empty_Error');
    } else {
      this.jsonp({result: data});
    }
  }
};
