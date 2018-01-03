module.exports = class extends think.Model {
  selectAll(openId) {
    const sql = 'select * from (select * from eating_order_shipping as a where receiver_version=(select max(b.receiver_version) from eating_order_shipping as b where a.receiver_id = b.receiver_id)) as outerTable where outerTable.open_id=' + openId;

    return this.query(this.parseSql(sql));
  }
}