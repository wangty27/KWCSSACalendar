var issueList = [];

function downLoadIssueList(callBack){
  let tableID = 3203;
  let table = new wx.BaaS.TableObject(tableID);
  table.find().then( (res) => {
    issueList = [];
    var objectList = res.data.objects;
    var len = res.data.objects.length;
    for (var i = 0; i < len; ++i){
      var issue = {
        title: objectList[i].Title,
        user: objectList[i].User,
        content: objectList[i].Content,
        id: objectList[i].id,
        create: objectList[i].Created
      }
      issueList.push(issue);
    }
    callBack();
  }, (err) => {
    wx.showModal({
      title: '错误',
      content: '错误',
      showCancel: false
    })
  })
}

function deleteIssue(id){
  let tableID = 3203;
  let table = new wx.BaaS.TableObject(tableID);
  table.delete(id).then( (res) => {
    wx.hideLoading()
    wx.showToast({
      title: '删除成功',
      duration: 700,
      mask: true
    })
  }, (err) => {
    wx.hideLoading()
    wx.showModal({
      title: '错误',
      content: '错误',
      showCancel: false
    })
  })
}

function getIssueList(){
  downLoadIssueList();
  return issueList;
}

module.exports = {
  refreshIssueList: downLoadIssueList,
  getIssueList: getIssueList,
  deleteIssue: deleteIssue,

}