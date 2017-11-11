var userName;
var passWord;
var realName;
var group;
var controlPermission;


function loginUser(userObject){
  userName = userObject.UserName;
  passWord = userObject.PassWord;
  realName = userObject.RealName;
  group = userObject.Group;
  controlPermission = userObject.ControlPermission;
}

function getUserInfo(){
  var userInfo = {
    group: group,
    controlPermission: controlPermission,
    name: realName
  }
  return userInfo;
}

module.exports = {
  loginUser: loginUser,
  getUserInfo: getUserInfo,
  
}