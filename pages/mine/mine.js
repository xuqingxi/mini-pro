// pages/mine/mine.js
import { axios } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionlist:[],
    show:false,
    showdelete:false
  },
  delete(e){
    console.log(e)
    this.setData({
      showdelete:true
    })
  },
  deleteCollection(options){
    axios.delete(`/collection/${options.target.dataset.delnum}`).then(res=>{
      let newArr =this.data.collectionlist.filter(item=>{
        item._id != options.target.dataset.delnum
      })
      if(res.code ==200){
        this.setData({
          collectionlist:newArr
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token =wx.getStorageSync('token');
  
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
    let collection = []
    axios.fetch('/collection').then(res => {
      res.data.forEach((item)=>{
        if(item.book != null){
          axios.fetch(`/book/${item.book._id}`).then(res => {
            collection.push(res.data);
            console.log(collection)
            this.setData({
              collectionlist: collection
            })
          })
        }
      })
      this.setData({
        show:true
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