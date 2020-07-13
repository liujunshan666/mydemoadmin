//1.引入公共地址
import $http from '@/utils/request.js';
//2.引入qs
import qs from'qs';


//1.登录模块
export const dologin = (data) =>{
      return $http.post('/login',qs.stringify(data)).then(data=>data.data);
}
//2.注销模块
export const dologout = (data) =>{
      return $http.post('/logout',qs.stringify(data)).then(data=>data.data);
}
//获取用户角色信息做菜单权限问题
export const getCurrentUserRole =()=>{
      //直接在本地中中获取token
    const tokenvalue =  localStorage.getItem('token');//简化用户使用接口的难度
      return $http.post('/getCurrentUserRole',qs.stringify(
            {token:tokenvalue}
            ))
            .then(data=>data.data)
}