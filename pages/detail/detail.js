// pages/detail/detail.js
const app = getApp()
import { getDetail, getShow, getList } from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'',
    names:[],
    cat:[],
    detimg:'',
    dettit:'',
    detnickname:'',
    update:'',
    desc:'',
    authorId:''
  },
  updateTime: function (){
    let time = new Date(this.data.update*1000);
    this.setData({
      update: time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日 "
    })
  },
  getList: function (options){
    wx.showLoading();
    let that = this;
    // wx.request({
    //   url: 'https://fm.qq.com/webapp/json/luobo_recommend/GetRelatedAlbumV2?t=0.99713997477916&g_tk=&uin=&albumID=rd0037mtXe1yeMR0&pageType=2&uin=&format=json&inCharset=utf-8&outCharset=utf-8&_=1530266339253',
    //   method: 'get',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    getShow(options.id, function (res) {
      let arr = res.data;
      let arr02 = '';
      let arr03 = [];
      for (let i = 0; i < 10; i++) {
        arr02 += arr[i] + ',';
        arr03.push(arr[i]);
      }
      that.setData({
        cid: arr02,
        names: arr03
      })
      //console.log(that.data.cid.slice(0,9))
      getList(options.id, that.data.cid, function (res) {
        let Names = that.data.names;
        let _cat = [];
        for (let j = 0; j < Names.length; j++) {
          _cat.push({ name: res.data.data.showList[Names[j]].show.name, playNum: res.data.data.showList[Names[j]].show.lPlayNum, duration: ((res.data.data.showList[Names[j]].show.duration) / 60).toFixed(2), audio: res.data.data.showList[Names[j]].show.audioURL.urls[0].url})
        }
        that.setData({
          cat: _cat
        })
        wx.hideLoading()
      })
    })
  },
  getDesc: function (options){
    let curId = options.id;
    let list = app.globalData.albumInfo;
    let that = this;
    for (let i = 0; i < list.length;i++ ){
      if (curId == list[i].albumID ){
        that.setData({
          desc: list[i].desc,
          dettit: list[i].name,
          detnickname: list[i].nickname,
          detimg: list[i].pic,
          authorId: list[i].anchorID
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.updateTime();
    
    this.getList(options);
    console.log(app.globalData.albumInfo)
    this.getDesc(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})