function getMonthStartIndex(year, month, date, dayIndex){
  var monthDays;
  if (year % 4 == 0){
    monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  } else {
    monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  }
  var currentMonthDays = monthDays[month - 1]
  var index = dayIndex - (date - 1) % 7
  if (index < 0) index += 7;
  return index;
}

function updateCalendar(firstDayIndex, year, month, day, container){
  if (container.length == 6){
    container.pop
  }
  var monthDays;
  if (year % 4 == 0) {
    monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  } else {
    monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  }
  var currentDay = 1 - firstDayIndex;
  for (var v = 0; v < 5; ++v){
    for (var h = 0; h < 7; ++h){
      if (currentDay > 0){
        container[v][h].date = currentDay;
      } else {
        container[v][h].date = ""
      }
      if (currentDay == day){
        container[v][h].style = "border: 1rpx solid #000000"
      } else {
        container[v][h].style = ""
      }
      ++currentDay;
      if (currentDay > monthDays[month - 1]) break;
    }
  }
  if (currentDay <= monthDays[month - 1]) {
    var newline = [];
    for (var i = 0; i < 7; ++i){
      if (currentDay <= monthDays[month - 1]){
        newline.push({date: currentDay, style: "", key: (34 + i + 1)})
      } else {
        newline.push({date: "", style: "", key: (34 + i + 1)})
      }
      ++currentDay
    }
    container.push(newline)
  }
  return container;
}

module.exports = {
  getMonthStartIndex: getMonthStartIndex,
  updateCalendar: updateCalendar,

}