// pages/listView/listView.js

const eventJs = require("../../utils/eventList.js");
const userJs = require("../../utils/userInfo.js");

var eventList;
var controlPermission;

Page({

  data: {
    controlPermission: 1,
  },

  onLoad: function(){
    eventList = eventJs.getEventList();
    

    if (eventList.length == 0) {
      this.setData({
        noEventShow: false
      })
    } else {
      this.setData({
        noEventShow: true
      })
    }

    this.setData({
      eventList: eventList
    })
  },

  onShow: function () {
    controlPermission = userJs.getUserInfo().controlPermission;
    /*if (controlPermission > 0) {
      this.setData({
        controlPermission: true,
      })
    } else {
      this.setData({
        controlPermission: false,
      })
    }*/
    this.setData({
      controlPermission: controlPermission,
    })

    if (eventJs.listUpdated()){
      eventList = eventJs.getEventList();
      this.setData({
        eventList: eventList
      })
    }
    if (eventList.length > 0) {
      this.setData({
        noEventShow: true
      })
    } else {
      this.setData({
        noEventShow: false
      })
    }
  },

  eventEdit: function(e){
  },

  eventDelete: function(e){
    let _this = this;
    var eventToDelete = e.currentTarget.dataset.object.id;
    wx.showModal({
      title: "注意",
      content: "删除事件后将无法恢复，确定删除吗？",
      showCancel: true,
      confirmText: "确定",
      confirmColor: "#FF0000",
      success: function(res){
        if (res.confirm){
          wx.showLoading({
            title: "删除中",
            mask: true,
          })
          eventJs.removeEvent(eventToDelete, "list");
        }
      }
    })
  },
  
  eventAdd: function(){
    wx.navigateTo({
      url: "../addEvent/addEvent?entry=add",
    })
  },

  refreshList: function(){
    let _this = this;
    wx.showLoading({
      title: '刷新中',
      mask: true
    })
    eventJs.refreshEventList(function(){
      eventList = eventJs.getEventList();
      wx.hideLoading()
      wx.showToast({
        title: '刷新成功',
        mask: true,
        duration: 700
      })
      _this.setData({
        eventList: eventList
      })
    })
  },

  onShareAppMessage: function (e) {
    if (e.from === 'button') {
      var event = e.target.dataset.object;
      return {
        title: event,
        path: "/pages/login/login",
        imageUrl: "../../resource/newEventShare.png"
      }
    } else {
      return {
        title: "KWCSSACalendar",
        path: "/pages/login/login",
        imageUrl: "../../resource/sharePic.png"
      }
    }
  }
  

})