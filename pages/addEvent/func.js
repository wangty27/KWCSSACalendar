const eventList = require("../../utils/eventList.js")

function returnEditEvent(id){
  var event = eventList.getEventById(id);
  var title = event.title;
  var group = event.groupId;
  var start = event.start;
  var end = event.end;
  var date = event.year.toString() + "-" + event.month.toString() + "-" + event.day.toString();
  var place = event.place;
  var contect = event.content;
  
  var groupStyle = ["", "", "", "", "", "", ""]
  var groupSelected = [false, false, false, false, false, false, false]
  var grouplen = group.length;

  for (var i = 0; i < grouplen; ++i){
    if (group[i] == 0){
      for (var i = 0; i < 7; ++i) {
        groupStyle[i] = "background: #555555; color: #FFFFFF";
        groupSelected[i] = true;
      }
      break;
    } else {
      groupStyle[group[i]] = "background: #555555; color: #FFFFFF";
      groupSelected[group[i]] = true;
    }
  }
  return {
    title: title,
    groupStyle: groupStyle,
    groupSelected: groupSelected,
    start: start,
    end: end,
    date: date,
    content: content
  }
}

function checkTime(start, end) {
  var startTime = start.split(":");
  var endTime = end.split(":");
  var startTimeV = Number(startTime[0]) * 60 + Number(startTime[1]);
  var endTimeV = Number(endTime[0]) * 60 + Number(endTime[1]);
  if (startTimeV >= endTimeV) {
    return false;
  } else {
    return true;
  }
}

/*
addEvent(year, month, day, title, group, groupId, startTime, endTime, time, place, content, editLevel){
}
*/

function addEventToList(title, group, date, startTime, endTime, place, content, level){
  var groupName = "";
  var groupId = [];
  date = date.split("-");
  var year = date[0];
  var month = date[1];
  var day = date[2];
  var time = year + "年" + month + "月" + day + "日" + "  " + startTime + " - " + endTime;
  if (group[0] == true){
    groupName = "全员";
    groupId = [1, 2, 3, 4, 5, 6];
  } else {
    for (var i = 1; i < 7; ++i){
      if (group[i]){
        switch(i){
          case 1: groupName += "外联部 "; break;
          case 2: groupName += "人力资源部 "; break;
          case 3: groupName += "组织部 "; break;
          case 4: groupName += "信息部 "; break;
          case 5: groupName += "宣传部 "; break;
          case 6: groupName += "平台策划部 "; break;
          default: break;
        }
        groupId.push(i);
      }
    }
  }
  var successful = eventList.addEvent(year, month, day, title, groupName, groupId, startTime, endTime, time, place, content, level);
  return successful;
}


module.exports = {
  checkTime: checkTime,
  addEvent: addEventToList,

}