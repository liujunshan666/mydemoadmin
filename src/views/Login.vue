<template>
  <div class="Login">
      <h3 class="title el-icon-shopping-cart-2">趣味超市后台管理系统登录</h3>
      <!-- 
        表单 
        model : 表单数据对象
        rules : 表单验证规则
        status-icon : 是否在输入框中显示校验结果反馈图标
        ref: 全局id
        label-width : 表单标签域的宽度
      -->
      <el-form :model="loginform" status-icon :rules="rules" ref="loginfrom" class="demo-ruleForm">
            <!-- 
                label : 标签文本
                prop  : 表单域 model 字段 ，和验证器的名称匹配
                autocomplete: 自动校验开或者关
             -->
          <el-form-item prop="username">
            <el-input type="text" v-model="loginform.username" autocomplete="off" prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
          </el-form-item>

           <el-form-item  prop="password">
            <el-input type="password" v-model="loginform.password" autocomplete="off" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="submitForm">登 录</el-button>
           </el-form-item>
      </el-form>
  </div>
</template>
<script>
import {dologin}  from '@/api/'
export default {
    data(){
        return{
          loginform:{//v-model绑定的数据
            username:"",
            password:"",
            olduser:"",//上一轮用户
            oldpwd:""//上一轮密码
          },
          rules: {
            //表达的prop属性名 ： 规则数组
            //trigger：触发方式
            //required: 是否必填
            username:[
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
               { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ]
          }

        }
    },
    methods:{
      //前端验证通过后发送ajax
      submitForm(){
        //拿到表单
       const from =this.$refs.loginfrom;
       
       // 使用表单做验证
       from.validate((valid) => {
          if (valid) {
            if(this.loginform.olduser==this.loginform.username && this.loginform.oldpwd == this.loginform.password ) return
            this.loginform.olduser= this.loginform.username//点击保存第一次输入的
            this.loginform.oldpwd= this.loginform.password
              dologin(this.loginform).then(data=>{
                    if(data.success){
                      this.$message({
                      message: data.message,//提示信息名称
                      type: 'success',
                      duration:2000,
                      //登录成功
                      onClose:()=> {
                        //登录成功本地存储
                        localStorage.setItem('token',data.token)
  
                        //登录成功把用户名存在本地存储
                         localStorage.setItem('username',this.loginform.username)
                         
                        this.$router.replace('/home/dashbroad')
                      }//关闭message 实例时候执行的函数,俗称钩子函数
                    });
                    }else{
                      // this.loginform.username='';//登录失败清空帐号防抖节流
                      // this.loginform.password='';
                      this.$message({
                        showClose: true,
                        message: data.message,
                        type: 'error',
                        duration:2000
                      });
                  }
          })

          }else{
            this.$message('请输入密码')
          }
        });
      },
      login(){alert(1)}
    },



}
</script>
<style lang="less" scoped>
.Login{
  background: url('../assets/images/login.jpg') no-repeat center;
  background-size: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .el-form{//表单宽度
    width: 420px;
    /deep/.el-input__prefix{
      color: #0a0;
    };
  }
  .title{color:rgb(155, 124, 184);font-size: 23px}//标题
.el-button{width: 100%;}//按钮宽度
}
</style>
