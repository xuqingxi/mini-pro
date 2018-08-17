import { axios } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // animationData: {},
    bookInfo:{},
    width:0,
    bookid:''
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/detail/detail'
    }
  },
  addcollection(){
      axios.login('/collection', { 'bookId': this.data.bookid}).then(res=>{
        wx.showToast({
          title: '收藏成功',
          icon:"success"
        })
      })
  },
  getIndex(m){
    
    wx.navigateTo({
      url: `../title/title?titleId=${this.data.bookInfo.data._id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.bookId){
      let x = options.bookId
      axios.fetch(`/book/${x}`).then(res => {
        this.setData({
          bookInfo: res,
          bookid: x
        })
      })
    }else{
      let y = options.swiperId;
      axios.fetch(`/swiper/${y}`).then(res => {
        console.log(res)
        let id =res.data.book._id
        axios.fetch(`/book/${id}`).then(res => {
          console.log(res)
          this.setData({
            bookInfo: res,
          })
        })
      })
    }
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
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
    // var animation = wx.createAnimation({
    //   transformOrigin:'150% 50% 0',
    //   duration: 4000,
    //   timingFunction: 'ease',
    // })

    // this.animation = animation
    // animation.translateX(-200).step()

    // this.setData({
    //   animationData: animation.export()
    // })
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