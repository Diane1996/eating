const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const role = this.get('role');
    if (role === 1) {
      // await this.addAction();
      // await this.updateAction();
      // await this.deleteAction();
      await this.selectAction();
    } else {
      this.ctx.response.body = '该用户没有权限操作数据';
      this.fail('402013', 'No_Access_Admin_Error');
    }
  }

  async addAction() {
    const username = this.get('username');
    const password = this.get('password');
    const result = await this.model('admin')
      .where({username: username})
      .thenAdd({
        username: username,
        password: password,
        role: 2
      });
    if (result.type === 'exist') {
      this.ctx.response.body = '添加数据失败';
      this.jsonp('402012', 'Having_Admin_username_Error');
    } else {
      this.ctx.response.body = '成功添加数据';
      this.jsonp({result: result});
    }
  }

  async updateAction() {
    const username = this.get('username');
    const curRole = await this.model('admin')
      .where({username: username}).find();
    const role = curRole.admin_role === 2 ? 3 : 2;
    const result = await this.model('admin')
      .where({username: username})
      .update({
        admin_role: role
      });
    if (result === 0) {
      this.ctx.response.body = '修改数据失败';
      this.fail('402014', 'Changing_Admin_username_Error');
    } else {
      this.ctx.response.body = '成功修改数据';
      this.success({result: result});
    }
  }

  async deleteAction() {
    const username = this.get('username');
    const password = this.get('password');

    const result = await this.model('admin')
      .where({username: username, password: password}).delete();
    if (result === 0) {
      this.ctx.response.body = '删除数据失败';
      this.jsonp('402015', 'Delete_Admin_Error');
    } else {
      this.ctx.response.body = '成功修改数据';
      this.jsonp({result: result});
    }
  }

  async getAllAction() {
    const result = await this.model('admin')
      .where({role: 2}).select();
    if (think.isEmpty(result)) {
      this.ctx.response.body = '数据不存在';
      this.jsonp('402016', 'Select_Admin_Empty_Error');
    } else {
      this.ctx.response.body = '成功修改数据';
      this.jsonp({result: result});
    }
  }
};
