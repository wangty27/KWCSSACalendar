/*
eventObjectSample:
{ 
  id: 1,
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



var eventList = [];
var nextEventId = 1;
var length = 0;
var listUpdated = false;
var listUpdateTimes = 0;

function addEvent(year, month, day, title, group, groupId, startTime, endTime, time, place, content, editLevel){
  updateListSync();
  eventList.push({
    id: nextEventId, 
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
  });
  ++nextEventId;
  ++length;
  listUpdateTimes = 2;
  listUpdated = true;
  wx.setStorageSync("eventList", eventList);
  //update server eventList
  console.log("Added! Whoo!")
  return true;
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

function refreshEventList(){
  //update event from server
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
  if (length == 0){
    nextEventId = 1;
  } else {
    nextEventId = eventList[length - 1].id + 1;
  }
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