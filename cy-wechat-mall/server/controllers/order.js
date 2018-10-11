const DB = require('../utils/db.js')
module.exports = {
  /* 创建订单
   * 需要同时操作订单用户表和订单商品表
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    let productList = ctx.request.body.List || []

    let order = await DB.query('insert into order_user(user) values (?)', [user])
    let orderId = order.insertId;
    let sql = 'INSERT INTO order_product (order_id, product_id, count) VALUES '

    let param = []
    let query = [] // forLoop

    productList.forEach(product => { // forLoop
      query.push('(?, ?, ?)')

      param.push(orderId)
      param.push(product.id)
      param.push(product.count || 1)
    }) // forLoop

    // await DB.query(sql + '(?, ?, ?)', param) // Single Query
    await DB.query(sql + query.join(', '), param)  // forLoop
  }
}