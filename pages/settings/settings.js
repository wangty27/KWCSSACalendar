// pages/settings/settings.js

const eventJs = require("../../utils/eventList.js");
const userJs = require("../../utils/userInfo.js")

Page({

  data: {
  
  },

  onLoad: function(){
  },

  C: function(){
    wx.navigateTo({
      url: "../login/login",
    })
  },

  B: function(){
    console.log("Refresh")
    var user = userJs.getUserInfo();
    console.log(user);
    eventJs.refreshEventList();
  },

  onShareAppMessage: function () {
    return {
      title: "KWCSSA官方日历",
      path: "/pages/login/login",
      imageUrl: "../../resource/sharePic.png"
    }
  }

})