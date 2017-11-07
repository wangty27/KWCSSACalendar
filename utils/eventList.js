/*
eventObjectSample:
{ 
  year: 2017,
  month: 11,
  day: 27,
  title: "信息部内部会议",
  group: "信息部", // "全员",
  groupId: [1, 2, 4], // 1-外联部，2-人力资源部，3-组织部，4-信息部，5-宣传部，6-平台策划部
  start: "11:30",
  end: "12:50",
  time: "2017/11/27 11:30 - 12:50",
  place: "MC1231",
  content: "信息部内部会议，讨论下一步计划",
  editLevel: 1 // 2 for President 1 for Group Leaders
}
*/

const userJs = require("./userInfo.js");

var masterList = [];
var eventList = [];
var length = 0;
var listUpdated = false;
var listUpdateTimes = 0;
var userInfo = userJs.getUserInfo();

function addEvent(year, month, day, title, group, groupId, startTime, endTime, time, place, content, editLevel){
  wx.showLoading({
    title: "添加中",
  })
  updateListSync();
  downloadEventList();
  eventList = masterList;
  length = masterList.length;
  var event = {
    id: 0,
    year: year,
    month: month,
    day: day,
    title: title,
    group: group,
    groupId: groupId,
    start: startTime,
    end: endTime,
    time: time,
    place: place,
    content: content,
    editLevel: editLevel
  };
  let tableID = 3105;
  let newEvent = new wx.BaaS.TableObject(tableID);
  let createEvent = newEvent.create()

  createEvent.set(event).save().then((res) => {
    wx.hideLoading()
    wx.showToast({
      icon: "success",
      title: "添加成功",
      duration: 700
    })
    console.log("added")
    event.id = res.data._id;
    console.log(event)
    eventList.push(event);
    ++length;
    listUpdateTimes = 2;
    listUpdated = true;
    wx.setStorageSync("eventList", eventList);
    //update server eventList
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })
      return true;
    }, 700)
  }, (err) => {
    console.log("err")
  })
}

function downloadEventList(){
  let tableID = 3105;
  let table = new wx.BaaS.TableObject(tableID);
  table.find().then( (res) => {
    masterList = [];
    var objectList = res.data.objects;
    var len = res.data.objects.length;
    for (var i = 0; i < len; ++i){
      var event = {
        id: objectList[i].id,
        year: objectList[i].year,
        month: objectList[i].month,
        day: objectList[i].day,
        title: objectList[i].title,
        group: objectList[i].group,
        groupId: objectList[i].groupId,
        start: objectList[i].start,
        end: objectList[i].end,
        time: objectList[i].time,
        place: objectList[i].place,
        content: objectList[i].content,
        editLevel: objectList[i].editLevel
      };
      masterList.push(event);
    }
    console.log(masterList);
    return true;
  }, (err) => {
    console.log("err");
    return false;
  })
}

function refreshEventList(){
  if (downloadEventList()) {
    eventList = [];
    var len = masterList.length;
    for (var i = 0; i < len; ++i) {
      var event = masterList[i];
      function inGroup(group){
        return group == userInfo.group;
      }
      if (event.group.find(inGroup)){
        eventList.push(event);
      }
    }
  }
}

function removeEvent(id){

}

function getEventList(){
  updateListSync();
  return eventList;
}

function getDateEvent(dateSelected){
  var year = dateSelected.year;
  var month = dateSelected.month;
  var day = dateSelected.day;
  var dateEventList = [];
  for (var i = 0; i < length; ++i){
    var event = eventList[i];
    if (event.year == year && event.month == month && event.day == day){
      dateEventList.push(event);
    }
  }
  return dateEventList;
}

function getMonthEvent(year, month){
  var monthEventList = [];
  for (var i = 0; i < length; ++i){
    var event = eventList[i];
    if (event.year == year && event.month == month){
      var day = event.day;
      monthEventList.push(day);
    }
  }
  return monthEventList;
}

function getEventById(id) {
  for (var i = 0; i < length; ++i){
    if (eventList[i].id == id){
      return eventList[i]
    }
  }
}

function listUpdatedFunc(){
  if (listUpdated) {
    listUpdateTimes -= 1;
    if (listUpdateTimes <= 0){
      listUpdated = false;
    }
    return true;
  } else {
    return false;
  }
}

function updateListSync(){
  eventList = wx.getStorageSync("eventList")
  length = eventList.length;
}

module.exports = {
  getEventList: getEventList,
  addEvent: addEvent,
  removeEvent: removeEvent,
  getDateEvent: getDateEvent,
  getMonthEvent: getMonthEvent,
  refreshEventList: refreshEventList,
  getEventById: getEventById,
  listUpdated: listUpdatedFunc,
  
}