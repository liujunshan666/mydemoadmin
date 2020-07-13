<template>
  <div class="account-alter">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>密码修改</h3>
      </div>
      <!-- 表单 -->
      <el-form
        :model="lterAcountForm"
        status-icon
        :rules="rules"
        ref="lterAcountForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPassword" quer>
          <el-input type="password" v-model="lterAcountForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="lterAcountForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色信息 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="lterAcountForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">修改</el-button>
          <el-button @click="resetForm('lterAcountForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {changePassword} from '@/api/account.js'
export default {
  data() {
    const vm = this;
    //自定义校验规则函数
    const checkPassword = (rule, value, callback) => {
      // 有错
      if (value === "") {
        callback(new Error("密码不能为空！"));
      } else {
        //如果确认密码也有值
        if (this.lterAcountForm.checkPass !== "") {
          // 手动调用确认密码框对于的方法
          this.$refs.lterAcountForm.validateField("checkPass");
        }
        //没有错直接放行
        callback();
      }
    };

    const checkPass2 = (rule, value, callback) => {
      //有错
      if (value === "") {
        callback(new Error("确认密码不能为空！"));
      } else {
        //如果确认密码有值进来，直接和密码框的内容进行比较
        if (value === vm.lterAcountForm.newPassword) {
          //手动调用确认密码框对于的方法
          //没错直接放行
          callback();
        } else {
          callback(new Error("两次密码不一致！！"));
        }
      }
    };
    return {
      // 表单数据
      lterAcountForm: {
        oldPassword: "",
        newPassword: "",
        checkPass: "",
        token:'',
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        newPassword: [
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: checkPass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //点击修改按钮修改密码
    submitForm() {
      //const token = localStorage.getItem('token') 
    this.$refs.lterAcountForm.validate(valid => {
        if (valid) {
          //如果合法就在这里发送ajax请求了
          this.lterAcountForm.token=localStorage.getItem('token')
            //有值就发送ajax
            changePassword(this.lterAcountForm).then(data=>{
                  if(data.success){
                    this.$message({
                      type: "success",
                      message:data.message,
                      duration: 1000,
                      showClose: true,
                      onClose: () => {
                        //清除本地存储
                        localStorage.removeItem('token');
                        //跳转到登录页面
                        this.$router.replace("/login");
                      }
                    });
                  }else{
                      this.$message.error(data.message+'请检查原密码是否正确！');
                  }
            })

        } else {
          //如果不合法
          this.$message.error("请输入有效的值！");
        }
      });
    },
    resetForm(lterAcountForm) {
      this.$refs[lterAcountForm].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.account-alter {
  .el-card {
    width: 700px;
    margin: 100px auto;
  }
}
</style>