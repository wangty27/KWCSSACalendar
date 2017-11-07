// pages/login/login.js

/*
Group:
0 - 主席团
1 - 外联部
2 - 人力资源部
3 - 组织部
4 - 信息部
5 - 宣传部
6 - 平台策划部

ControlPermission:
0 - 组员
1 - 部长
2 - 主席团
*/

const userJs = require("../../utils/userInfo.js");

var loginInfo = {
  userName: "",
  passWord: ""
}

var registerInfo = {
  userName: "",
  passWord: "",
  realName: "",
  code: 0,
}

function processCode(code) {
  var Group;
  var ControlPermission;
  switch(code){
    case 201715793: {
      Group = 0;
      ControlPermission = 2;
    }; break;
    case 2017010: {
      Group = 1;
      ControlPermission = 0;
    }; break;
    case 2017011: {
      Group = 1;
      ControlPermission = 1;
    }; break;
    case 2017020: {
      Group = 2;
      ControlPermission = 0;
    }; break;
    case 2017021: {
      Group = 2;
      ControlPermission = 1;
    }; break;
    case 2017030: {
      Group = 3;
      ControlPermission = 0;
    }; break;
    case 2017031: {
      Group = 3;
      ControlPermission = 1;
    }; break;
    case 2017040: {
      Group = 4;
      ControlPermission = 0;
    }; break;
    case 2017041: {
      Group = 4;
      ControlPermission = 1;
    }; break;
    case 2017050: {
      Group = 5;
      ControlPermission = 0;
    }; break;
    case 2017051: {
      Group = 5;
      ControlPermission = 1;
    }; break;
    case 2017060: {
      Group = 6;
      ControlPermission = 0;
    }; break;
    case 2017061: {
      Group = 6;
      ControlPermission = 1;
    }; break;
    default: return false; break;
  }
  return [Group, ControlPermission];
}

Page({
  data: {
    registerShow: false
  },

  loginBtnClick: function(){
    wx.showLoading({
      title: "登录中",
      mask: true
    })
    var query = new wx.BaaS.Query()

    var userInfo = wx.getStorageSync(loginInfo.userName);

    const regExp = [loginInfo.userName]

    query.in("UserName", regExp)//loginInfo.userName)
    
    // for server
    let tableID = 3101;
    let userID = userInfo.id;

    var table = new wx.BaaS.TableObject(tableID)

    table.setQuery(query).find().then( (res) => {
      if (res.data.objects.length == 0){
        wx.hideLoading()
        wx.showModal({
          title: "错误",
          content: "用户名不存在",
          showCancel: false
        })
      } else {
        var userInfo = res.data.objects[0];
        var userPassWord = userInfo.PassWord;
        if (loginInfo.passWord == userPassWord){
          wx.hideLoading()
          wx.showToast({
            icon: "success",
            title: "登录成功",
            mask: true,
            duration: 700
          })
          userJs.loginUser(userInfo);
          setTimeout(function(){
            wx.switchTab({
              url: "../index/index",
            })
          }, 700)
        } else {
          wx.hideLoading()
          wx.showModal({
            title: "错误",
            content: "请检查密码和用户名",
            showCancel: false
          })
        }
      }
    }, (err) => {
      console.log("err");
    })

  },

  inputFunction: function(e){
    var id = e.target.id;
    switch(e.target.id){
      case "login-username":{
        loginInfo.userName = e.detail.value;
      }; break;
      case "login-password": {
        loginInfo.passWord = e.detail.value;
      }; break;
      case "register-username": {
        registerInfo.userName = e.detail.value;
      }; break;
      case "register-password": {
        registerInfo.passWord = e.detail.value;
      }; break;
      case "register-realname": {
        registerInfo.realName = e.detail.value;
      }; break;
      case "register-code": {
        registerInfo.code = Number(e.detail.value);
      }; break;
    }
  },

  registerBtnClick: function(){
    this.setData({
      loginContent: "",
      registerShow: true
    })
  },

  submitBtnClick: function(){
    var processedCode = processCode(registerInfo.code);
    if (registerInfo.passWord == "" || registerInfo.userName == "" || registerInfo.code == 0 || registerInfo.realName == ""){
      wx.showModal({
        title: "注意",
        content: "请填写所有部分",
        showCancel: false
      })
      console.log(processedCode)
    } else if (processedCode == false) {
      wx.showModal({
        title: "注意",
        content: "请正确填写注册码",
        showCancel: false
      })
    } else {
      let _this = this;
      wx.showLoading({
        title: "注册中",
        mask: true,
      })

      //info for server
      let tableID = 3101;

      //search existing user
      var query = new wx.BaaS.Query();
      var userExist = false;

      query.contains("UserName", registerInfo.userName);

      var table = new wx.BaaS.TableObject(tableID);
      table.setQuery(query).find().then( (res) => {
        if (res.data.objects.length != 0){
          wx.hideLoading();
          wx.showModal({
            title: "错误",
            content: "注册失败，用户名已被注册",
            showCancel: false
          })
        } else {

          let createUser = new wx.BaaS.TableObject(tableID);
          let newUser = createUser.create();
          let newUserInfo = {
            UserName: registerInfo.userName,
            PassWord: registerInfo.passWord,
            Group: processedCode[0],
            RealName: registerInfo.realName,
            ControlPermission: processedCode[1]
          }
          newUser.set(newUserInfo).save().then((res) => {
            var registeredUser = {
              id: res.data._id,
              UID: res.data.UserName,
              UPW: res.data.PassWord
            }
            wx.hideLoading()
            wx.showToast({
              icon: "success",
              title: "注册成功",
              mask: true,
              duration: 700
            })
            _this.setData({
              registerShow: false,
              registerContent: ""
            })
          }, (err) => {
            wx.showModal({
              title: "错误",
              content: "注册失败，请检查网络设置",
              showCancel: false
            })
          })

        }
      }, (err) => {
        wx.showModal({
          title: "错误",
          content: "注册失败，请检查网络设置",
          showCancel: false
        })
      })
      //==================
    }

  }

})