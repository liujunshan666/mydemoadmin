<template>
  <div class="prodcut-list">
    <!-- 标题 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
      <h3>商品管理列表</h3>
     </div>
     <!-- 商品管理查询 -->
    <el-form :inline="true" :model="searchform" ref="searchform">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="searchform.name" placeholder="商品名称"></el-input>
      </el-form-item>

      <el-form-item label="起始价格" prop="priceStart">
        <el-input v-model.number="searchform.priceStart" placeholder="起始价格"></el-input>
      </el-form-item>

      <el-form-item label="价格结束值" prop="priceEnd">
        <el-input v-model.number="searchform.priceEnd" placeholder="结束价格"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button  @click="reset('searchform')">重置</el-button>
      </el-form-item>
    </el-form>
     <!-- 表格数据列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品特色">
              <span>{{ props.row.feature }}</span>
            </el-form-item>

            <el-form-item label="是否畅销">
              <span>{{ props.row.isPromotion }}</span>
            </el-form-item>
            <el-form-item label="商品包装费">
              <span>{{ props.row.packingexpense }}</span>
            </el-form-item>
            <el-form-item label="商品单价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column label="录入时间" prop="inputtime">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.inputtime|fordata}}</span>
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 
      1.pageSize 改变时会触发	每页条数
      2.currentPage 改变时会触发	回调当前页
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.currentPage"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>

    <!-----------------------------编辑数据 ---------------------------------------->
    <el-dialog title="名称修改" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择商品分类">
            <el-option label="茶叶" value="茶叶"></el-option>
            <el-option label="热菜" value="热菜"></el-option>
            <el-option label="速食" value="速食"></el-option>
            <el-option label="熟食" value="熟食"></el-option>
            <el-option label="饮品" value="饮品"></el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="商品特色" prop="feature">
            <el-checkbox-group v-model="form.feature">
              <el-checkbox label="新品上市" name="type"></el-checkbox>
              <el-checkbox label="第二杯半价" name="type"></el-checkbox>
              <el-checkbox label="主打产品" name="type"></el-checkbox>
              <br />
              <el-checkbox label="火爆产品" name="type"></el-checkbox>
              <el-checkbox label="祖传手艺" name="type"></el-checkbox>
              <el-checkbox label="源自四川" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <!-- <el-form-item label="商品图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item> -->

       <el-form-item label="是否促销" prop="isPromotion">
          <el-radio-group v-model="form.isPromotion">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="价格" prop="price">
               <el-input-number v-model.number="form.price" :min="1" :max="50" label="描述文字"></el-input-number>
          </el-form-item>

         <el-form-item label="包装费" prop="packingexpense">
               <el-input-number v-model.number="form.packingexpense" :min="1" :max="100" label="描述文字"></el-input-number>
          </el-form-item>

        <el-form-item label="商品描述" prop="desc" style="width:90%">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 操作按钮 -->
        <el-button type="primary" @click="editProdcuList">修改</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
</el-card>
  </div>
</template>

<script>
import { pageProduct ,editProduct,deltProduct,searchProduct} from "@/api/prodcut.js";
//时间
import moment from "moment";
export default {
  data() {
    return {
      //验证规则
      rules: {
        username: "",
        description: "",
        classify: ""
      },
      
      Productfrom: {
        name: "",
        description: "",
        classify: ""
      },
      //修改窗默认隐藏
      dialogFormVisible: false,
      //分页默认第一页
     
      //表格列表数据
      tableData: [
        {
          id: "1",
          name: "龙井茶",
          classify: "凉茶",
          feature: "新品上市",
          boom: "是",
          packaging: "1.5",
          unit: "15",
          description: "这是来自中国的凉茶",
          data: "2019年11月11日 00:00"
        },
        {
          id: "2",
          name: "白茶",
          classify: "凉茶",
          feature: "新品上市",
          boom: "是",
          packaging: "1.5",
          unit: "45",
          description: "这是来自中国的凉茶",
          data: "2019年11月11日 00:00"
        },
        {
          id: "3",
          name: "绿茶",
          classify: "凉茶",
          feature: "新品上市",
          boom: "是",
          packaging: "1.5",
          unit: "15",
          description: "这是来自中国的凉茶",
          data: "2019年11月11日 00:00"
        },
        {
          id: "4",
          name: "红茶",
          classify: "凉茶",
          feature: "新品上市",
          boom: "是",
          packaging: "1.5",
          unit: "15",
          description: "这是来自中国的凉茶",
          data: "2019年11月11日 00:00"
        },
        {
          id: "5",
          name: "黑茶",
          classify: "凉茶",
          feature: "新品上市",
          boom: "是",
          packaging: "1.5",
          unit: "15",
          description: "这是来自中国的凉茶",
          data: "2019年11月11日 00:00"
        }
      ],
      //回填数据声明
      form:{},
      //查询
      searchform:{},
      //分页对象
      page:{
           currentPage: 1,
            pageSize:5,
           total:10
      }
    };
  },
  methods: {
    //点击编辑显示对话框
    handleEdit(row) {
      this.dialogFormVisible = true;//1.显示对话框

      this.form = Object.assign({},row);//2.把行数据回调回去
        //处理回填后的数据
        if(this.form.feature){
          this.form.feature=JSON.parse(this.form.feature)
        }
    },
    //点击删除每一行
    deleteRow(index) {
     this.$confirm('你确定要删除吗✔？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        deltProduct(index.id).then(data => {
        if (data.success) {
          this.$message({
            type: "success",
            message: data.message,
            duration: 2000,
            showClose: true,
            onClose: () => {
              //获取列表数据刷新列表
                  pageProduct().then(data => {
                      this.tableData = data;
                    });
            }
          });
        }
      });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
       });
    },  
    //点击修改按钮发送ajax请求！
    editProdcuList(){
       //点击修改按钮发送ajax之前先把数据处理一下对象||数组用JSON.stringify转换字符串
        if(this.form.feature){
          this.form.feature=JSON.stringify(this.form.feature)
        }
       //处理回填后的数据
       editProduct(this.form).then(data=>{
           if (data.success) {
          this.$message({
            type: "success",
            message: data.message,
            duration: 1000,
            showClose: true,
            onClose: () => {
              //关闭窗口
              this.dialogFormVisible = false;
              //提示成功,在调一次列表 刷新页面
                pageProduct().then(data => {
              this.tableData = data;
              });
            }
          });
        } else {
          this.$message.error(data.message);
        }
       });
    },
    //点击查询
    query(){
      //发送ajax获取数据
        searchProduct(this.searchform).then(data=>{
              this.tableData=data;
        })
    },
    //重置按钮
    reset(searchform){
      this.$refs[searchform].resetFields();
    },
    //分页事件
    handleSizeChange(val){
      //点击加一页
        this.page.pageSize=val;
        this.page.currentPage=1;
    },
    handleCurrentChange(val){//当前页切换
         this.page.currentPage=val;
         pageProduct(this.page).then(data=>{
                //更新行数据
                this.tableData=data.data;
                //更新总数据
                this.page.total=data.total;
         })
    }

  },
  //生命周期创建完成后
  created() {
    //发送ajax获取商品管理列表
    pageProduct(this.page).then(data => {
      this.tableData = data.data;
      this.page.total=data.total
    });
  },
  filters: {
    fordata(v){
        return moment(v).format('YYYY-MM-DD hh:mm:ss');
    }
  }
};
</script>

<style lang="less" scoped>
.prodcut-list {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>