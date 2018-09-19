/* 
 * 给所有的小程序Page增加一个方法，在Page.onHide时放弃所有未完成的网络请求。
 */
const storePage = Page;
Page = function _Page(options) {
  if (options.onHide) {
    const onHide = options.onHide;
    options.onHide = function _onHide() {
      onHide.call(this.arguments);
      fetch.methods.cancelAllReqs();
    };
  }
  return storePage(options);
}
