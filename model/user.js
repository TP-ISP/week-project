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
    },{
      id: '5',
      username: 'linjiannan',
      password: 'linjiannan',
      chinese: '林建楠',
      email: 'linjiannan@tp-link.com.cn'
    },{
      id: '6',
      username: 'zhangwenkai',
      password: 'zhangwenkai',
      chinese: '张文开',
      email: 'zhangwenkai@tp-link.com.cn'
    },{
      id: '7',
      username: 'zhaomengqing',
      password: 'zhaomengqing',
      chinese: '赵孟青',
      email: 'zhaomengqing@tp-link.com.cn'
    }];

const leaderlist = [{
    id: '1',
    username: 'wenzhenyu',
    chinese: '温震宇',
    email: 'wenzhenyu@tp-link.com.cn',
    group: 'Software 1'
},{
    id: '2',
    username: 'zhonglianbo',
    chinese: '钟联波',
    email: 'zhonglianbo@tp-link.com.cn',
    group: 'Software 2'
},{
    id: '3',
    username: 'caijidi',
    chinese: '蔡及第',
    email: 'caijidi@tp-link.com.cn',
    group: 'Hardware 1'
},{
    id: '4',
    username: 'liwei',
    chinese: '李伟',
    email: 'liwei@tp-link.com.cn',
    group: 'Hardware 2'
}]

const pmlist = [{
    name: 'chenzhigui',
    chinese: '陈志桂',
    email: 'chenzhigui@tp-link.com.cn'
},{
    name: 'shangxiaohui',
    chinese: '尚晓辉',
    email: 'shangxiaohui@tp-link.com.cn'
},{
    name: 'wangzelong',
    chinese: '王泽龙',
    email: 'wangzelong@tp-link.com.cn'
},{
    name: 'wangbaofeng',
    chinese: '王宝锋',
    email: 'wangbaofeng@tp-link.com.cn'
}]

const fmlist = [{
    name: 'wangfang',
    english: 'Flora',
    chinese: '王芳'
},{
    name: 'liufang',
    english: 'Anna',
    chinese: '刘芳'
},{
    name: 'linlingfang',
    english: 'Sherry',
    chinese: '林玲芳'
}]

const devicelist = [{
    model: 'Archer C7',
    version: '2.0',
    platform: 'BBA'
},{
    model: 'Archer C7',
    version: '4.0',
    platform: 'BBA'
},{
    model: 'RN401',
    version: '6.0',
    platform: 'model_qca'
},{
    model: 'RN501',
    version: '6.0',
    platform: 'model_qca'
},{
    model: 'TD-WR9970',
    version: '2.0',
    platform: 'BBA'
}]

module.exports.findOne = function(username, callback) {
    
    for(i=0; i<=userlist.length;i++){
        if(userlist[i].username == username){

            callback(null, userlist[i]);
        }
    }
}

module.exports.userlist = userlist;
module.exports.leaderlist = leaderlist;
module.exports.pmlist = pmlist;
module.exports.fmlist = fmlist;
module.exports.devicelist = devicelist;