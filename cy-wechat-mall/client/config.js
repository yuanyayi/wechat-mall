/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://y7ctmpi2.qcloud.la';
// 图片地址sql = "https://cy-wechat-mall-1257428156.cos.ap-beijing.myqcloud.com/products/"

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    //  自建路由
    // 查看商品信息
    productList: `${host}/weapp/product`,

    // 获取单一商品信息
    productDetail: `${host}/weapp/product/`,

    // 拉取用户信息
    user: `${host}/weapp/user`,

    // 创建订单
    addOrder: `${host}/weapp/order/add`,
  }
};

module.exports = config;