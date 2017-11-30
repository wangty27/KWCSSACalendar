//index.js
//获取应用实例

const app = getApp()
const functions = require("./func.js")
const util = require("../../utils/util.js")
const eventList = require("../../utils/eventList.js")

var date = new Date();
var currentMonthDates = [
  [{ date: "", style: 1, key: 0, event: false }, { date: "", style: 2, key: 1, event: false }, { date: "", style: 3, key: 2, event: false }, { date: "", style: 4, key: 3, event: false }, { date: "", style: 5, key: 4, event: false }, { date: "", style: 6, key: 5, event: false }, { date: "", style: 7, key: 6, event: false }],
  [{ date: "6", style: 8, key: 7, event: false }, { date: "7", style: 9, key: 8, event: false }, { date: "8", style: 10, key: 9, event: false }, { date: "9", style: 11, key: 10, event: false }, { date: "10", style: 12, key: 11, event: false }, { date: "11", style: 13, key: 12, event: false }, { date: "12", style: 14, key: 13, event: false }],
  [{ date: "13", style: 15, key: 14, event: false }, { date: "14", style: 16, key: 15, event: false }, { date: "15", style: 17, key: 16, event: false }, { date: "16", style: 18, key: 17, event: false }, { date: "17", style: 19, key: 18, event: false }, { date: "18", style: 20, key: 19, event: false }, { date: "19", style: 21, key: 20, event: false }],
  [{ date: "20", style: 22, key: 21, event: false }, { date: "21", style: 23, key: 22, event: false }, { date: "22", style: 24, key: 23, event: false }, { date: "23", style: 25, key: 24, event: false }, { date: "24", style: 26, key: 25, event: false }, { date: "25", style: 27, key: 26, event: false }, { date: "26", style: 28, key: 27, event: false }],
  [{ date: "", style: 29, key: 28, event: false }, { date: "", style: "", key: 29, event: false }, { date: "", style: "", key: 30, event: false }, { date: "", style: "", key: 31, event: false }, { date: "", style: "", key: 32, event: false }, { date: "", style: "", key: 33, event: false }, { date: "", style: "", key: 34, event: false }]];
var startkey;
var currentDayEvents = [];
var currentMonthEvents = [];
var dateSelected;
var monthSelected = { year: 0, month: 0, display: "" };


