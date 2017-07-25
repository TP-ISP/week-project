const userlist = [{
      id: '1',
      username: 'admin',
      password: 'admin',
      email: 'zhangwei_w8284@tp-link.con.cn'
    },{
      id: '2',
      username: 'zhangwei',
      password: '19921221',
      email: 'zhangwei_w8284@tp-link.con.cn'
    }];

module.exports.findOne = function(username, callback) {
    // var user = {
    //     id: '0',
    //     username: 'anonymous',
    //     password: '',
    //     email: ''
    // }
    
    for(i=0; i<=userlist.length;i++){
        if(userlist[i].username == username){
            // console.log(userlist[i])
            // user =  userlist[i];
            callback(null, userlist[i]);
        }
    }

}