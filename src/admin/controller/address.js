const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        // await this.addAction();
        // await this.deleteAction();
        // await this.updateAction();
    }

    async addAction() {
        const cId = this.get('category_id');
        // food_id自动生成，不允许修改
        const fId = Math.random().toString(16).substring(2, 10); // 8位16进制，字符串
        const price = this.get('price');
        const picture = this.get('picture');
        const name = this.get('name');
        const sales = this.get('sales');
        const cResult = await this.model('category')
            .where({category_id: cId}).find();
        if (think.isEmpty(cResult)) {
            this.ctx.response.body = '数据添加失败，请稍后再试';
            return this.fail(402001, 'category_id_Empty_Error');
        } else {
            const fResult = await this.model('food')
                .where({food_id: fId}).thenAdd({
                    category_id: cId,
                    food_id: fId,
                    food_price: price,
                    food_picture: picture,
                    food_name: name,
                    food_sales: sales
                });
            if (fResult.type === 'exist') {
                this.ctx.response.body = '数据已经存在，不能重复插入';
                return this.fail(402002, 'already_have_food_id_Error');
            } else {
                this.ctx.response.body = '数据插入成功';
                return this.success({result: fResult});
            }
        }
    }

    async deleteAction() {
        const cId = this.get('food_id');
        const result = await this.model('food')
            .where({food_id: cId}).delete();

        if (result == 0) {
            this.ctx.response.body = '删除错误';
            return this.fail(402003, 'food_id_Empty_delete_error');
        } else {
            this.ctx.response.body = '删除成功';
            return this.success({result: result});
        }
    }

    async updateAction() {
        const cId = this.get('category_id');
        const fId = this.get('food_id');
        const price = this.get('price');
        const picture = this.get('picture');
        const name = this.get('name');
        const sales = this.get('sales');
        const cResult = await this.model('category')
            .where({category_id: cId}).find();
        if (think.isEmpty(cResult)) {
            this.ctx.response.body = '数据不存在';
            return this.fail(402004, 'category_id_Empty_Error');
        } else {
            const fResult = await this.model('food')
                .where({food_id: fId}).update({
                    category_id: cId,
                    food_price: price,
                    food_picture: picture,
                    food_name: name,
                    food_sales: sales
                });
            if (fResult.type === 'exist') {
                this.ctx.response.body = '数据不存在';
                return this.fail(402005, 'food_id_Empty_Error');
            } else {
                this.ctx.response.body = '数据更新成功';
                return this.success({result: fResult});
            }

        }
    }
}