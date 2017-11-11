// pages/settings/settings.js

const eventJs = require("../../utils/eventList.js");
const userJs = require("../../utils/userInfo.js")

var userInfo;
var name;
var group;

function printGroup(group){
  var len = group.length;
  var relval = "";
  switch (group[0]){
      case 0: relval = "主席团"; break;
      case 1: relval = "外联部"; break;
      case 2: relval = "人力资源部"; break;
      case 3: relval = "组织部"; break;
      case 4: relval = "信息部"; break;
      case 5: relval = "宣传部"; break;
      case 6: relval = "平台策划部"; break;
      default: break;
  }
  if (len > 1){
    switch (group[1]){
      case 1: relval += " 外联部秘书"; break;
      case 3: relval += " 组织部秘书"; break;
      case 4: relval += " 信息部秘书"; break;
      case 5: relval += " 宣传部秘书"; break;
      case 6: relval += " 平台策划部秘书"; break;
      default: break;
    }
  }
  return relval;
}

Page({

  data: {
    subHidden: true
  },

  onLoad: function(){
    userInfo = userJs.getUserInfo();
    name = userInfo.name;
    group = printGroup(userInfo.group);
    this.setData({
      name: name,
      group: group
    })
  },

  optionTap: function (e){
    var id = e.currentTarget.dataset.id
    if (id == "refresh"){
      eventJs.refreshEventList();
    } else if (id == "relogin"){
      wx.navigateTo({
        url: "../login/login",
      })
    } else if (id == "issue"){
      this.setData({
        subHidden: false
      })
    } else if (id == "about"){
      this.setData({
        subHidden: false
      })
    }
  },

  onShareAppMessage: function () {
    return {
      title: "KWCSSA官方日历",
      path: "/pages/login/login",
      imageUrl: "../../resource/sharePic.png"
    }
  }

})