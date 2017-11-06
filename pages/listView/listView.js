// pages/listView/listView.js

const eventJs = require("../../utils/eventList.js")

var eventList;
var controlPermission;

Page({

  data: {
    controlPermission: true,
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

  onShow: function(){
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
    console.log(e.currentTarget.dataset.object);
    wx.showModal({
      title: "注意",
      content: "删除事件后将无法恢复，确定删除吗？",
      showCancel: true,
      confirmText: "确定",
      confirmColor: "#FF0000",
      success: function(res){
        if (res.confirm){
          console.log("confirmDelete");
          _this.deleteConfirm
        }
      }
    })
  },
  
  eventAdd: function(){
    wx.navigateTo({
      url: "../addEvent/addEvent?entry=add",
    })
  }
  

})