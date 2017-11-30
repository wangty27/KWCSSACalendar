// pages/addEvent/addEvent.js

const util = require("../../utils/util.js");
const functions = require("./func.js");
const userJs = require("../../utils/userInfo.js");

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

var todayDate = [year, month, day].map(util.formatNumber).join('-')

var groupStyle=["", "", "", "", "", "", "", ""]
var groupSelected=[false, false, false, false, false, false, false, false]
var pageTitle=["添加事件", "修改事件"]
var eventTitle = "";
var eventPlace = "";
var eventContent = "";
var level = [{style: "", select: false}, {style: "", select: false}]
var priority = [
  {style: "", select: false},
  {style: "", select: false},
  {style: "", select: false},
  {style: "", select: false},
  {style: "", select: false},
  {style: "", select: false},
  {style: "", select: false},
  {style: "", select: false},
  {style: "", select: false},
]
var controlPermission;

var masterPermission = false;

function changeGroupStyle(id){
  if (id == 0){
    if (groupStyle[0] == ""){
      for (var i = 0; i < 8; ++i){
        groupStyle[i] = "background: #555555; color: #FFFFFF";
        groupSelected[i] = true;
      }
    } else {
      for (var i = 0; i < 8; ++i){
        groupStyle[i] = "";
        groupSelected[i] = false;
      }
    }
  } else {
    if (groupStyle[id] == ""){
      groupStyle[id] = "background: #555555; color: #FFFFFF";
      groupSelected[id] = true;
    } else {
      groupStyle[0] = "";
      groupStyle[id] = "";
      groupSelected[id] = false;
      groupSelected[0] = false;
    }
  }
}

function changeLevelStyle(id){
  if (id == 1){
    level[0] = {
      style: "background: #555555; color: #FFFFFF",
      select: true,
    }
    level[1] = {
      style: "",
      select: false,
    }
  } else {
    level[0] = {
      style: "",
      select: false,
    }
    level[1] = {
      style: "background: #555555; color: #FFFFFF",
      select: true,
    }
  }
}

function changePrioirtyStyle(id){
  for (var i = 0; i < 9; ++i){
    if (i == id - 1){
      priority[i] = {
        style: "background: #555555; color: #FFFFFF",
        select: true
      }
    } else {
      priority[i] = {
        style: "",
        select: false
      }
    }
  }
}

Page({
  data: {
    groupStyle: groupStyle,
    pickDate: todayDate,
    selectDate: todayDate,
    todayDate: todayDate,
    selectTimeStart: "00:00",
    selectTimeEnd: "00:00",
    controlPermission: true,

  },

  onLoad: function(option){
    if (option.entry == "add"){
      this.setData({
        pageTitle: pageTitle[0]
      })
    } else if (option.entry == "panel"){
      masterPermission = true;
      controlPermission = true;
      this.setData({
        controlPermission: true,
        pageTitle: "Master Adding"
      })
    } else {
      this.setData({
        pageTitle: pageTitle[1]
      })
    }
    controlPermission = true;
    groupStyle = ["", "", "", "", "", "", ""]
    groupSelected = [false, false, false, false, false, false, false]
    eventTitle = "";
    eventPlace = "";
    eventContent = "";
    level = [{ style: "", select: false }, { style: "", select: false }]
  },

  onShow: function(){
    if (!masterPermission){
      var userInfo = userJs.getUserInfo();
      if (userInfo.controlPermission > 1){
        controlPermission = true;
        this.setData({
          controlPermission: true,
        })
      } else {
        controlPermission = false;
        this.setData({
          controlPermission: false,
        })
      }
    }
  },

  groupSelect: function(e){
    switch(e.target.id){
      case "group1": changeGroupStyle(0); break;
      case "group2": changeGroupStyle(1); break;
      case "group3": changeGroupStyle(2); break;
      case "group4": changeGroupStyle(3); break;
      case "group5": changeGroupStyle(4); break;
      case "group6": changeGroupStyle(5); break;
      case "group7": changeGroupStyle(6); break;
      case "group8": changeGroupStyle(7); break;
      default: break;
    }
    this.setData({
      groupStyle: groupStyle,
    })
  },

  levelSelect: function(e){
    if (e.target.id == "11"){
      changeLevelStyle(1);
    } else {
      changeLevelStyle(2);
    }
    this.setData({
      level: level
    })
  },

  pickDateChange: function(e){
    this.setData({
      selectDate: e.detail.value,
    })
  },

  pickTimeStartChange: function(e){
    this.setData({
      selectTimeStart: e.detail.value,
    })
  },

  pickTimeEndChange: function(e){
    this.setData({
      selectTimeEnd: e.detail.value,
    })
  },

  titleInput: function(e){
    eventTitle = e.detail.value;
  },

  placeInput: function(e){
    eventPlace = e.detail.value;
  },

  contentInput: function(e){
    eventContent = e.detail.value;
  },

  prioritySelect: function(e){
    changePrioirtyStyle(e.target.id);
    this.setData({
      priority: priority
    })
  },

  submitEvent: function(){
    var title = eventTitle != "";
    var date = this.data.selectDate;
    var startTime = this.data.selectTimeStart;
    var endTime = this.data.selectTimeEnd;
    var time = functions.checkTime(startTime, endTime);
    var place = eventPlace != "";
    var content = eventContent != "";
    var groupS = false;
    var levelS = false;
    var levelR;
    var priorityS = false;
    var priorityR;
    for (var i = 0; i < 8; ++i){
      if (groupSelected[i]){
        groupS = true;
        break;
      }
    }
    if (level[0].select){
      levelR = 2;
      levelS = true;
    } else if (level[1].select){
      levelR = 1;
      levelS = true;
    } else if (controlPermission == false){
      var userInfo = userJs.getUserInfo();
      groupSelected[userInfo.group] = true;
      groupS = true;
      levelR = 1;
      levelS = true;
    }
    for (var i = 0; i < 9; ++i){
      if (priority[i].select == true){
        priorityS = true;
        priorityR = i + 1;
        break;
      }
    }

    if (title && time && place && content && groupS && levelS && priorityS){
      functions.addEvent(eventTitle, groupSelected, date, startTime, endTime, eventPlace, eventContent, levelR, priorityR)
    } else {
      wx.showModal({
        title: "错误",
        content: '请正确填写或选择所有部分',
        showCancel: false,
      })
    }
  }

})