//index.js
//获取应用实例

const app = getApp()
const functions = require("./func.js")
const util = require("../../utils/util.js")
const eventList = require("../../utils/eventList.js")

var date = new Date();
var currentMonthDates = [
  [{ date: "", style: 1, key: 0, event: false }, { date: "", style: 2, key: 1, event: false }, { date: "", style: 3, key: 2, event: false }, { date: "", style: 4, key: 3, event: false }, { date: "", style: 5, key: 4, event: false }, { date: "", style: 6, key: 5, event: false }, { date: "", style: 7, key: 6, event: false}],
  [{ date: "6", style: 8, key: 7, event: false }, { date: "7", style: 9, key: 8, event: false }, { date: "8", style: 10, key: 9, event: false }, { date: "9", style: 11, key: 10, event: false }, { date: "10", style: 12, key: 11, event: false }, { date: "11", style: 13, key: 12, event: false }, { date: "12", style: 14, key: 13, event: false}],
  [{ date: "13", style: 15, key: 14, event: false }, { date: "14", style: 16, key: 15, event: false }, { date: "15", style: 17, key: 16, event: false }, { date: "16", style: 18, key: 17, event: false }, { date: "17", style: 19, key: 18, event: false }, { date: "18", style: 20, key: 19, event: false }, { date: "19", style: 21, key: 20, event: false}],
  [{ date: "20", style: 22, key: 21, event: false }, { date: "21", style: 23, key: 22, event: false }, { date: "22", style: 24, key: 23, event: false }, { date: "23", style: 25, key: 24, event: false }, { date: "24", style: 26, key: 25, event: false }, { date: "25", style: 27, key: 26, event: false }, { date: "26", style: 28, key: 27, event: false}],
  [{ date: "", style: 29, key: 28, event: false }, { date: "", style: "", key: 29, event: false }, { date: "", style: "", key: 30, event: false }, { date: "", style: "", key: 31, event: false }, { date: "", style: "", key: 32, event: false }, { date: "", style: "", key: 33, event: false }, { date: "", style: "", key: 34, event: false}]];
var startkey;
var currentDayEvents = [];
var currentMonthEvents = [];
var dateSelected;


Page({
  data: {
      //motto: 'Hello World',
      //userInfo: {},
      //hasUserInfo: false,
      //canIUse: wx.canIUse('button.open-type.getUserInfo')
      weekName: ["日", "一", "二", "三", "四", "五", "六"],
      dates: currentMonthDates,
      noEventShow: true,

  },

  onLoad: function () {
    let _this = this;

    eventList.refreshEventList();

    var currentDateIndex = date.getDay();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayString = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    startkey = functions.getMonthStartIndex(year, month, day, currentDateIndex) + 1;
    var currentDate = util.formatNumber(year) + " 年 " + util.formatNumber(month) + " 月";
    if (currentDayEvents.length == 0){
      this.setData({
        noEventShow: false
      })
    }
    currentMonthEvents = eventList.getMonthEvent(year, month);
    currentMonthDates = functions.updateCalendar(startkey - 1, year, month, day, currentMonthDates, currentMonthEvents);
    dateSelected = {year: year, month: month, day: day};
    currentDayEvents = eventList.getDateEvent(dateSelected);
    this.setData({
      currentDate: currentDate,
      dates: currentMonthDates,
      events: currentDayEvents
    })
    setTimeout(function () {
      currentDayEvents = eventList.getDateEvent(dateSelected);
      currentMonthEvents = eventList.getMonthEvent(year, month);
      currentMonthDates = functions.updateCalendar(startkey - 1, year, month, day, currentMonthDates, currentMonthEvents);
      _this.setData({
        events: currentDayEvents,
        dates: currentMonthDates
      })
      if (currentDayEvents.length > 0) {
        _this.setData({
          noEventShow: true
        })
      } else {
        _this.setData({
          noEventShow: false
        })
      }
      setTimeout(function () {
        currentDayEvents = eventList.getDateEvent(dateSelected);
        currentMonthEvents = eventList.getMonthEvent(year, month);
        currentMonthDates = functions.updateCalendar(startkey - 1, year, month, day, currentMonthDates, currentMonthEvents);
        _this.setData({
          events: currentDayEvents,
          dates: currentMonthDates
        })
        if (currentDayEvents.length > 0) {
          _this.setData({
            noEventShow: true
          })
        } else {
          _this.setData({
            noEventShow: false
          })
        }
      }, 300)
    }, 300)
  },

  onShow: function() {
    let _this = this;
    //eventList.checkUpdate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    dateSelected = {year: year, month: month, day: day};
    if (eventList.listUpdated()){
      currentDayEvents = eventList.getDateEvent(dateSelected);
      currentMonthEvents = eventList.getMonthEvent(year, month);
      currentMonthDates = functions.updateCalendar(startkey - 1, year, month, day, currentMonthDates, currentMonthEvents);
      this.setData({
        events: currentDayEvents,
        dates: currentMonthDates
      })
      if (currentDayEvents.length > 0){
        this.setData({
          noEventShow: true
        })
      } else {
        this.setData({
          noEventShow: false
        })
      }
    }
  },

  dateTap: function(e){
    var key = e.currentTarget.dataset.key;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    dateSelected = {year: year, month: month, day: 0};
    currentMonthDates = functions.dateSelect(startkey, month, day, key, currentMonthDates).monthDates;
    dateSelected.day = functions.dateSelect(startkey, month, day, key, currentMonthDates).dateSelected
    currentDayEvents = eventList.getDateEvent(dateSelected);
    this.setData({
      dates: currentMonthDates,
      events: currentDayEvents
    })
    if (currentDayEvents.length == 0) {
      this.setData({
        noEventShow: false
      })
    } else {
      this.setData({
        noEventShow: true
      })
    }
  },

  refreshEventList: function(){
    eventList.refreshEventList();
    var currentDateIndex = date.getDay();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayString = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    dateSelected = { year: year, month: month, day: day };
    startkey = functions.getMonthStartIndex(year, month, day, currentDateIndex) + 1;
    var currentDate = util.formatNumber(year) + " 年 " + util.formatNumber(month) + " 月";
    currentDayEvents = eventList.getDateEvent(dateSelected);
    if (currentDayEvents.length == 0) {
      this.setData({
        noEventShow: false
      })
    } else {
      this.setData({
        noEventShow: true
      })
    }
    currentMonthEvents = eventList.getMonthEvent(year, month);
    currentMonthDates = functions.updateCalendar(startkey - 1, year, month, day, currentMonthDates, currentMonthEvents);
    this.setData({
      currentDate: currentDate,
      dates: currentMonthDates,
      events: currentDayEvents
    })
  },

  onShareAppMessage: function () {
    return {
      title: "KWCSSA日历",
      path: "/pages/login/login",
      imageUrl: "../../resource/sharePic.png"
    }
  }

})
