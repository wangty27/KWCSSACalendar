//index.js
//获取应用实例
const app = getApp()
const functions = require("./func.js")
const util = require("../../utils/util.js")
var date = new Date();
var currentMonthDates = [
  [{ date: "", style: 1, key: 0}, { date: "", style: 2, key: 1}, { date: "1", style: 3, key: 2}, { date: "2", style: 4, key: 3}, { date: "3", style: 5, key: 4}, { date: "4", style: 6, key: 5}, { date: "5", style: 7, key: 6}],
  [{ date: "6", style: 8, key: 7}, { date: "7", style: 9, key: 8}, { date: "8", style: 10, key: 9}, { date: "9", style: 11, key: 10}, { date: "10", style: 12, key: 11}, { date: "11", style: 13, key: 12}, { date: "12", style: 14, key: 13}],
  [{ date: "13", style: 15, key: 14}, { date: "14", style: 16, key: 15}, { date: "15", style: 17, key: 16}, { date: "16", style: 18, key: 17}, { date: "17", style: 19, key: 18}, { date: "18", style: 20, key: 19}, { date: "19", style: 21, key: 20}],
  [{ date: "20", style: 22, key: 21}, { date: "21", style: 23, key: 22}, { date: "22", style: 24, key: 23}, { date: "23", style: 25, key: 24}, { date: "24", style: 26, key: 25}, { date: "25", style: 27, key: 26}, { date: "26", style: 28, key: 27}],
  [{ date: "", style: 29, key: 28}, { date: "", style: 30, key: 29}, { date: "", style: 31, key: 30}, { date: "", style: 32, key: 31}, { date: "", style: 33, key: 32}, { date: "", style: 34, key: 33}, { date: "", style: 35, key: 34}]]

Page({
  data: {
    //motto: 'Hello World',
    //userInfo: {},
    //hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo')
    weekName: ["日", "一", "二", "三", "四", "五", "六"],
    dates: currentMonthDates
    },

  onLoad: function () {
    let _this = this
    var currentDateIndex = date.getDay()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var dayString = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    var startkey = functions.getMonthStartIndex(year, month, day, currentDateIndex) + 1
    var currentDate = util.formatNumber(year) + "年" + util.formatNumber(month) + "月" + util.formatNumber(day) + "日 " + dayString[currentDateIndex]
    currentMonthDates = functions.updateCalendar(startkey - 1, year, month, day, currentMonthDates)
    this.setData({
      currentDate: currentDate,
      dates: currentMonthDates
      })
    },

    dateTap: function(e){
      var currentObject = e.currentTarget.dataset.object
      console.log(currentObject)
    }
  //事件处理函数
  /*
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
     , key: })
   , key: } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
       , key: })
     , key: }
   , key: } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
         , key: })
       , key: }
     , key: })
   , key: }
 , key: },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
   , key: })
 , key: }*/

})
