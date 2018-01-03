const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    this.ctx.body = '123';
    // return this.display();
  }

  // 获取购物车中的数据
  async getCartAction() {
    const open_id = this.get('open_id');

    const cartList = await this.model('cart')
      .where({open_id: open_id}).select();

    let list = [];
    let total = 0;
    for (const cartItem of cartList) {
      const itemValue = await this.model('food')
        .where({food_id: cartItem.food_id})
        .getField('food_price,food_picture,food_name');
      list.push(itemValue);
      total += cartItem.amount * itemValue.price;
    }

    return {
      open_id: open_id,
      food_data: list,
      total: total
    };

  }

  async addAction() {
    const value = this.get();
    const addData = {
      food_id: value.food_id,
      open_id: value.open_id
    };

    const result = await this.model('cart')
      .where(addData)
      .thenAdd({
        food_id: addData.food_id,
        open_id: addData.open_id,
        amount: 1
      });
    if (result == 0) {
      const result2 = await this.model('cart')
        .where(addData).increment({amount: 1});
    } else {
      this.ctx.response.body = '添加数据成功';
      this.success({result: result});
    }
  }

  async updateAction() {
    const value = this.get();
    const data = {
      food_id: value.food_id,
      open_id: value.open_id,
      amount: value.amount
    };

    const result = await this.model('cart')
      .where({
        food_id: value.food_id,
        open_id: value.open_id
      })
      .update(data);

    if (result == 0) {
      this.ctx.response.body = '修改数据失败';
      this.fail('402031', 'Update_Cart_Error');
    } else {
      this.ctx.response.body = '修改数据成功';
      this.success({result: result});
    }
  }

  async deleteAction() {
    const value = this.get();
    const data = {
      food_id: value.food_id,
      open_id: value.open_id
    }

    const result = await this.model('cart')
      .where(data).delete();

    if (result == 0) {
      this.ctx.response.body = '删除数据失败';
      this.fail('402032', 'Delete_Cart_Error');
    } else {
      this.ctx.response.body = '删除数据成功';
      this.success({result: result});
    }
  }

};












