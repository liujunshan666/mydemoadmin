//1.引入公共资源地址
import $http from '@/utils/request.js';

import qs from 'qs';

//2.配置

//1.商品管理列表项
export const listProduct = ()=>{
    return $http.get('/product/list').then(data=>data.data);
}
//1.1商品分页
export const pageProduct =(data)=>{
    return $http.post('product/page',qs.stringify(data)).then(data=>data.data);
}



//2.商品管理添加
export const addProduct =(data) =>{
    return $http.post('/product/add',qs.stringify(data)).then(data=>data.data);
}
//3.商品管理修改
export const editProduct = (data)=>{
    return $http.post('/product/edit',qs.stringify(data)).then(data=>data.data);
}
//4.商品管理删除
export const deltProduct =(id)=>{
    return $http.get('/product/del',{params:{id}}).then(data=>data.data);
}
//5.商品查询接口
export const searchProduct=(data)=>{
    return $http.post('/product/search',qs.stringify(data)).then(data=>data.data);
}

//6.商品图片上传接口
export const uploadApi = $http.defaults.baseURL+'/product/upload'
//服务器文件加载目录
export const uploadDir = $http.defaults.baseURL+'/upload/product'