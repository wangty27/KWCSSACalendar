var userName;
var passWord;
var group;
var controlPermission;


function loginUser(userObject){
  userName = userObject.UserName;
  passWord = userObject.PassWord;
  group = userObject.Group;
  controlPermission = userObject.ControlPermission;
}

function getUserInfo(){
  var userInfo = {
    group: group,
    controlPermission: controlPermission
  }
  return userInfo;
}

module.exports = {
  loginUser: loginUser,
  getUserInfo: getUserInfo,
  
}