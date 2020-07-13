//1.引入定义好的公共地址
import $http from '@/utils/request.js'

import qs from 'qs';
//2.配置

//1。商品类型分类列表
export const listProdcu = () =>{
    return $http.get('/productType/list').then(data=>data.data);
}

//1.1商品分页
export const pageProdcu=(data)=>{
    return $http.post('/productType/page',qs.stringify(data)).then(data=>data.data);
}
//2.商品类型添加
export const addProdcu =(data) =>{
    return $http.post('/productType/add',qs.stringify(data)).then(data=>data.data);
}
//3.商品类型修改
export const editProdcu =(data)=>{
    return $http.post('/productType/edit',qs.stringify(data)).then(data=>data.data);
}
//4.商品类型删除
export const delProdcu =(id)=>{
    return $http.get('/productType/del',{params:{id}}).then(data=>data.data);
}
//5.商品类型查询
export const searchProdcu =(data)=>{
    return $http.post('/productType/search',qs.stringify(data)).then(data=>data.data);
}