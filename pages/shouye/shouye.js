
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js'); 

let qqmapsdk;

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
    dailyTitle: '每日一次',
    dailyContent: '...'
  },

  onLoad(options) {
    // 3. 实例化腾讯地图 API 核心类（请把下面引号里的 key 换成你自己的）
    qqmapsdk = new QQMapWX({
      key: 'UJABZ-UFGRQ-I5352-2DOMW-TBBFQ-Y3BD2' 
    });

    this.setData({
      dailyImages: ['/images/c3cef42a2b468df89e60554721b3eaf1.jpg'],
      dailyContent: ''
    });

    // 页面加载时静默请求定位
    this.requestLocation();
  },

  // 核心功能：获取经纬度并解析为城市名
  requestLocation() {
    const that = this;
    wx.showLoading({ title: '定位中...' });

    // 先获取硬件经纬度
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // 获取成功，开始调用逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          get_poi: 1,
          success: function (addressRes) {
            wx.hideLoading();
            console.log('解析结果：', addressRes.result);
            
            // 提取出城市名称
            const city = addressRes.result.address_component.city || '自贡市';
            
            that.setData({
              locationName: city
            });
          },
          fail: function (error) {
            wx.hideLoading();
            console.error('逆地址解析失败', error);
            that.setData({ locationName: '自贡市' });
          }
        });
      },
      fail(err) {
        wx.hideLoading();
        console.error('获取定位失败', err);
        // 硬件拿不到时直接优雅兜底，避免报错
        that.setData({ locationName: '自贡市' });
      }
    });
  },

  // 用户自主搜索位置功能
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

  // 调用腾讯地图关键字检索 API
  searchLocationByKeyword(keyword) {
    const that = this;
    wx.showLoading({ title: '正在搜索...' });

    qqmapsdk.geocoder({
      address: keyword,
      success: function (res) {
        wx.hideLoading();
        if (res.result) {
          const locationInfo = res.result;
          that.setData({
            locationName: locationInfo.title || keyword
          });
          wx.showToast({
            title: '定位成功',
            icon: 'success'
          });
        }
      },
      fail: function (error) {
        wx.hideLoading();
        wx.showToast({
          title: '未找到该地点',
          icon: 'none'
        });
      }
    });
  },

  // 原有的路由跳转逻辑
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
      fail: (err) => {
        console.error('跳转失败:', err);
      }
    });
  }
})