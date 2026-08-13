Page({
  data: {
    // 模拟的用户数据，后续由后端接口真实下发
    userInfo: {
      avatarUrl: '',
      nickName: '盐脉探索者',
      checkins: 12,
      points: 350,
      collections: 8
    }
  },

  onLoad(options) {
    // 页面加载时，可以在这里调用接口获取最新用户数据
  },

  // 统一的页面路由跳转函数
  navigateTo(e) {
    // 获取前端 wxml 中绑定的 data-url 路径
    const targetUrl = e.currentTarget.dataset.url; 
    
    if (!targetUrl) {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
      return;
    }

    // 执行跳转
    wx.navigateTo({
      url: targetUrl,
      fail: (err) => {
        console.error('跳转失败，请检查目标页面是否在 app.json 中注册:', err);
        wx.showToast({
          title: '页面尚未配置',
          icon: 'none'
        });
      }
    });
  },

  // 配置小程序右上角及页面内的分享功能
  onShareAppMessage() {
    return {
      title: '快来体验盐脉微纪元，探索井盐文化的魅力！',
      path: '/pages/shouye/shouye' // 分享出去后别人点击进来的默认页面
    }
  }
})