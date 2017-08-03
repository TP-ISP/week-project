const userlist = [{
      id: '1',
      username: 'admin',
      password: 'admin',
      chinese:'管理员',
      email: 'zhangwei_w8284@tp-link.com.cn'
    },{
      id: '2',
      username: 'zhangwei',
      password: '19921221',
      chinese: '张伟',
      email: 'zhangwei_w8284@tp-link.com.cn'
    },{
      id: '3',
      username: 'wangjiawei',
      password: 'wangjiawei',
      chinese: '汪嘉伟',
      email: 'wangjiawei@tp-link.com.cn'
    },{
      id: '4',
      username: 'cuihuani',
      password: 'cuihuani',
      chinese: '崔花妮',
      email: 'cuihuani@tp-link.com.cn'
    }];

module.exports.findOne = function(username, callback) {
    
    for(i=0; i<=userlist.length;i++){
        if(userlist[i].username == username){

            callback(null, userlist[i]);
        }
    }

}