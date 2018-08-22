import {axios} from '../../utils/util.js'
Page({
  data: {
    imgUrls: [],
    booktype:["前端开发","操作系统","移动开发","后端开发"],
    fontEnd:[],
    os:[],
    mobile:[],
    backEnd:[],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hiddenLoading: true
  },
  onLoad(){
    let params ={
      pn:1,
      size:5,
      bookSize:4
    }
    axios.fetch('/category/books',params).then(res=>{
      this.setData({
        fontEnd:res.data[0].books,
        os:res.data[1].books,
        mobile: res.data[2].books,
        backEnd: res.data[3].books
      })
    })
    axios.fetch('/swiper').then(res=>{
      this.setData({
        imgUrls: res.data
      })
    })
  },
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    let params = {
      pn: 1,
      size: 2,
      bookSize: 4
    }
    pn = pn + 1;
    axios.fetch('/category/books', params).then(res => {
      this.setData({
        fontEnd: res.data[0].books,
        backEnd: res.data[4].books
      })
    })
    // wx.request({
    //   url: 'https://xxx/?page=' + page,
    //   method: "GET",
    //   // 请求头部
    //   header: {
    //     'content-type': 'application/text'
    //   },
    //   success: function (res) {
    //     // 回调函数
    //     var moment_list = that.data.moment;

    //     for (var i = 0; i < res.data.data.length; i++) {
    //       moment_list.push(res.data.data[i]);
    //     }
    //     // 设置数据
    //     that.setData({
    //       moment: that.data.moment
    //     })
    //     // 隐藏加载框
    //     wx.hideLoading();
    //   }
    // })

  }
})