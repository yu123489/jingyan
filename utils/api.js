// utils/api.js

// 1. 替换为真实的后端地址。
// 如果后端和您在同一个 Wi-Fi 下联调，请换成他电脑的局域网 IP，例如 'http://192.168.1.100:8080'
// 注意：使用本地 http 地址时，务必在开发者工具右上角“详情” -> “本地设置”中，勾选“不校验合法域名”
const BASE_URL = 'http://127.0.0.1:8080'; 

export const myRequest = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    
    // 发起请求前，自动显示加载动画
    wx.showLoading({ title: '加载中...', mask: true });

    wx.request({
      url: BASE_URL + url,
      method: method,
      data: data,
      header: { 
        'content-type': 'application/json',
        // 2. 从本地缓存动态读取 token，传给后端进行身份验证
        'Authorization': wx.getStorageSync('token') || '' 
      },
      success: (res) => {
        wx.hideLoading(); // 收到响应后隐藏动画
        
        // 3. 基础 HTTP 状态码拦截（此处假设 200 为成功，具体需与后端约定）
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          // 统一的错误提示
          wx.showToast({ title: res.data.message || '请求失败', icon: 'none' });
          reject(res.data);
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: '网络开小差了', icon: 'error' });
        reject(err);
      }
    });
  });
};