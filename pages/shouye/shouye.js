// pages/shouye/shouye.js
const LocationSkill = require('../../utils/locationSkill.js');

Page({
  data: {
    locationName: '', 
    bannerImages: [
      '/images/banner/1.png', 
      '/images/banner/2.png',
      '/images/banner/3.png',
      '/images/banner/4.png',
      '/images/banner/5.png',
      '/images/banner/6.png',
      '/images/banner/7.png',
      '/images/banner/8.png',
      '/images/banner/9.png',
      '/images/banner/10.png',
      '/images/banner/11.png',
    ],
    timelineImages: [
      '/images/屏幕截图 2026-08-09 140829.png'
    ],
    dailyTitle: '每日一词',
    dailyContent: '...',
    dailyImages: []
  },

  onLoad(options) {
    this.setData({
      dailyImages: ['/images/c3cef42a2b468df89e60554721b3eaf1.jpg'],
      dailyContent: ''
    });

    // 1. 初始化定位技能（填入你的 Key）
    LocationSkill.init('UJABZ-UFGRQ-I5352-2DOMW-TBBFQ-Y3BD2');

    // 2. 页面加载时静默请求定位
    this.requestLocation();
  },

  // 触发定位（代码极大简化）
  requestLocation() {
    wx.showLoading({ title: '寻迹中...' });
    LocationSkill.getCurrentLocation((err, locationName) => {
      wx.hideLoading();
      this.setData({ locationName: locationName });
    });
  },

  // 打开搜索弹窗
  openSearchModal() {
    const that = this;
    wx.showModal({
      title: '切换位置',
      editable: true,
      placeholderText: '请输入想查找的地点/博物馆',
      success(res) {
        if (res.confirm && res.content) {
          const keyword = res.content.trim();
          that.searchLocationByKeyword(keyword);
        }
      }
    });
  },

  // 调用搜索技能
  searchLocationByKeyword(keyword) {
    wx.showLoading({ title: '正在搜索...' });
    LocationSkill.searchLocation(keyword, (err, locationName) => {
      wx.hideLoading();
      if (!err && locationName) {
        this.setData({ locationName: locationName });
        wx.showToast({ title: '定位成功', icon: 'success' });
      } else {
        wx.showToast({ title: '未找到该地点', icon: 'none' });
      }
    });
  },

  // 路由跳转逻辑保持不变
  goToFeature(e) {
    const target = e.currentTarget.dataset.target;
    let targetUrl = '';
    switch (target) {
      case 'yun-lv': targetUrl = '/pages/rhythm/rhythm'; break;
      case 'lu-xian': targetUrl = '/pages/quiz/quiz'; break;
      case 'xun-bao': targetUrl = '/pages/treasure/treasure'; break;
      default:
        wx.showToast({ title: '敬请期待', icon: 'none' });
        return;
    }
    wx.navigateTo({
      url: targetUrl,
      fail: (err) => console.error('跳转失败:', err)
    });
  }
})