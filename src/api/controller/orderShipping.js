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
    const value = this.post();
    const rId = Math.random().toString(16).substring(2, 10);

    // 用户信息初始版本为1，每更新一次就加一
    const data = {
      open_id: value.open_id,
      receiver_id: rId,
      name: value.name,
      phone: value.phone,
      address: value.address,
      created: moment().format('YYYY-MM-DD HH:mm:ss'),
      version: 1,
      receiver_isDelete: 0
    };

    const result = await this.model('order_shipping')
      .where({
        open_id: value.open_id,
        name: value.name,
        phone: value.phone,
        address: value.address,
        version: ['>', 0]
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
    const value = this.post();

    const version = await this.model('order_shipping')
      .where({
        open_id: value.open_id,
        receiver_id: value.receiver_id
      })
      .max('version');
    console.log('version: ', version);

    const data = {
      open_id: value.open_id,
      receiver_id: value.receiver_id,
      phone: value.phone,
      name: value.name,
      address: value.address,
      created: moment().format('YYYY-MM-DD HH:mm:ss'),
      version: version + 1,
      receiver_isDelete: 0
    };

    const result = await this.model('order_shipping')
      .where({
        open_id: value.open_id,
        receiver_id: value.receiver_id,
        phone: value.phone,
        name: value.name,
        address: value.address
      }).thenAdd(data);

    if (result === 0) {
      this.ctx.response.body = '数据修改失败，请重试';
      this.fail('402072', 'OrderShipping_Update_Error');
    } else {
      this.ctx.response.body = '修改数据成功';
      this.success({result: result});
    }
  }

  async deleteAddressAction() {
    const value = this.post();
    var data = {
      receiver_id: value.receiver_id,
      open_id: value.open_id
    };

    const result = await this.model('order_shipping')
      .where(data).update({isDelete: 1});

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

    return _asyncToGenerator(function * () {
      const value = _this.get();

        const open_id = value.open_id;
        // const open_id = 123456;

      const result = yield _this.model('orderShipping').selectAll(open_id);
      // const result = yield _this.model('order_Shipping')
      // .where({open_id: open_id, isDelete: 0})
      // .max('version')
      // .select();
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
};
