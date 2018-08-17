import { axios } from '../../utils/util.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    fontsize:32,
    article:{},
    id:'',
    index:'',
    bookId:'',
    indexlist:[],
    show:true,
    width:0,
  },
  sizeUp(){
    this.setData({
      fontsize:this.data.fontsize+2,
    })
  },
  sizeDown(){
    this.setData({
      fontsize: this.data.fontsize - 2
    })
  },
  modeChange(){
    let article = this.data.article;
    if(article.theme == 'light')
    {article.theme = 'dark';}
    else{
      article.theme = 'light';
    }
    this.setData({
      article
    })
  },
  goback(){
    wx.showLoading({
      title: 'Loading...',
      mask: true,
    })
    let id = this.data.bookId;
    let index = this.data.index;
    axios.fetch(`/titles/${id}`).then(res => {
      res.data.forEach((item) => {
        if (item.index == parseInt(index) - 1) {
          const articleId = item._id;
          this.setData({
            index: JSON.stringify(parseInt(this.data.index) - 1)
          })
          axios.fetch(`/article/${articleId}`).then(res => {
            let data = app.towxml.toJson(res.data.article.content, 'markdown');
            data.theme = 'dark';
            this.setData({
              article: data
            })
            setTimeout(() => {
              wx.hideLoading()
            }, 200)
          })
        }
      })
     if(index <= 0){
       wx.showToast({
         title: '已经是第一章了',
         icon: 'success',
         duration: 2000
       })
     }
    })
  },
  goforward(){ 
    wx.showLoading({
      title: 'Loading...',
      mask:true,
    })
    let id = this.data.bookId;
    let index =this.data.index;
    axios.fetch(`/titles/${id}`).then(res => {
      res.data.forEach((item)=>{
        if (item.index == parseInt(index)+1){
          const articleId = item._id;
          this.setData({
            index: JSON.stringify(parseInt(this.data.index) + 1)
          })
          axios.fetch(`/article/${articleId}`).then(res => {
            let data = app.towxml.toJson(res.data.article.content, 'markdown');
            data.theme = 'dark';
            this.setData({
              article: data
            })
            setTimeout(()=>{     
              wx.hideLoading()
            },200)
          })
        }
      })
      if (index >= res.data.length - 1) {
        wx.showToast({
          title: '已经是最后一章了',
          icon: 'success',
          duration: 2000
        })
      } 
    })
  },
  showlist(){
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation;
    if (this.data.show == true) {
      animation.translateX(Math.floor(this.data.width)).step()
      this.setData({
        show: false
      })
    }
    else {
      animation.translateX(-Math.floor(this.data.width)).step()
      this.setData({
        show: true
      })
    }
    this.setData({
      animationData: animation.export()
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log(options)
    const articleIndex = options.articleIndex;
    const bookId = options.bookId;
    const _ts = this;
    const articleId = options.articleId;
    _ts.setData({
      id: articleId,
      index: articleIndex,
      bookId:bookId
    })
    axios.fetch(`/article/${articleId}`).then(res=>{
      let data = app.towxml.toJson(res.data.article.content, 'markdown');
        data.theme = 'light';
        _ts.setData({
          article: data
          })
    })
    wx.createSelectorQuery().select('.listcontent').boundingClientRect(function (rect) {
      rect.width   // 节点的宽度
    }).exec((e) => {
      this.setData({
        width: e[0].width
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let id =this.data.bookId
    axios.fetch(`/titles/${id}`).then(res => {
      this.setData({
        indexlist:res.data
      })
    })
   
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