// pages/settings/settings.js

const eventJs = require("../../utils/eventList.js");
const userJs = require("../../utils/userInfo.js")

var userInfo;
var name;
var group;

var issue = {
  title: "",
  content: "",
}

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
    subHidden: true,
    subIssueHidden: true,
    subAboutHidden: true
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
        subHidden: false,
        subIssueHidden: false
      })
    } else if (id == "about"){
      this.setData({
        subHidden: false,
        subAboutHidden: false
      })
    }
  },

  issueTitleInput: function(e){
    issue.title = e.detail.value;
  },

  issueContentInput: function(e){
    issue.content = e.detail.value;
  },

  submitBtnClick: function() {
    if (issue.title == ""){
      wx.showModal({
        title: '错误',
        content: '请输入标题',
        showCancel: false
      })
    } else if (issue.content == ""){
      wx.showModal({
        title: '错误',
        content: '请输入内容',
        showCancel: false
      })
    } else {
      console.log(issue.title)
      console.log(issue.content)
    }
  },

  cancelBtnClick: function() {
    issue.title = "";
    issue.content = "";
    this.setData({
      subHidden: true,
      subIssueHidden: true,
      subAboutHidden: true,
      inputField: ""
    })
  },

  onShareAppMessage: function () {
    return {
      title: "KWCSSA日历",
      path: "/pages/login/login",
      imageUrl: "../../resource/sharePic.png"
    }
  }

})