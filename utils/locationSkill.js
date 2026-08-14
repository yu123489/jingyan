// utils/locationSkill.js
const QQMapWX = require('./qqmap-wx-jssdk.min.js');

const LocationSkill = {
  // 核心地图实例
  qqmapsdk: null,

  // 初始化 SDK
  init(key) {
    if (!this.qqmapsdk) {
      this.qqmapsdk = new QQMapWX({ key: key });
    }
  },

  // 获取当前精准位置（带超时和精细化地名解析）
  getCurrentLocation(callback) {
    if (!this.qqmapsdk) {
      return callback(new Error('地图SDK未初始化'), '自贡市');
    }

    const that = this;
    wx.getLocation({
      type: 'wgs84',
      timeout: 3000, // 3秒超时保护
      success(res) {
        that.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          get_poi: 1,
          success: function (addressRes) {
            const info = addressRes.result;
            const city = info.address_component.city || '自贡市';
            const district = info.address_component.district || '';
            
            let detailLocation = city;
            // 精细化提取：优先显示地标 POI，其次显示区县，最后兜底城市
            if (info.pois && info.pois.length > 0) {
              detailLocation = `${city}·${info.pois[0].title}`;
            } else if (district) {
              detailLocation = `${city}${district}`;
            }
            
            callback(null, detailLocation);
          },
          fail: function (err) {
            console.error('逆地址解析失败', err);
            callback(err, '定位失败');
          }
        });
      },
      fail(err) {
        console.warn('获取硬件定位失败/超时', err);
        callback(err, '定位失败');
      }
    });
  },

  // 关键字搜索位置
  searchLocation(keyword, callback) {
    if (!this.qqmapsdk) {
      return callback(new Error('地图SDK未初始化'), null);
    }

    this.qqmapsdk.geocoder({
      address: keyword,
      success: function (res) {
        if (res.result) {
          callback(null, res.result.title || keyword);
        } else {
          callback(new Error('未匹配到结果'), null);
        }
      },
      fail: function (err) {
        callback(err, null);
      }
    });
  }
};

module.exports = LocationSkill;