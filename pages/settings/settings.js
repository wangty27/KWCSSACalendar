// pages/settings/settings.js
Page({

  data: {
  
  },

  onLoad: function(){
    var data = []
    wx.setStorageSync("eventList", data)
  },

  C: function(){
    console.log("Cleared")
    wx.clearStorage();
  }

})