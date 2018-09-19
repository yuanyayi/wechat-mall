const DB = require('../utils/db.js')
module.exports = {
  // client: config.js 
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },
  // 获取商品详情
  detail: async ctx => {
    let productId = +ctx.params.id
    let product = {}
    if (!isNaN(productId)) {
      product = (await DB.query('select * from product where product.id = ?', [productId]))[0]
    }
    ctx.state.data = product
  }
}