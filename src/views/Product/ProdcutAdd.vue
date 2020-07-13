<template>
  <div class="prodcu-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>添加商品</h3>
      </div>
      <!-- 表单 -->
      <el-form ref="addprodcutform" :model="addprodcutform" label-width="80px" :rules="rules">
        <el-form-item label="商品名称" prop="name" style="width:500px">
          <el-input v-model="addprodcutform.name"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" prop="category">
          <el-select v-model="addprodcutform.category" placeholder="请选择商品分类">
            <!-- 循环分类 ,动态渲染分类选项-->
            <el-option
              v-for="type in typeList"
              :key="type.id"
              :label="type.name"
              :value="type.name"
            ></el-option>
            <!-- <el-option label="热菜" value="热菜"></el-option>
            <el-option label="速食" value="速食"></el-option>
            <el-option label="熟食" value="熟食"></el-option>
            <el-option label="饮品" value="饮品"></el-option>-->
          </el-select>
        </el-form-item>

        <el-form-item label="商品特色" prop="feature">
          <el-checkbox-group v-model="addprodcutform.feature">
            <el-checkbox label="新品上市" name="type"></el-checkbox>
            <el-checkbox label="第二杯半价" name="type"></el-checkbox>
            <el-checkbox label="主打产品" name="type"></el-checkbox>
            <br />
            <el-checkbox label="火爆产品" name="type"></el-checkbox>
            <el-checkbox label="祖传手艺" name="type"></el-checkbox>
            <el-checkbox label="源自四川" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 
          action ： 上传组件请求接口地址
          show-file-list : 是否开启列表参数
          on-success
         -->
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>

        <el-form-item label="是否促销" prop="isPromotion">
          <el-radio-group v-model="addprodcutform.isPromotion">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input-number v-model.number="addprodcutform.price" :min="1" :max="50" label="描述文字"></el-input-number>
        </el-form-item>

        <el-form-item label="包装费" prop="packingexpense">
          <el-input-number v-model="addprodcutform.packingexpense" :min="1" :max="100" label="描述文字"></el-input-number>
        </el-form-item>

        <el-form-item label="商品描述" prop="desc" style="width:700px">
          <el-input type="textarea" v-model="addprodcutform.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('addprodcutform')">立即创建</el-button>
          <el-button @click="resetForm('addprodcutform')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addProduct ,uploadApi ,uploadDir} from "@/api/prodcut.js";
import { listProdcu } from "@/api/produccttype.js";
export default {
  data() {
    return {
      uploadApi:uploadApi,
      imgUrl:'',
      dialogVisible: false,
      //分类数据
      typeList: [],
      //1.商品表单
      addprodcutform: {
        name: "", //商品名称
        category: "", //商品分类
        feature: [], //商品特色
        promotion: "", //是否促销
        price: "", //单价
        packingexpense: "", //包装费
        desc: ""
      },
      //验证规则
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        feature: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个商品特色",
            trigger: "change"
          }
        ],
        isPromotion: [
          { required: true, message: "请选择是否促销", trigger: "change" }
        ],
        desc: [{ required: true, message: "请输入商品描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    //1.点击创建
    submitForm() {
      //处理表单的数据
      this.$refs.addprodcutform.validate(vaild => {
        if (vaild) {
          //过滤数据,把数组转换成字符串对象
          if (this.addprodcutform.feature) {
            this.addprodcutform.feature = JSON.stringify(
              this.addprodcutform.feature
            );
          }
          //发送ajax带上表单的参数！
          addProduct(this.addprodcutform).then(data => {
            // console.log(this.addprodcutform.feature);
            this.$message({
              type: "success",
              message: data.message,
              duration: 1000,
              showClose: true,
              onClose: () => {
                this.$router.push("/home/prodcut-list");
              }
            });
          });
        } else {
          //如果不合法
          this.$message.error("添加失败错误请输入内容！");
        }
      });
    },
    //2.点击重置
    resetForm(addprodcutform) {
      this.$refs[addprodcutform].resetFields();
    },
    
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    //图片头像
    handleAvatarSuccess(res){
        this.imgUrl=res.fileName;
    }
  },
  computed: {
    imageUrl(){
      if(this.addprodcutform.imgUrl){
        return uploadDir +this.addprodcutform.imgUrl 
      }else{
        return'';
      }
    }
  },
  //生命周期中
  created() {
    listProdcu().then(data => {
      //获取响应回来的数据
      this.typeList = data;
    });
  }
};
</script>

<style lang="less" scoped>
.prodcu-add {
  /deep/.avatar-uploader .el-upload {
    border: 1px solid #ccc;
    border-radius: 25px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>