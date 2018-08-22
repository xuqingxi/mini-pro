// pages/library/library.js
import { axios } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icons: [],
    _num:0,
    html:[],
    web:[],
    os:[],
    mobile:[],
    show:false
  },
  change(e){
    wx.showLoading({
      title: 'Loading...',
      mask:'yrue'
    })
    this.setData({
      _num:e.target.dataset.num
    })
    wx.hideLoading()
  },
  again(){
    this.setData({
      _num:-1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    axios.fetch('/category').then(res=>{
      this.setData({
        icons:res.data
      })
      res.data.forEach((item,index)=>{
        axios.fetch(`/category/${item._id}/books`,{size:999}).then(res=>{
          if(index==0){
            this.setData({
              html:res.data.books
            })
          }else if(index ==1){
            this.setData({
              os: res.data.books
            })
          } else if (index == 2){
            this.setData({
              mobile: res.data.books
            })
          } else if(index == 3){
            this.setData({
              web: res.data.books
            })
          }
        })
      })
      this.setData({
        show: true
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      show: false
    })
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