import {axios} from '../../utils/util.js'
Page({
  data: {
    imgUrls: [],
    booktype:[],
    bookcontent:[],
    updatetime:[],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hiddenLoading: true,
    size:2,
    showLast:true
  },
  onReachBottom() {
    this.setData({
      size:this.data.size + 2
    })
    let params = {
      pn:1,
      size:this.data.size,
      bookSize: 4
    }
    axios.fetch('/category/books', params).then(res => {
      if(this.data.size !=res.data.length){
        this.setData({
          showLast:false
        })
      }
      this.dateShow(res)
    })
  },
  dateShow(res){
    let types = [];
    let content = [];
    let update = [];
    res.data.forEach(item => {
      let timeList = []
      item.books.forEach(m => {
        let day = new Date(m.updateTime).getDate();
        let month = new Date(m.updateTime).getMonth();
        let year = new Date(m.updateTime).getFullYear();
        let currentDay = new Date().getDate();
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        if (year == currentYear) {
          if (month == currentMonth) {
            if (day == currentDay) {
              timeList.push('今天')
            } else {
              let dayDiffer = currentDay - day
              timeList.push(dayDiffer + '天前')
            }
          } else {
            let monthDiffer = currentMonth - month
            timeList.push(monthDiffer + '月前')
          }
        } else {
          timeList.push('一年前')
        }
      })
      update.push(timeList)
      content.push(item.books)
      types.push(item.title)
    })
    this.setData({
      booktype: types,
      bookcontent: content,
      updatetime: update
    })
  },
  onLoad(){
    let params ={
      pn:1,
      size:this.data.size,
      bookSize:4
    }
    axios.fetch('/category/books',params).then(res=>{
      this.dateShow(res)
    })
    axios.fetch('/swiper').then(res=>{
      this.setData({
        imgUrls: res.data
      })
    })
  },
  onHide(){
   
  }
})