const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    // return this.display();

    // const user = await this.model('admin').select();

    // console.log(model);
    // const user = model.getList();
    // this.addCartAction();

    // console.log(user);
    // this.ctx.body = user;

    this.ctx.body = this.model('index').otherThing();

  }

  async addCartAction() {
    // return this.display();
    // const user = await this.model('user').limit(2).select();
    // console.log(model);
    this.ctx.body = '加入购物车';
    // const user = model.getList();
    // this.ctx.body = user;
  }

  async loginAction() {
    let comment = this.model('index').getList();
    console.log(comment);
    this.ctx.response.body = comment;
  }


};
