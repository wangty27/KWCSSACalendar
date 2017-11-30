// pages/settings/settings.js

const eventJs = require("../../utils/eventList.js");
const userJs = require("../../utils/userInfo.js")
const util = require("../../utils/util.js");

var userInfo;
var name;
var group;
var controlPermission;
var showPanel;

var date = new Date();

var issueRemain = true;
var lastIssueDay = {year: 1900, month: 1, day: 1};

var issue = {
  title: "",
  content: "",
}

function updateIssueRemain(){
  date = new Date();
  var curYear = date.getFullYear();
  var curMonth = date.getMonth() + 1;
  var curDay = date.getDate();
  if (curYear > lastIssueDay.year){
    issueRemain = true;
  } else if (curMonth > lastIssueDay.month){
    issueRemain = true;
  } else if (curYear == lastIssueDay.year && curMonth == lastIssueDay.month && curDay > lastIssueDay.day){
    issueRemain = true;
  }
}

function printGroup(group){
  showPanel = false;
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
      case 7: relval += " 部长团"; break;
      case 8: showPanel = true; break;
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
      group: group,
      showPanel: showPanel
    })
  },

  onShow: function(){
    updateIssueRemain();
    showPanel = false;
    userInfo = userJs.getUserInfo();
    name = userInfo.name;
    group = printGroup(userInfo.group);
    if (name != this.data.name || group != this.data.group){
      this.setData({
        name: name,
        group: group,
        showPanel: showPanel
      })
    }
  },

  optionTap: function (e){
    var id = e.currentTarget.dataset.id
    if (id == "refresh"){
      wx.showLoading({
        title: '刷新中',
        mask: true
      })
      eventJs.refreshEventList(function(){
        wx.hideLoading();
        wx.showToast({
          title: '刷新成功',
          mask: true,
          duration: 700
        })
      });
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
    } else if (id == "panel"){
      wx.navigateTo({
        url: '../controlPanel/controlPanel',
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
    let _this = this;

    let tableID = 3203;
    let Table = new wx.BaaS.TableObject(tableID);
    let table = Table.create();

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
    } else if (!issueRemain) {
      wx.showModal({
        title: '错误',
        content: '已达到每日使用次数限制，请通过微信联系或明天再次提交',
        showCancel: false
      })
    } else {
      wx.showLoading({
        title: '提交中',
        mask: true
      })
      var date = new Date();
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      var time = [year, month, day].map(util.formatNumber).join('/') + ' ' + [hour, minute, second].map(util.formatNumber).join(':');
      let entry = {
        User: userInfo.name,
        Title: issue.title,
        Content: issue.content,
        Created: time
      }
      table.set(entry).save().then( (res) => {
        wx.hideLoading();
        wx.showToast({
          icon: 'success',
          title: '提交成功',
          duration: 700
        })
        issueRemain = false;
        date = new Date();
        lastIssueDay = {
          year: date.getFullYear(), 
          month: date.getMonth() + 1, 
          day: date.getDate()
        }
        issue.title = "";
        issue.content = "";
        this.setData({
          subHidden: true,
          subIssueHidden: true,
          subAboutHidden: true,
          inputField: ""
        })
      }, (err) => {
        wx.showModal({
          title: '错误',
          content: '提交失败，请检查网络设置',
          showCancel: false
        })
      })
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