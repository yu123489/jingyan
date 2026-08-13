Page({
  data: {
    isAgreed: false // 默认未勾选协议
  },

  // 切换协议勾选状态
  toggleAgreement() {
    this.setData({
      isAgreed: !this.data.isAgreed
    });
  },

  // 微信一键登录主逻辑
  handleWechatLogin() {
    // 1. 强制校验是否勾选协议
    if (!this.data.isAgreed) {
      wx.showToast({
        title: '请先阅读并勾选底部协议',
        icon: 'none'
      });
      return;
    }

    // 2. 模拟登录过程 (未来这里接入 wx.login 和后端接口)
    wx.showLoading({ title: '登录中...' });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });

      // 3. 登录成功，使用 switchTab 跳转到带底部导航栏的首页
      // 注意：如果是跳转到 tabBar 页面，必须用 wx.switchTab，不能用 navigateTo
      wx.switchTab({
        url: '/pages/shouye/shouye'
      });
    }, 1000);
  },

  // 备用登录入口
  handleAccountLogin() {
    if (!this.data.isAgreed) {
      wx.showToast({
        title: '请先阅读并勾选底部协议',
        icon: 'none'
      });
      return;
    }
    
    // 如果后续需要账号登录，可以在这里跳转到一个新的输入账号密码的子页面
    wx.showToast({
      title: '账号登录模块开发中',
      icon: 'none'
    });
  }
})