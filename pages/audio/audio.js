// pages/audio/audio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audiosrc:''
  },
  audioPlay: function () {
    this.audioCtx.play()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      audiosrc: options.url +'?fromtag=36&vkey=5AFDA88CB8D4CB763C768A089DBB22BFBA8172A790BD26921FAC227B93CE4A9512C690F4C2454FEB7CC7C464BCB7B53E576EA0EA681962B7&guid=10000'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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
    console.log(1)
  }
})