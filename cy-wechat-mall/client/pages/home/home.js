// home.js
const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const app = getApp()
// const mockProductList = [{
//   id: 1,
//   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
//   name: '商品1',
//   price: 100,
//   source: '国内·广东',
// }, {
//   id: 2,
//   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
//   name: '商品2',
//   price: 200,
//   source: '国内·广东',
// }, {
//   id: 3,
//   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
//   name: '商品3',
//   price: 300,
//   source: '国内·广东',
// }, {
//   id: 4,
//   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
//   name: '商品4',
//   price: 400,
//   source: '国内·广东',
// }, {
//   id: 5,
//   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product5.jpg',
//   name: '商品5',
//   price: 500,
//   source: '国内·广东',
// }]
// Page Main
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // 商品列表
    // productList: mockProductList, // test
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // offcial
    this.getProductList()
  },

  // 获取商品列表
  getProductList() {
    wx.showLoading({
      title: '商品数据加载中...',
    })
    qcloud.request({
      url: config.service.productList,
      success: result => {
        // console.log(result.data)
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            productList: result.data.data
          })
          return false;
        }
        wx.showToast({
          title: '商品数据加载失败！',
          icon: 'none',
          duration: 3000
        })
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '商品数据加载失败！',
          icon: 'none',
          duration: 3000
        })
        console.log('error!')
      }
    })
  }
})