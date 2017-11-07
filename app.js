//app.js
App({
  onLaunch: function () {
    
  require("./sdk-v1.1.1.js");

  let clientID = "c609c1c7220256915179"
  wx.BaaS.init(clientID)

  },
  
})