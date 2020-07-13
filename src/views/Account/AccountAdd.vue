<template>
  <div class="account-add">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>添加管理员帐号</h3>
      </div>
      <!-- form -->

      <el-form
        :model="addAcountForm"
        status-icon
        :rules="rules"
        ref="addAcountForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="帐号" prop="username">
          <el-input v-model.number="addAcountForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addAcountForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="addAcountForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色信息 -->
        <el-form-item label="用户角色" prop="role">
          <el-select v-model="addAcountForm.role" placeholder="请选择">
            <!-- 
              label ： 下拉框显示的值
              value ： 下拉框传递的值
            -->
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="普通员工" value="2"></el-option>
          </el-select>
         </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="resetForm('addAcountForm')">重置</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//引入axios设置好的模块
import {addAccount} from '@/api/account.js'
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
        if (this.addAcountForm.checkPass !== "") {
          // 手动调用确认密码框对于的方法
          this.$refs.addAcountForm.validateField("checkPass");
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
        if (value === vm.addAcountForm.password) {
          //手动调用确认密码框对于的方法
          //没错直接放行
          callback();
        } else {
          callback(new Error("两次密码不一致！！"));
        }
      }
    };

    return {
      addAcountForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        password: [
          {
            // 自定义校验规则1
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            //自定义校验规则2
            validator: checkPass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
     //提交事件
    submitForm() {
      this.$refs.addAcountForm.validate(valid => {
        if (valid) {
          //如果合法就在这里发送ajax请求了
          addAccount(this.addAcountForm).then(data=>{
              if(data.success){
                this.$message({
                  type: "success",
                  message: data.message,
                  duration: 1000,
                  showClose: true,
                  onClose: () => {
                    this.$router.push("/home/account-list");
                  }
                });
              }else{
                this.$message.error(data.message);
              }
          })

        } else {
          //如果不合法
          this.$message.error("很遗憾帐号添加失败1");
        }
      });

    },
    resetForm(addAcountForm) {
        this.$refs[addAcountForm].resetFields();
    }
  },

};
</script>

<style lang="less" scoped>
.account-add {
  .el-card {
    width: 700px;
    margin: 100px auto;
  }
}
</style>