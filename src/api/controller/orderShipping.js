const Base = require('./base.js');
const moment = require('moment');

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function(value) {
            step('next', value);
          }, function(err) {
            step('throw', err);
          });
        }
      }

      return step('next');
    });
  };
}

module.exports = class extends Base {
  async indexAction() {
    // await this.addAction();
    // await this.updateAction();
    // await this.deleteAction();
    await this.findAllAction();
  }

  async addAction() {
    const value = this.get();
    const rId = Math.random().toString(16).substring(2, 10);

    // 用户信息初始版本为1，每更新一次就加一
    const data = {
      open_id: value.open_id,
      receiver_id: rId,
      receiver_name: value.receiver_name,
      receiver_phone: value.receiver_phone,
      receiver_address: value.receiver_address,
      created: moment.now(),
      receiver_version: 1,
      receiver_isDelete: 0
    };

    //
    const result = await this.model('order_shipping')
      .where({
        open_id: value.open_id,
        receiver_id: rId,
        receiver_name: value.receiver_name,
        receiver_phone: value.receiver_phone,
        receiver_address: value.receiver_address,
        receiver_version: ['>', 0]
      })
      .thenAdd(data);

    if (result === 0) {
      this.ctx.response.body = '数据已经存在';
      this.fail('402071', 'OrderShipping_exist_Error');
    } else {
      this.ctx.response.body = '添加数据成功';
      this.success({result: result});
    }
  }

  async updateAction() {
    const value = this.get();
    const data = {
      open_id: value.open_id,
      receiver_name: value.receiver_name,
      receiver_phone: value.receiver_phone,
      receiver_address: value.receiver_address,
      updated: moment.now(),
      receiver_version: value.receiver_version + 1,
      receiver_isDelete: 0
    };

    const result = await this.model('order_shipping')
      .where({
        open_id: value.open_id,
        receiver_name: value.receiver_name,
        receiver_phone: value.receiver_phone,
        receiver_address: value.receiver_address,
        receiver_version: value.receiver_version + 1
      }).thenAdd(data);

    if (result === 0) {
      this.ctx.response.body = '数据修改失败，请重试';
      this.fail('402072', 'OrderShipping_Update_Error');
    } else {
      this.ctx.response.body = '修改数据成功';
      this.success({result: result});
    }
  }

  async deleteAction() {
    const value = this.get();

    const result = await this.model('order_shipping')
      .where({receiver_id: value.receiver_id}).update({receiver_isDelete: 1});

    if (result === 0) {
      this.ctx.response.body = '数据删除失败，请重试';
      this.fail('402073', 'OrderShipping_Delete_Error');
    } else {
      this.ctx.response.body = '删除数据成功';
      this.success({result: result});
    }
  }

  async findAllAction() {

    const _this = this;

    return _asyncToGenerator(function* () {
      const value = _this.get();

      const open_id = value.open_id;

      const result = yield _this.model('orderShipping').selectAll(open_id);
      console.log(result);

      if (think.isEmpty(result)) {
        _this.ctx.response.body = '数据不存在';
        _this.fail('402091', 'Receiver_id_is_not_exist_Error');
      } else {
        _this.ctx.response.body = result;
        _this.success({result: result});
      }
    })();
  }


}