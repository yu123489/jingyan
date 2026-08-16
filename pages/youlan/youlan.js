Page({
  data: {
    currentTab: 'gudao',
    showSubMenu: false, 
    currentSubTab: 'route1' ,
    gudaoBtnText: '川盐古道',

    mapDesc: {
      'route1': '贵州素不产盐，历史上贵州人民所食之盐主要由川盐、淮盐、粤盐和滇盐运入，其中川盐占最大比重。川黔古盐道形成于明代，发展于清代，繁荣于民国时期，至 1946 年后衰落，它是西南地区极具历史价值的线性文化遗产，不仅是食盐运销的通道，也是承载文化传播交流的通道，对沿线地区的经济、文化、民族融合等方面都产生了重要影响。',
      'route2': '云南虽本产盐，但滇东北的昭通、曲靖地区距云南的盐产地道路险远，严重缺盐，历史上主要依靠自贡富荣盐场和乐山犍为盐场的食盐接济。川滇古盐道是川盐入滇的重要通道，与古代南方丝绸之路及茶马古道有互相交织的密切关系，食盐运销是南方丝绸之路及茶马古道上起源较早和极为重要的贸易活动',
      'route3': '主要从四川的云阳、郁山等地出发，通过古盐道送到利川等地，再由利川经武夷山区运至湘西、宜昌等地。历史上 “川盐” 的两次 “济楚” 事实上也是 “援湘”，川湘盐道与川鄂盐道有许多相关甚至重合的路线。在这条古盐道上，背夫、挑夫、马帮是食盐运输的主力军，他们的来来往往催生了一个个繁荣的村落和集镇，促进了川湘两地的经济交流和文化融合。',
      'route4': '从四川东部的产盐区出发，经过重庆、湖北等地，主要沿着长江及其支流，以及一些山间小道通往湖北各地。川鄂古盐道是连接四川和湖北的重要通道，在历史上对湖北地区的食盐供应起到了关键作用。它也是文化交流的重要纽带，促进了川鄂两地的商业往来、人员流动和文化传播，沿线留下了许多与盐运相关的历史遗迹和文化景观，如盐井、盐灶、码头、会馆等。'
    },
    scaleValue: 1
  },

  currentMapScale: 1,
  onLoad(options) {
    this.currentMapScale = 1;
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
  },

  //点击放大
  zoomIn() {
    let targetScale = this.currentMapScale + 0.5;
    if (targetScale > 4) targetScale = 4; // 防止超过最大倍数
    
    this.currentMapScale = targetScale; 
    this.setData({ scaleValue: targetScale }); 
  },

  // 点击缩小
  zoomOut() {
    let targetScale = this.currentMapScale - 0.5;
    if (targetScale < 1) targetScale = 1; // 防止小于原图
    
    this.currentMapScale = targetScale; 
    this.setData({ scaleValue: targetScale }); 
  },

  // 手指或代码触发缩放时，只默默记录
  onScale(e) {
    this.currentMapScale = e.detail.scale;
  }

})

