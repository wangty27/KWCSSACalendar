// pages/addEvent/addEvent.js

const util = require("../../utils/util.js")
const functions = require("./func.js")

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

var todayDate = [year, month, day].map(util.formatNumber).join('-')

var groupStyle=["", "", "", "", "", "", ""]
var groupSelected=[false, false, false, false, false, false, false]
var pageTitle=["添加事件", "修改事件"]
var eventTitle = "";
var eventPlace = "";
var eventContent = "";
var level=[{style: "", select: false}, {style: "", select: false}]
var controlPermission;

function changeGroupStyle(id){
  if (id == 0){
    if (groupStyle[0] == ""){
      for (var i = 0; i < 7; ++i){
        groupStyle[i] = "background: #555555; color: #FFFFFF";
        groupSelected[i] = true;
      }
    } else {
      for (var i = 0; i < 7; ++i){
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
      sleect: false,
    }
  } else {
    level[0] = {
      style: "",
      sleect: false,
    }
    level[1] = {
      style: "background: #555555; color: #FFFFFF",
      select: true,
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

  groupSelect: function(e){
    switch(e.target.id){
      case "group1": changeGroupStyle(0); break;
      case "group2": changeGroupStyle(1); break;
      case "group3": changeGroupStyle(2); break;
      case "group4": changeGroupStyle(3); break;
      case "group5": changeGroupStyle(4); break;
      case "group6": changeGroupStyle(5); break;
      case "group7": changeGroupStyle(6); break;
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
    for (var i = 0; i < 7; ++i){
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
      levelR = 1;
      levelS = true;
    }

    if (title && time && place && content && groupS && levelS){
      functions.addEvent(eventTitle, groupSelected, date, startTime, endTime, eventPlace, eventContent, levelR)
    } else {
      console.log("no")
    }
  }

})