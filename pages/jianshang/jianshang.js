// 引入您封装好的公共网络请求工具
import { myRequest } from '../../utils/api.js';

Page({
  data: {
    currentMode: '3d', 
    currentExhibit: {},
    exhibitList: [],
    audioContext: null
  },

  onLoad(options) {
    // 初始化音频播放器
    this.setData({ audioContext: wx.createInnerAudioContext() });
    this.fetchExhibitList();
  },

  // --- 核心网络请求逻辑 ---

  // 1. 获取底部长廊列表
  fetchExhibitList() {
    myRequest('/api/exhibits/list', 'GET').then(res => {
      // 假设您的 myRequest 已经解包了外层的 data
      this.setData({ exhibitList: res });
      
      // 如果列表有数据，默认自动请求第一个文物的详情并展示
      if (res && res.length > 0) {
        this.fetchExhibitDetail(res[0].id);
      }
    }).catch(err => {
      console.error('获取列表失败', err);
    });
  },

  // 2. 根据 ID 获取某个文物的详情（3D模型、语音、文字）
  fetchExhibitDetail(exhibitId) {
    myRequest(`/api/exhibits/detail?id=${exhibitId}`, 'GET').then(res => {
      this.setData({
        currentExhibit: res // 将后端返回的完整详情赋值给页面
      });
      console.log('成功获取文物详情，准备加载3D模型:', res.model_url);
      
      // 注意：如果您使用了 xr-frame，这里可以直接通过数据绑定更新 3D 模型的 src
    }).catch(err => {
      console.error('获取详情失败', err);
    });
  },

  // --- 交互动作 ---

  // 底部长廊：用户点击切换文物
  selectExhibit(e) {
    const selectedItem = e.currentTarget.dataset.item;
    
    // 如果正在播放上一个文物的语音，先停止
    if (this.data.audioContext) {
      this.data.audioContext.stop();
    }

    console.log('用户点击了长廊文物:', selectedItem.name);
    // 拿着点击的文物 ID，去向后端请求详细数据
    this.fetchExhibitDetail(selectedItem.id);
  },

  // 动作按钮：语音讲解
  playAudio() {
    const audioUrl = this.data.currentExhibit.audio_url;
    if (!audioUrl) {
      wx.showToast({ title: '暂无语音讲解', icon: 'none' });
      return;
    }
    
    const audioCtx = this.data.audioContext;
    audioCtx.src = audioUrl;
    audioCtx.play();
    wx.showToast({ title: '正在播放语音', icon: 'none' });
  },

  // 动作按钮：详细信息
  showDetails() {
    const desc = this.data.currentExhibit.description;
    if (!desc) {
      wx.showToast({ title: '暂无详细信息', icon: 'none' });
      return;
    }
    
    // 使用微信原生弹窗展示详情文字
    wx.showModal({
      title: this.data.currentExhibit.name,
      content: desc,
      showCancel: false,
      confirmText: '阅毕',
      confirmColor: '#436C85'
    });
  },

  // 顶部：切换展示模式
  switchMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ currentMode: mode });
  },

  // ★ 全新 AI 识别逻辑：支持拍照与相册，包含优雅的权限引导
  openARCamera() {
    wx.chooseMedia({
      count: 1, // 限制只能选1张
      mediaType: ['image'], 
      // 核心修改：同时允许从相册选择和使用相机
      sourceType: ['album', 'camera'], 
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        wx.showLoading({ title: 'AI 识别中...', mask: true });

        // 将拍摄的高清照片上传给后端
        wx.uploadFile({
          url: 'http://127.0.0.1:8080/api/recognize', // 替换为真实的后端 AI 接口
          filePath: tempFilePath,
          name: 'file', // 后端接收文件的字段名
          success: (uploadRes) => {
            wx.hideLoading();
            try {
              const data = JSON.parse(uploadRes.data);
              
              if (data.code === 200 && data.exhibit_id) {
                wx.showToast({ title: '识别成功！', icon: 'success' });
                // 拿着识别出来的 ID，去拉取这个文物的 3D 模型和详情数据
                this.fetchExhibitDetail(data.exhibit_id);
                // 自动切回 3D 模式
                this.setData({ currentMode: '3d' }); 
              } else {
                wx.showToast({ title: '未匹配到相关文物', icon: 'error' });
              }
            } catch (e) {
              wx.showToast({ title: '服务器响应异常', icon: 'error' });
            }
          },
          fail: (err) => {
            wx.hideLoading();
            console.error('上传识别失败', err);
            wx.showToast({ title: '网络连接异常', icon: 'none' });
          }
        });
      },
      fail: (err) => {
        // 如果是因为用户之前拒绝过权限导致无法唤起相机/相册，进行友好引导
        if (err.errMsg.includes('auth deny') || err.errMsg.includes('authorize:fail')) {
          wx.showModal({
            title: '需要权限',
            content: '需要相册或相机权限才能进行展品识别，是否前往设置开启？',
            confirmText: '去设置',
            confirmColor: '#436C85',
            success: (modalRes) => {
              if (modalRes.confirm) {
                // 引导用户跳转到小程序的设置页手动开启权限
                wx.openSetting(); 
              }
            }
          });
        }
      }
    });
  },
  
  // 页面卸载时清理音频，防止在后台一直播
  onUnload() {
    if (this.data.audioContext) {
      this.data.audioContext.destroy();
    }
  }
})