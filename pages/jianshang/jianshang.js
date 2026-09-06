
const { localExhibits } = require('../../Data/jianshangData');

Page({
  data: {
    currentMode: '3d', 
    currentExhibit: {},
    exhibitList: [],
    audioContext: null,
    showScene: true
  },

  onLoad(options) {
    this.setData({ audioContext: wx.createInnerAudioContext() });
    this.fetchExhibitList();
  },

  // 加载本地数据列表
  fetchExhibitList() {
    this.setData({ exhibitList: localExhibits });
    if (localExhibits.length > 0) {
      this.fetchExhibitDetail(localExhibits[0].id);
    }
  },

  // 从本地数组中找出文物详情
  fetchExhibitDetail(exhibitId) {
    const exhibit = localExhibits.find(item => item.id === exhibitId);
    if (exhibit) {
      this.setData({ currentExhibit: exhibit });
      console.log('加载文物成功:', exhibit.name);
    }
  },

  // --- 交互动作 ---

  selectExhibit(e) {
    const selectedItem = e.currentTarget.dataset.item;
    if (this.data.audioContext) {
      this.data.audioContext.stop();
    }

    console.log('用户点击了长廊文物:', selectedItem.name);
    // 拿着点击的文物 ID，去向后端请求详细数据
    this.setData({ showScene: false });
    setTimeout(() => {
      this.fetchExhibitDetail(selectedItem.id);
      this.setData({ showScene: true });
    }, 50);
  },

  // 语音讲解
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

  // 详细信息
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

  // 切换展示模式
  switchMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ currentMode: mode });
  },

  // AI识别逻辑：支持拍照与相册，包含优雅的权限引导
  openARCamera() {
    wx.chooseMedia({
      count: 1, 
      mediaType: ['image'], 
      sourceType: ['album', 'camera'], 
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        wx.showLoading({ title: 'AI 识别中...', mask: true });
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
                this.fetchExhibitDetail(data.exhibit_id);
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
        if (err.errMsg.includes('auth deny') || err.errMsg.includes('authorize:fail')) {
          wx.showModal({
            title: '需要权限',
            content: '需要相册或相机权限才能进行展品识别，是否前往设置开启？',
            confirmText: '去设置',
            confirmColor: '#436C85',
            success: (modalRes) => {
              if (modalRes.confirm) {
                wx.openSetting(); 
              }
            }
          });
        }
      }
    });
  },
  
  onUnload() {
    if (this.data.audioContext) {
      this.data.audioContext.destroy();
    }
  }
})