/*
做企业级axios封装的
*/
// 1.引入axios
import axios from 'axios';
// 2.配置axios
const axiosInstanc = axios.create({
    //公共的请求地址配置在这里
                baseURL:'http://localhost:666',
                timeout:5000,//发送请求超出时间(单位是ms)
})




// 3.导出给别人用axios
export default axiosInstanc;

