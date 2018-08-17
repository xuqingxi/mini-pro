// pages/readed/readed.js
import { axios } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readList:[],
    percent:[],
    show:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  goon(e){
    console.log(e)
    let indexid = e.target.dataset.index
    axios.fetch(`/titles/${this.data.readList[indexid].book._id}`).then(res=>{
      console.log(res)
      res.data.forEach(item=>{
        if(item.index = this.data.readList[indexid].title.index){
          wx.navigateTo({
            url: `../article/article?articleId=${item._id}&articleIndex=${item.index}&bookId=${item.bookId}`,
          })
        }
      })
    })
    
  },
  getwholebook(){

  },
  onLoad:function(options){
  },


  onShow: function () {
    axios.fetch('/readList').then(res=>{
      this.setData({
        readList:res.data
      })
      let arr = [];
      this.data.readList.forEach((data) => {
        let origin = data.title.index+1;
        let total = data.title.total;
        let result = Math.floor(origin / total * 100) 
        arr.push(result)
      })
      this.setData({
        percent: arr
      })
      this.setData({
        show: true
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
 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      show:false
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