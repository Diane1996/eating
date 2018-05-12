module.exports = class extends think.Model {
  selectAll(orderId) {
    // 查询用户订单列表的展示图片，名字信息，在order中查询用户订单，拿到order_id去order_item中查询所有food_id，取第一个food_id在food中查询图片和名字
    // const sql = "select * from (select * from eating_order_shipping as a where version=(select max(b.version) from eating_order_shipping as b where a.receiver_id = b.receiver_id and b.isDelete != 1)) as outerTable where outerTable.open_id='" + openId + "'";
    //
    // const sql = 'select * from eating_order_item where order_id = ' + orderId + ' limit 1';
    const sql = "select * from eating_food as a where (select * from eating_order_item as b where a.food_id = b.food_id and b.order_id = '" + orderId + "')";
    return this.query(this.parseSql(sql));
  }
};
