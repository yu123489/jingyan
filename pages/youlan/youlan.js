Page({
  data: {
    currentTab: 'gudao',
    showSubMenu: false, 
    currentSubTab: 'all' ,
    gudaoBtnText: '川盐古道',

    mapDesc: {
      'all': '川盐古道是指古代四川向周边省份运送食盐的交通路网，主要包含川黔、川滇、川湘、川鄂四大主干道。它不仅是食盐运销的动脉，更是西南地区极为重要的经济、文化和民族交融走廊。',
      'route1': '贵州素不产盐，历史上贵州人民所食之盐主要由川盐、淮盐、粤盐和滇盐运入，其中川盐占最大比重。川黔古盐道形成于明代，发展于清代，繁荣于民国时期，至 1946 年后衰落，它是西南地区极具历史价值的线性文化遗产，不仅是食盐运销的通道，也是承载文化传播交流的通道，对沿线地区的经济、文化、民族融合等方面都产生了重要影响。',
      'route2': '云南虽本产盐，但滇东北的昭通、曲靖地区距云南的盐产地道路险远，严重缺盐，历史上主要依靠自贡富荣盐场和乐山犍为盐场的食盐接济。川滇古盐道是川盐入滇的重要通道，与古代南方丝绸之路及茶马古道有互相交织的密切关系，食盐运销是南方丝绸之路及茶马古道上起源较早和极为重要的贸易活动',
      'route3': '主要从四川的云阳、郁山等地出发，通过古盐道送到利川等地，再由利川经武夷山区运至湘西、宜昌等地。历史上 “川盐” 的两次 “济楚” 事实上也是 “援湘”，川湘盐道与川鄂盐道有许多相关甚至重合的路线。在这条古盐道上，背夫、挑夫、马帮是食盐运输的主力军，他们的来来往往催生了一个个繁荣的村落和集镇，促进了川湘两地的经济交流和文化融合。',
      'route4': '从四川东部的产盐区出发，经过重庆、湖北等地，主要沿着长江及其支流，以及一些山间小道通往湖北各地。川鄂古盐道是连接四川和湖北的重要通道，在历史上对湖北地区的食盐供应起到了关键作用。它也是文化交流的重要纽带，促进了川鄂两地的商业往来、人员流动和文化传播，沿线留下了许多与盐运相关的历史遗迹和文化景观，如盐井、盐灶、码头、会馆等。',
      'route5': '南方丝绸之路，又被称为“西南丝绸之路”，简称“南丝路”，[1][2]泛指历史上不同时期四川、云南、西藏等中国南方地区对外连接的通道，包括历史上有名的蜀身毒道和茶马古道等。与川盐古道在四川云南地界路线相交汇。'
    },

    routeImages: {
      'all': 'https://636c-cloud1-d7gh3n5sda4d060b9-1481889552.tcb.qcloud.la/%E5%B7%9D%E7%9B%90%E5%8F%A4%E9%81%93.png?sign=7042c2bdb7eff0f91d85778bf11f203b&t=1788607282',
      'route1': 'https://636c-cloud1-d7gh3n5sda4d060b9-1481889552.tcb.qcloud.la/%E5%B7%9D%E9%BB%94.png?sign=9dad990a46e433ba1fef5cbfc8d5b572&t=1788607398', // 川黔古道
      'route2': 'https://636c-cloud1-d7gh3n5sda4d060b9-1481889552.tcb.qcloud.la/%E5%B7%9D%E6%BB%87.png?sign=c6e7e19b1c129f90edede5849c7cee5e&t=1788607440', // 川滇古道
      'route3': 'https://636c-cloud1-d7gh3n5sda4d060b9-1481889552.tcb.qcloud.la/%E5%B7%9D%E6%B9%98.png?sign=830cf093d4dea31c52a9aff5dae40529&t=1788607458', // 川湘古道
      'route4': 'https://636c-cloud1-d7gh3n5sda4d060b9-1481889552.tcb.qcloud.la/%E5%B7%9D%E9%84%82.png?sign=8b0733a616282d705d23fdd8211b9414&t=1788607480',    // 川鄂古道
      'route5': 'https://636c-cloud1-d7gh3n5sda4d060b9-1481889552.tcb.qcloud.la/%E5%8D%97%E4%B8%9D%E7%BB%B8.png?sign=c10690881bb76b66499f6ac128c4c88f&t=1788607496' //南丝绸之路
    },
    
    routesData: [
      {
        routeId: 'route1', 
        routeName: '川黔古道',
        color: '#64AD54', 
        points: [
          { name: '南川', top: '55.5%', left: '60%', textPos: 'pos-top', desc: '千年盐都...' },
          { name: '正安', top: '59%', left: '59.7%', textPos: 'pos-left', desc: '万里长江第一城...' },
          { name: '务川', top: '58.5%', left: '65%', textPos: 'pos-top', desc: '千年盐都...' },
          { name: '沿河', top: '59.7%', left: '69%', textPos: 'pos-bottom', desc: '千年盐都...' },
          { name: '江口', top: '62.5%', left: '68.7%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '思南', top: '61.5%', left: '65%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '镇远', top: '65.5%', left: '71%', textPos: 'pos-right', desc: '千年盐都...' },
          { name: '黎平', top: '69.5%', left: '72.7%', textPos: 'pos-bottom', desc: '千年盐都...' },
          { name: '綦江', top: '56.8%', left: '55%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '铜锌', top: '60.5%', left: '55.8%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '遵义', top: '63.5%', left: '58.8%', textPos: 'pos-bottom', desc: '千年盐都...' },
          { name: '福泉', top: '66.5%', left: '65%', textPos: 'pos-right', desc: '千年盐都...' },
          { name: '都匀', top: '68.5%', left: '65%', textPos: 'pos-right', desc: '千年盐都...' },
          { name: '独山', top: '70.5%', left: '65%', textPos: 'pos-right', desc: '千年盐都...' },
          { name: '荔波', top: '72.7%', left: '65%', textPos: 'pos-bottom', desc: '千年盐都...' },
          { name: '怀仁', top: '62%', left: '54%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '黔西', top: '65.5%', left: '55.5%', textPos: 'pos-right', desc: '千年盐都...' },
          { name: '贵阳', top: '68%', left: '58%', textPos: 'pos-bottom', desc: '千年盐都...' },
          { name: '叙永', top: '59.5%', left: '49.2%', textPos: 'pos-top', desc: '千年盐都...' },
          { name: '毕节', top: '64.2%', left: '50.8%', textPos: 'pos-right', desc: '千年盐都...' },
          { name: '平远', top: '67%', left: '49.2%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '普定', top: '68.5%', left: '49%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '安顺', top: '69.5%', left: '53%', textPos: 'pos-bottom', desc: '千年盐都...' },
          { name: '镇宁', top: '70.5%', left: '51.5%', textPos: 'pos-bottom', desc: '千年盐都...' },
          { name: '威宁', top: '66.5%', left: '39.5%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '普安', top: '70.5%', left: '43.8%', textPos: 'pos-left', desc: '千年盐都...' },
          { name: '兴义', top: '74.5%', left: '45.8%', textPos: 'pos-bottom', desc: '千年盐都...' },
        ]
      },
      {
        routeId: 'route2',
        routeName: '川滇古道',
        color: '#FF6420', 
        points: [
          { name: '珙县', top: '59.5%', left: '42%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '筠连', top: '60.5%', left: '45.2%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '镇雄', top: '63%', left: '45.5%', textPos: 'pos-top', desc: '川滇重镇...' },
          { name: '宣威', top: '68.5%', left: '43%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '盐津', top: '61%', left: '39%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '昭通', top: '64%', left: '35.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '会泽', top: '68%', left: '33.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '沾益', top: '71%', left: '36.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '西昌', top: '61.5%', left: '26.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '宁蒗', top: '64.2%', left: '17.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '丽江', top: '66.2%', left: '13.7%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '大理', top: '71.3%', left: '14%', textPos: 'pos-left', desc: '川滇重镇...' },
        ]
      },
      {
        routeId: 'route3',
        routeName: '川湘古道',
        color: '#832E0A', 
        points: [
          { name: '公安', top: '51.5%', left: '93%', textPos: 'pos-top', desc: '川滇重镇...' },
          { name: '石门', top: '54.5%', left: '90%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '慈利', top: '55.8%', left: '86.2%', textPos: 'pos-bottom', desc: '川滇重镇...' },
          { name: '张家界', top: '57%', left: '81.5%', textPos: 'pos-bottom', desc: '川滇重镇...' },
          { name: '桑植', top: '55%', left: '82.5%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '洪江', top: '65.5%', left: '78%', textPos: 'pos-bottom', desc: '川滇重镇...' },
          { name: '怀化', top: '63%', left: '80.8%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '凤凰', top: '61.5%', left: '78.5%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '吉首', top: '60%', left: '79%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '花垣', top: '59%', left: '77.5%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '保靖', top: '58%', left: '74.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '永顺', top: '57%', left: '75.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '龙山', top: '55%', left: '73.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '来凤', top: '54.5%', left: '77%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '咸丰', top: '54%', left: '71.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '彭水', top: '56%', left: '64.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '酉阳', top: '58%', left: '68.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '秀山', top: '60%', left: '71.8%', textPos: 'pos-bottom', desc: '川滇重镇...' },
          { name: '铜仁市', top: '63%', left: '73%', textPos: 'pos-bottom', desc: '川滇重镇...' },
        ]
      },
      {
        routeId: 'route4',
        routeName: '川鄂古道',
        color: '#177CB0', 
        points: [
          { name: '石门', top: '54.5%', left: '90%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '慈利', top: '55.8%', left: '86.2%', textPos: 'pos-bottom', desc: '川滇重镇...' },
          { name: '张家界', top: '57%', left: '81.5%', textPos: 'pos-bottom', desc: '川滇重镇...' },
          { name: '桑植', top: '55%', left: '82.5%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '龙山', top: '55%', left: '73.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '来凤', top: '54.5%', left: '77%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '咸丰', top: '54%', left: '71.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '彭水', top: '56%', left: '64.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '五峰', top: '52%', left: '85%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '鹤峰', top: '53%', left: '81%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '宣恩', top: '52.5%', left: '73%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '恩施', top: '51.5%', left: '77.5%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '利川', top: '50.5%', left: '72%', textPos: 'pos-top', desc: '川滇重镇...' },
          { name: '万州', top: '48%', left: '68%', textPos: 'pos-top', desc: '川滇重镇...' },
          { name: '建始', top: '50%', left: '79%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '巫山', top: '48%', left: '80%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '巫溪', top: '46.5%', left: '78.5%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '镇坪', top: '44.5%', left: '77.5%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '安康', top: '40%', left: '72%', textPos: 'pos-top', desc: '川滇重镇...' },
          { name: '竹溪', top: '41.8%', left: '76.8%', textPos: 'pos-top', desc: '川滇重镇...' },
          { name: '房县', top: '42.8%', left: '83.6%', textPos: 'pos-top', desc: '川滇重镇...' },
          { name: '兴山', top: '45.8%', left: '83.6%', textPos: 'pos-top', desc: '川滇重镇...' },
          { name: '谷城', top: '41.8%', left: '89.6%', textPos: 'pos-top', desc: '川滇重镇...' },
        ]
      },
      {
        routeId: 'route5',
        routeName: '南丝绸之路',
        color: '#3B2E7E', 
        points: [
          { name: '宜宾', top: '58%', left: '42%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '成都', top: '50%', left: '43%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '雅安', top: '52.5%', left: '36%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '汉源', top: '55.5%', left: '33.5%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '喜德', top: '60%', left: '32%', textPos: 'pos-right', desc: '川滇重镇...' },
          { name: '西昌', top: '61.5%', left: '26.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '盐源', top: '63.5%', left: '22.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '大姚', top: '70.5%', left: '20.5%', textPos: 'pos-left', desc: '川滇重镇...' },
          { name: '祥云', top: '72.5%', left: '18.5%', textPos: 'pos-bottom', desc: '川滇重镇...' },
          { name: '曲靖', top: '72.5%', left: '38.5%', textPos: 'pos-bottom', desc: '川滇重镇...' },
          { name: '赫章', top: '64.8%', left: '42.5%', textPos: 'pos-left', desc: '千年盐都...' },
          
        ]
      },
    ],
  

    currentPointDesc: '',
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
      this.setData({
        currentTab: selectedTab,
        showSubMenu: !this.data.showSubMenu
      });
    } else {
      this.setData({
        currentTab: selectedTab,
        showSubMenu: false
      });
    }
  },

  switchSubTab(e) {
    const subTab = e.currentTarget.dataset.sub;
    const subName = e.currentTarget.dataset.name; 
    
    this.setData({
      currentSubTab: subTab,
      gudaoBtnText: subName, 
      showSubMenu: false     
    });
  },

  //点击放大
  zoomIn() {
    let targetScale = this.currentMapScale + 0.5;
    if (targetScale > 4) targetScale = 4; 
    
    this.currentMapScale = targetScale; 
    this.setData({ scaleValue: targetScale }); 
  },

  // 点击缩小
  zoomOut() {
    let targetScale = this.currentMapScale - 0.5;
    if (targetScale < 1) targetScale = 1; 
    
    this.currentMapScale = targetScale; 
    this.setData({ scaleValue: targetScale }); 
  },

  // 手指或代码触发缩放时，只默默记录
  onScale(e) {
    this.currentMapScale = e.detail.scale;
  },

  // 点击文字/地点的交互事件
  handlePointClick(e) {
    const pointData = e.currentTarget.dataset.point;
    wx.showToast({
      title: '点击了：' + pointData.name,
      icon: 'none'
    });
  }

})
