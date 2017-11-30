// pages/controlPanel/controlPanel.js

const eventJs = require("../../utils/eventList.js");
const userJs = require("../../utils/userInfo.js");
const issueJs = require("./issueList.js");

var password = 7 * 3 * 4 * 37 * 28 * 89 * 12;
var inputpassword;

var eventList = [];
var issueList = [];

Page({

  data: {
    loginHidden: false,
  },

  onLoad: function(){
    let _this = this;
    eventList = eventJs.getMasterList();
    issueList = issueJs.getIssueList();
    setTimeout(function () {
      eventList = eventJs.getMasterList();
      _this.setData({
        eventList: eventList
      })
    }, 500)
    setTimeout(function () {
      eventList = eventJs.getMasterList();
      _this.setData({
        eventList: eventList
      })
    }, 1000)
    setTimeout(function () {
      issueList = issueJs.getIssueList();
      _this.setData({
        issueList: issueList,
      })
    }, 500)
    setTimeout(function () {
      issueList = issueJs.getIssueList();
      _this.setData({
        issueList: issueList,
      })
    }, 1000)
    this.setData({
      loginHidden: false,
      eventList: eventList,
      issueList: issueList,
    })
  },

  onShow: function(){

  },

  eventAdd: function(){
    wx.navigateTo({
      url: "../addEvent/addEvent?entry=panel",
    })
  },

  eventRefresh: function(){
    wx.showLoading({
      title: '刷新中',
      mask: true
    })
    let _this = this;
    eventJs.refreshEventList(function(){
      eventList = eventJs.getMasterList();
      wx.showToast({
        title: '刷新成功',
        mask: true,
        duration: 700
      })
      _this.setData({
        eventList: eventList
      })
    });
  },

  eventDelete: function(e){
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "注意",
      content: "确定删除吗？",
      showCancel: true,
      confirmColor: "#FF0000",
      success: function(res){
        if(res.confirm){
          wx.showLoading({
            title: '删除中',
            mask: true
          })
          eventJs.removeEvent(id, "panel");
        }
      }
    })
  },

  issueRefresh: function(){
    let _this = this;
    wx.showLoading({
      title: '刷新中',
      mask: true
    })
    issueJs.refreshIssueList(function(){
      issueList = issueJs.getIssueList();
      _this.setData({
        issueList: issueList
      })
      wx.showToast({
        title: '刷新成功',
        mask: true,
        duration: 700
      })
    });
  },

  issueDelete: function(e){
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "注意",
      content: "确定删除吗？",
      showCancel: true,
      confirmColor: "#FF0000",
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
            mask: true
          })
          issueJs.deleteIssue(id);
        }
      }
    })
  },

  passwordInput: function(e){
    inputpassword = e.detail.value;
    if (inputpassword == password){
      wx.hideKeyboard();
      this.setData({
        loginHidden: true,
      })
    }
  }

})