// pages/detail/detail.js
import { getDetail, getShow, getList } from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'',
    names:[],
    cat:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    wx.showLoading();
    wx.request({
      url: 'https://fm.qq.com/webapp/json/luobo_recommend/GetRelatedAlbumV2?t=0.99713997477916&g_tk=&uin=&albumID=rd0037mtXe1yeMR0&pageType=2&uin=&format=json&inCharset=utf-8&outCharset=utf-8&_=1530266339253',
      method:'get',
      success:function(res){
        console.log(res)
      }
    })
    getShow(options.id,function(res){
      
      let arr = res.data;
      let arr02 = '';
      let arr03 = [];
      for( let i = 0;i<10;i++ ){
        arr02+=arr[i]+',';
        arr03.push(arr[i]);
      }
      that.setData({
        cid:arr02,
        names:arr03
      })
      //console.log(that.data.cid.slice(0,9))
      getList(options.id, that.data.cid,function(res){
        
        let Names = that.data.names;
        let _cat = [];
        for (let j = 0; j < Names.length; j++) {
          _cat.push(res.data.data.showList[Names[j]].show.name)
        }
        that.setData({
          cat: _cat
        })
        wx.hideLoading()
      })
    })
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