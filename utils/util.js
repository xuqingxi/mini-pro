const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const baseUrl = 'https://m.yaojunrong.com'
export const axios ={
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data: data,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (e) {
          resolve(e)
        }
      })
    })
  },
  get(url,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: baseUrl+url,
        data: data,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (e) {
          resolve(e.data.data)
        }
      })
    })
  },
  login(url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token');
      let header = {
        'content-type': 'application/json'
      }
      if(token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data: data,
        header,
        method: 'POST',
        success: function (e) {
          if(e.header.Token){
            wx.setStorageSync('token', e.header.Token)
          }
          resolve(e)
        }
      })
    })
  },
  fetch(url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token');
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data: data,
        header,
        method: 'GET',
        success: function (e) {
          if (e.header.Token) {
            wx.setStorageSync('token', e.header.Token)
          }
          resolve(e.data)
        }
      })
    })
  },
  delete(url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token');
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data: data,
        header,
        method: 'DELETE',
        success: function (e) {
          if (e.header.Token) {
            wx.setStorageSync('token', e.header.Token)
          }
          resolve(e.data)
        }
      })
    })
  }
}
// module.exports = {
//   formatTime: formatTime
// }
