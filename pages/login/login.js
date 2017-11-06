// pages/login/login.js
Page({
  data: {
  
  },

  loginBtnClick: function(){
    wx.showLoading({
      title: "登录中",
    })
    setTimeout(function(){
      wx.hideLoading,
      wx.switchTab({
        url: "../index/index",
      })
    }, 1000)
    
  }
})