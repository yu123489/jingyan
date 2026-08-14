Page({
  data: {
    // 核心状态变量：默认展示'川盐古道' (gudao)
    currentTab: 'gudao',
    showSubMenu: false,  // 控制左侧四个子按钮的弹出/收起
    currentSubTab: 'route1' ,
    gudaoBtnText: '川盐古道'
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
    
    if (selectedTab === 'gudao') {
      // 点击左侧大按钮时，切换子菜单的展开/收起状态
      this.setData({
        currentTab: selectedTab,
        showSubMenu: !this.data.showSubMenu
      });
    } else {
      // 点击右侧盐业聚落时，隐藏子菜单
      this.setData({
        currentTab: selectedTab,
        showSubMenu: false
      });
    }
  },

  switchSubTab(e) {
    const subTab = e.currentTarget.dataset.sub;
    const subName = e.currentTarget.dataset.name; // 新增：获取对应的中文名称
    
    this.setData({
      currentSubTab: subTab,
      gudaoBtnText: subName, // 将大按钮的文字替换为用户点击的子菜单名字
      showSubMenu: false     // 点击后立刻收起（原路返回）
    });
  }
})