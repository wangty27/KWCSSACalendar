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
      console.log("Updated List");
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
    console.log(e.currentTarget.dataset.object)
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
          eventJs.removeEvent(eventToDelete);
        }
      }
    })
  },
  
  eventAdd: function(){
    wx.navigateTo({
      url: "../addEvent/addEvent?entry=add",
    })
  },

  onShareAppMessage: function () {
    return {
      title: "KWCSSA官方日历",
      path: "/pages/login/login",
      imageUrl: "../../resource/sharePic.png"
    }
  }
  

})