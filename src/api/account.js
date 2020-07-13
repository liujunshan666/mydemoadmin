//这是用来
//1.引入定义好的公共地址
import $http from '@/utils/request.js';
import qs from 'qs';
//2.配置

//1,帐号列表es5写法
// export function listAccounts(data){
//    return $http.get('/account/list',{
//        params:data
//    }).then((data)=>{
//        return data.data;
//    })
// }
//1,帐号列表es6写法
export const listAccounts=()=>{
   return $http.get('/account/list').then(data=>data.data)
}

//2.帐号添加
 export function addAccount(data){
     return $http.post('/account/add',qs.stringify(data)).then(data=>data.data);
 }

//3.帐号修改
export function editAcount(data){
    return  $http.post('/account/edit',qs.stringify(data)).then(data=>data.data);
}
//4.帐号删除
export const delAccount = (id) =>{
    return  $http.get('/account/del',{params:{id}}).then(data=>data.data);
}
//5.账号查询
export const searchAccount=(data)=>{
    return $http.post('/account/search',qs.stringify(data)).then(data=>data.data);
}
//6.帐号修改密码
export const changePassword =(data)=>{
    return $http.post('/changePassword',qs.stringify(data)).then(data=>data.data);
}
//7.帐号分页查询
export const pageAccount=(data)=>{
    return $http.post('/account/page',qs.stringify(data)).then(data=>data.data);
}