module.exports = class extends think.Model {
  selectAll(openId) {

    // 查询用户地址信息版本最高的并且未被标记为删除的
    const sql = "select * from (select * from eating_order_shipping as a where version=(select max(b.version) from eating_order_shipping as b where a.receiver_id = b.receiver_id and b.isDelete != 1)) as outerTable where outerTable.open_id='" + openId + "'";

    return this.query(this.parseSql(sql));
  }
}