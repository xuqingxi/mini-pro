import {axios} from '../../utils/util.js'
Page({
  data: {
    imgUrls: [],
    fontEnd:[],
    backEnd:[],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hiddenLoading: true
  },
  onLoad(){
    axios.fetch('/category/books').then(res=>{
      this.setData({
        fontEnd:res.data[1].books,
        backEnd:res.data[0].books
      })
    })
    axios.fetch('/swiper').then(res=>{
      this.setData({
        imgUrls: res.data
      })
    })
  },
})