Page({
  data: {
    weekName: ["日", "一", "二", "三", "四", "五", "六"],
    dates: currentMonthDates,
    noEventShow: true,

  },

  initLoad: function(){
    var currentDateIndex = date.getDay();
    var year = date.getFullYear();
    monthSelected.year = year;
    var month = date.getMonth() + 1;
    monthSelected.month = month;
    var day = date.getDate();
    var firstDay = new Date();
    firstDay.setDate(1);
    startkey = firstDay.getDay();
    monthSelected.display = util.formatNumber(year) + " 年 " + util.formatNumber(month) + " 月";
    if (currentDayEvents.length == 0) {
      this.setData({
        noEventShow: false
      })
    }
    currentMonthEvents = eventList.getMonthEvent(year, month);
    currentMonthDates = functions.generateCalendar(startkey, year, month, day, currentMonthEvents);
    dateSelected = { year: year, month: month, day: day };
    currentDayEvents = eventList.getDateEvent(dateSelected);
    this.setData({
      currentDate: monthSelected.display,
      dates: currentMonthDates,
      events: currentDayEvents
    })
  },

  onLoad: function () {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    eventList.refreshEventList(function(){
      _this.initLoad();
      wx.hideLoading();
    });
  },

  onShow: function () {
    let _this = this;
    //eventList.checkUpdate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var firstDay = new Date();
    firstDay.setDate(1);
    startkey = firstDay.getDay();
    dateSelected = { year: year, month: month, day: day };
    currentDayEvents = eventList.getDateEvent(dateSelected);
    currentMonthEvents = eventList.getMonthEvent(year, month);
    currentMonthDates = functions.generateCalendar(startkey, year, month, day, currentMonthEvents);
    monthSelected.display = util.formatNumber(year) + " 年 " + util.formatNumber(month) + " 月";
    monthSelected.year = year;
    monthSelected.month = month;
    this.setData({
      events: currentDayEvents,
      dates: currentMonthDates,
      currentDate: monthSelected.display
    })
    if (currentDayEvents.length > 0) {
      this.setData({
        noEventShow: true
      })
    } else {
      this.setData({
        noEventShow: false
      })
    }
    
  },

  dateTap: function (e) {
    var key = e.currentTarget.dataset.key;
    var year = monthSelected.year;
    var month = monthSelected.month;
    var day = date.getDate();
    if (month != date.getMonth() + 1){
      day = -1;
    }
    dateSelected = { year: year, month: month, day: day };
    currentMonthDates = functions.dateSelect(startkey, month, day, key, currentMonthDates).monthDates;
    dateSelected.day = functions.dateSelect(startkey, month, day, key, currentMonthDates).dateSelected;
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

  refreshEventList: function () {
    eventList.refreshEventList();
    var currentDateIndex = date.getDay();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    monthSelected.year = year;
    monthSelected.month = month;
    dateSelected = { year: year, month: month, day: day };
    var firstDay = new Date();
    firstDay.setDate(1);
    startkey = firstDay.getDay();
    monthSelected.display = util.formatNumber(year) + " 年 " + util.formatNumber(month) + " 月";
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
    currentMonthDates = functions.generateCalendar(startkey, year, month, day, currentMonthEvents);
    this.setData({
      currentDate: monthSelected.display,
      dates: currentMonthDates,
      events: currentDayEvents
    })
  },

  toBtnClick: function (e) {
    var id = e.currentTarget.dataset.id;
    var initDay = 1;
    if (id == "toLeft") {
      monthSelected.month -= 1;
      if (monthSelected.month <= 0) {
        monthSelected.year -= 1;
        monthSelected.month = 12;
      }
    } else if (id == "toRight") {
      monthSelected.month += 1;
      if (monthSelected.month >= 13) {
        monthSelected.year += 1;
        monthSelected.month = 1;
      }
    }
    var curYear = date.getFullYear();
    var curMonth = date.getMonth() + 1;
    var curDay = date.getDate();
    if (monthSelected.year == curYear && monthSelected.month == curMonth){
      initDay = curDay;
    }
    monthSelected.display = util.formatNumber(monthSelected.year) + " 年 " + util.formatNumber(monthSelected.month) + " 月";
    var newDate = new Date();
    newDate.setFullYear(monthSelected.year, monthSelected.month - 1, 1);
    startkey = newDate.getDay();
    currentMonthEvents = eventList.getMonthEvent(monthSelected.year, monthSelected.month);
    currentMonthDates = functions.generateCalendar(startkey, monthSelected.year, monthSelected.month, initDay, currentMonthEvents);
    dateSelected = {year: monthSelected.year, month: monthSelected.month, initDay};
    currentDayEvents = eventList.getDateEvent(dateSelected);
    this.setData({
      currentDate: monthSelected.display,
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

  onPullDownRefresh: function () {
    let _this = this;
    wx.showLoading({
      title: '刷新中',
      mask: true
    });
    eventList.refreshEventList(function(){
      wx.stopPullDownRefresh();
      _this.afterListRefresh();
    })
  },

  afterListRefresh: function() {
    wx.showToast({
      title: '刷新成功',
      duration: 700
    })
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var firstDay = new Date();
    firstDay.setDate(1);
    startkey = firstDay.getDay();
    dateSelected = { year: year, month: month, day: day };
    currentDayEvents = eventList.getDateEvent(dateSelected);
    currentMonthEvents = eventList.getMonthEvent(year, month);
    currentMonthDates = functions.generateCalendar(startkey, year, month, day, currentMonthEvents);
    monthSelected.display = util.formatNumber(year) + " 年 " + util.formatNumber(month) + " 月";
    monthSelected.year = year;
    monthSelected.month = month;
    
    this.setData({
      events: currentDayEvents,
      dates: currentMonthDates,
      currentDate: monthSelected.display
    })
    if (currentDayEvents.length > 0) {
      this.setData({
        noEventShow: true
      })
    } else {
      this.setData({
        noEventShow: false
      })
    }
  },

  onShareAppMessage: function () {
    return {
      title: "KWCSSA日历",
      path: "/pages/login/login",
      imageUrl: "../../resource/sharePic.png"
    }
  }

})
