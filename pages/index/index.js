//index.js
//获取应用实例
const app = getApp()
import { list } from '../../utils/list.js'
import { getDetail, getShow } from '../../utils/request.js'

//https://api.imjad.cn/qqfm/v1/?type=skip_show&id=rd004FBkcI0mPADh&shows=rd003Fh8Nr1MJain

//https://api.imjad.cn/qqfm/v1/?type=album&page_size=10&id=38978&page=1

//https://api.imjad.cn/qqfm/v1/?type=show&id=rd004FBkcI0mPADh

//https://api.imjad.cn/qqfm/v1/?type=skip_show&id=rd0016w2lU26VuqL&shows=rd002KcH4y2cvGn7,rd0013fhsF2xor0K,rd000lHmxy3cljTP,rd0017ZtI23ymWMs,rd0022iu4z19G8G4,rd003NrQ7t4cGHdx,rd001Q4xFW0f9D5i,rd004LnvXb4eKc18,rd001fYyLY1Zeal9,rd003jA91p2unI9w,

//https://fm.qq.com/webapp/json/luobo_recommend/GetRelatedAlbumV2?t=0.27943313201252296&g_tk=&uin=&albumID=rd0037mtXe1yeMR0&pageType=2&uin=&format=json&inCharset=utf-8&outCharset=utf-8&_=1530590833165

Page({
  data: {
    nav: [],
    cur:0,
    imgUrls: [
      '../../images/1.jpg',
      '../../images/2.jpg',
      '../../images/3.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    subNav:[],
    icur:0,
    catagary:[],
    defaultId:null,
    condition:false,
    scrollLeft:0
  },
  //设置头部导航
  setNav:function(e){
    let List = list.data.list;
    let arr = [];
    for (let i = 0; i < List.length;i++ ){
      arr.push({"name":List[i].tagName})
    }
    this.setData({
      nav:arr
    });
  },
  //头部导航切换
  tab: function (e) {
    console.log(e)
    let idx = e.currentTarget.dataset.index;
    this.setData({
      cur: idx,
      scrollLeft: 150
    });
    this.setData({
      icur: 0
    });
    this.setsubNav(idx);
    this.detailList(this.data.defaultId)
  },
  //设置二级导航
  setsubNav: function (num) {
    let List = list.data.list[num].list;
    let arr = [];
    for (let i = 0; i < List.length; i++) {
      arr.push(List[i])
    }
    this.setData({
      subNav: arr,
      defaultId:arr[0].id
    })
  },
  //二级导航点击
  showList:function(e){
    let idx = e.currentTarget.dataset.index;
    let id = e.currentTarget.id;
    this.setData({
      icur: idx
    });
    this.detailList(id)
  },
  //列表
  detailList:function(id){
    let that = this;
    wx.showLoading();
    that.setData({
      catagary: []
    });
    getDetail(id, function (res) {
      console.log(res)
      let list = res.data.data.albumInfoList;
      let arr = [];
      app.globalData.albumInfo = [];
      if ( list.length==0 ){
        that.setData({
          condition: true
        });
      }
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i]);
        app.globalData.albumInfo.push({ 'albumID': list[i].album.albumID, 'name': list[i].album.name, 'desc': list[i].album.desc, 'fans': list[i].album.owner.fansNum, 'nickname': list[i].album.owner.nickname, 'pic': list[i].album.cover.urls[0].url, 'anchorID': list[i].album.owner.anchorID, 'logo': list[i].album.owner.logoPic.urls[0].url, 'ownerDesc': list[i].album.owner.desc});
      }
      that.setData({
        catagary: arr
      });
      wx.hideLoading()
    })
  },
  onLoad: function () {
    this.setNav();
    this.setsubNav(0);
    this.detailList(this.data.defaultId)
    //rd000TYhEt3NmTgz
    
  }
})
