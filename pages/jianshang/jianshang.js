Page({
  data: {
    // 当前选中的展示模式：'3d' 或 'ar'
    currentMode: '3d', 
    
    // 当前正在展示的文物信息
    currentExhibit: {
      id: 1,
      name: '四海升平·盐卤提取器',
      image: '../../images/exhibit_1.png' // 临时占位图，用于在还没加载3D模型时显示
    },

    // 底部产品长廊的文物列表（模拟从后端获取的数据）
    exhibitList: [
      { id: 1, name: '四海升平', image: '../../images/3D/1.png' },
      { id: 2, name: '天工开物', image: '../../images/3D/2.png' },
      { id: 3, name: '蜀盐神工', image: '../../images/3D/3.png' },
      { id: 4, name: 'sdfg', image: '../../images/3D/4.png' },
      { id: 5, name: '水asas', image: '../../images/3D/5.png' },
      { id: 6, name: '卤', image: '../../images/3D/6.png' },
      { id: 7, name: '微澜', image: '../../images/3D/7.png' },
      { id: 8, name: '卤水微澜', image: '../../images/3D/8.png' },
    ]
  },

  // 生命周期函数：页面加载
  onLoad(options) {
    // 这里未来可以执行 3D 引擎的初始化
  },

  // 顶部：切换展示模式
  switchMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ currentMode: mode });
    
    // 未来在这里触发 3D 引擎或摄像头的状态切换
    if (mode === 'ar') {
      console.log('启动 AR 摄像头...');
    } else {
      console.log('切换回纯 3D 渲染...');
    }
  },

  // 底部长廊：选择文物并更新到上方展示区
  selectExhibit(e) {
    const selectedItem = e.currentTarget.dataset.item;
    this.setData({
      currentExhibit: selectedItem
    });
    
    console.log('用户选择了新文物，准备加载 3D 模型:', selectedItem.name);
    // 未来在这里通知 3D 引擎加载新的模型文件 (.gltf / .obj)
  },

  // 动作按钮：语音讲解
  playAudio() {
    console.log('播放语音讲解，对应文物ID:', this.data.currentExhibit.id);
  },

  // 动作按钮：详细信息
  showDetails() {
    console.log('跳转或弹窗显示详细信息，对应文物ID:', this.data.currentExhibit.id);
  }
})