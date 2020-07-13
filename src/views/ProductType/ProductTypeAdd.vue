<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分类添加</span>
      </div>
      <el-form :model="classifyaddform" 
      :rules="rules" 
      ref="classifyaddform" 
      label-width="100px">
        <el-form-item label="活动名称" prop="name" required style="width:500px;">
          <el-input v-model="classifyaddform.name"></el-input>
        </el-form-item>
        <el-form-item label="分类序号" prop="order">
          <el-input-number
            v-model="classifyaddform.order"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="50"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="活动描述" style="width:550px" prop="desc">
          <el-input type="textarea" v-model="classifyaddform.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('classifyaddform')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {addProdcu} from '@/api/produccttype.js'
export default {
  data() {
    return {
      order:1,
      classifyaddform: {
        name: "",
        order: "",
        desc:""
      },
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        desc:[
           { required: true, message: "请输入活动描述名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.classifyaddform.validate(vaild => {
        if (vaild) {
           addProdcu(this.classifyaddform).then(data=>{
            //  console.log(data);
             this.$message({
               type: "success",
               message:data.message,
               duration: 1000,
               showClose: true,
               onClose: () => {
                 this.$router.push("/home/producttype-list");
               }
             });
           })
        } else {
          //如果不合法
          this.$message.error("添加失败错误请输入内容！");
        }
      });
    },
    //重置
    resetForm(classifyaddform) {
      this.$refs[classifyaddform].resetFields();
    },

    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
</style>