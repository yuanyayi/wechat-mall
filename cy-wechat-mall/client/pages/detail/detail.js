// client/pages/detail/detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**ss
   * 页面的初始数据
   */
  data: {
    // product: {
    //   id: 1,
    //   image: 'https://product-1256088332.cos.ap-guangzhou.myqcloud.com/products/product2.jpg',
    //   name: '商品',
    //   price: 480.5,
    //   source: '国内·广东'
    // },
    product: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    this.getProduct(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 获取单一商品数据
  getProduct(id) {
    wx.showLoading({
      title: '商品数据加载中...',
    })
    qcloud.request({
      url: config.service.productDetail + id,
      success: result => {
        wx.hideLoading()
        let data = result.data
        // console.log(data);
        if (!data.code) {
          this.setData({
            product: data.data
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      },
      fail: () => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },

  // 立即购买
  buy() {
    wx.showLoading();
    let product = Object.assign({count: 1}, {id: this.data.product.id})
    // 腾讯云请求购买接口
    // 文档说明： https://github.com/tencentyun/wafer2-client-sdk/blob/master/README.md#request
    qcloud.request({
      url: config.service.addOrder,
      login: true,
      method: 'POST',
      data: {
        list: [product]
      },
      success: data => {
        wx.hideLoading();
        wx.showToast({
          title: data.code ? "商品购买失败" : "商品购买成功！",
          icon: "none"
        })
      },
      fail: ()=>{
        wx.hideLoading();
        wx.showToast({
          title: "商品购买失败",
          icon: "none"
        })
      }
    })
  }
})