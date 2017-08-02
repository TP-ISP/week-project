const userlist = [{
      id: '1',
      username: 'admin',
      password: 'admin',
      email: 'zhangwei_w8284@tp-link.com.cn'
    },{
      id: '2',
      username: 'zhangwei',
      password: '19921221',
      email: 'zhangwei_w8284@tp-link.com.cn'
    },{
      id: '3',
      username: 'wangjiawei',
      password: 'wangjiawei',
      email: 'wangjiawei@tp-link.com.cn'
    }];

module.exports.findOne = function(username, callback) {
    
    for(i=0; i<=userlist.length;i++){
        if(userlist[i].username == username){
            // console.log(userlist[i])
            // user =  userlist[i];
            callback(null, userlist[i]);
        }
    }

}