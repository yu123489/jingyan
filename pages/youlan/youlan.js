Page({
  data: {
    // 核心状态变量：默认展示'川盐古道' (gudao)
    currentTab: 'gudao' 
  },

  onLoad(options) {
    // 页面加载时的初始化逻辑
  },

  // 顶部按钮：跳转到新页面
  navigateTo(e) {
    const targetUrl = e.currentTarget.dataset.url;
    if (targetUrl) {
      wx.navigateTo({
        url: targetUrl,
        fail: (err) => {
          console.error('跳转失败:', err);
          wx.showToast({ title: '功能开发中', icon: 'none' });
        }
      });
    }
  },

  // 底部按钮：切换当前展示的内容页签
  switchTab(e) {
    const selectedTab = e.currentTarget.dataset.tab;
    // 如果点击的就是当前已选中的，则不执行任何操作
    if (this.data.currentTab === selectedTab) return;
    
    // 更新状态，WXML 会自动根据新状态重新渲染中间区域
    this.setData({
      currentTab: selectedTab
    });
  }
})