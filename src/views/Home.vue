<template>
  <div class="home">
    <!-- 容器 -->
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="200px">
            <LeftMenu/>
      </el-aside>
      <!-- 又边 -->
      <el-container>
        <!-- 头 -->
        <el-header>
          <div class="left-box">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/dashbroad' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="right-box">
              <span>{{name}}</span>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                <el-avatar size="large" :src="avater"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='personal'>个人中心</el-dropdown-item>
                <el-dropdown-item divided command='logout'>注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </div>
        </el-header>
        <!-- 正文 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 -->
        <el-footer>
            ©COPYRIGHT 趣味超市 2010-2020
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from '../components/LeftMenu';
import avater from "../assets/images/timg.jpg";
import {dologout} from '@/api/index.js';
export default {
  name: "home",
  data(){
    return{
      avater:avater,
      name:'',
      breadcrumbList:[]//面包屑内容的集合(字符串集合)
    }
  },
   components:{
    LeftMenu,
  },
  methods: {
   handleCommand(command){
     //点击注销
    if(command === 'logout'){
        //获取本地存储的token值
      const token= localStorage.getItem('token')
          //发送ajax请求后台注销
          dologout(token).then(data=>{
                //判断后端返回的数据是否正确
                if(data.success){
                  //1.清除本地本地存储
                  localStorage.removeItem('token');
                  localStorage.removeItem('username');
                  //2.跳转到登录页面
                  this.$router.replace('/login')
                }
          })
    }else if(command==='personal'){
          //跳转到指定页面
          this.$router.push('/home/personage')
    }
   },
  },
  created () {
      this.name=localStorage.getItem('username');
      console.log('111');
      
  },
  //侦听器
 watch: {
   $route(newValue) {
     //准备一个新数组
     var arr=[];
     //执行
     //新页面里面的标题
     const title = newValue.meta.title;//拿到路由改变里面设置好的标题
     //把新标题放入集合
     arr.push(title)

     this.breadcrumbList=arr;
   }
 },
};
</script>

<style lang="less" scoped>

.home {
  //设置最外面的盒子样式
  height: 100%;
  //设置左侧栏样式
  .el-aside {
    background: #272930;
  }
  .el-header{
    display: flex;
    justify-content: space-between;
    align-items:center;
    .left-box{
     /deep/.el-breadcrumb__inner{
       color: #FFF;
     }
    }
    .right-box{
      display: flex;
      align-items: center;
      font-size: 14px;
      color:#fff;
      .el-avatar {
        margin-left: 10px;
      }
    }
  }

  & > .el-container {//&代表父级,>子代选择器找到el-container设置样式
    height: 100%;
    .el-header,.el-footer {//设置头部和尾部样式
      height: 60px;
      background-color: rgb(107, 117, 107);
    }
  }
  .el-footer{
     text-align: center;
      color: #FFF;
      font-size: 12px;
      height: 25px!important;
      line-height: 25px;
  }
}
</style>
