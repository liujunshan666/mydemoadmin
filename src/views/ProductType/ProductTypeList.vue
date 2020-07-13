<template>
  <div>
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>商品分类</span>
      </div>
      <!-- 查询 -->
          <el-form :inline="true" :model="searchform" ref="searchform">
          <el-form-item label="用户名" prop='name'>
            <el-input v-model="searchform.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="qyuersearch">查询</el-button>
            <el-button @click="Doreset('searchform')">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="分类ID"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="order" label="分类序号"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 
        size-change:条数改变
        current-change：页数改变
        -----------------------
        current-page  显示第几页
        page-size  每页显示条数
        total  总条数
       -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
    </el-card>

    <!--------------------------修改数据回填----------------------->
     <el-dialog title="名称修改" :visible.sync="dialogFormVisible">
        <el-form
          :model="Productfrom"
          status-icon
          :rules="rules"
          ref="Productfrom"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类id" prop="id">
            <el-input v-model="Productfrom.id"></el-input>
          </el-form-item>

          <el-form-item label="分类名称" prop="name">
            <el-input v-model="Productfrom.name"></el-input>
          </el-form-item>
          
         <el-form-item label="分类序号" prop="order">
          <el-input-number
            v-model="Productfrom.order"
            controls-position="right"
            :min="1"
            :max="200"
          ></el-input-number>
        </el-form-item>

          <el-form-item label="描述" prop="desc">
            <el-input v-model="Productfrom.desc"></el-input>
          </el-form-item>
          <!-- 按钮 -->
        </el-form>
          <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editForm">修 改</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
         </div>
    </el-dialog>  
  </div>
</template>

<script>
import {pageProdcu,editProdcu,delProdcu,searchProdcu} from '@/api/produccttype.js';
export default {
  data() {
    return {
       order:1,
       //弹出框的数据
      Productfrom:{
        id:"",
        name:'',
        order:"",
        desc:""
      },
       rules:{},
       //弹出框默认隐藏
      dialogFormVisible:false,
      //列表
      tableData: [
        {
          id: "1",
          name: "热销",
          order: "1",
          desc: "热销商品类别"
        },
        {
          id: "2",
          name: "畅销",
          order: "2",
          desc: "咖啡商品类别"
        },
        {
          id: "3",
          name: "快消",
          order: "3",
          desc: "早餐商品类别"
        },
        {
          id: "4",
          name: "倾销",
          order: "4",
          desc: "午餐商品类别"
        },
        {
          id: "5",
          name: "慢销",
          order: "5",
          desc: "洗漱商品类别"
        },
         {
          id: "5",
          name: "慢销",
          order: "5",
          desc: "洗漱商品类别"
        },
         {
          id: "5",
          name: "慢销",
          order: "5",
          desc: "洗漱商品类别"
        },
      ],
      
      //查询
      searchform:{
        name:""
      },
      //分页
      page:{
          currentPage:1,//当前页
          pageSize:5,//一页显示几条
          total:10//总页数
      }
    };
  },
  methods: {
    //1.删除事件
    deleteRow(index) {
      this.$confirm('你确定要删除吗✔？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        delProdcu(index.id).then(data => {
        if (data.success) {
          this.$message({
            type: "success",
            message: data.message,
            duration: 2000,
            showClose: true,
            onClose: () => {
              //获取列表数据刷新列表
              pageProdcu().then(data=>{
                this.tableData=data;
              })
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
     handleEdit(i,row){ 
      //修改对话框的显示状态为true,然后显示对话框
      this.dialogFormVisible=true;
      //点击编辑按钮时,把当前行的数据,更新到form对应的Model表单对象上
      this.Productfrom = Object.assign({},row);
    },

     //2.修改商品类型事件！
    editForm(){
         //发送ajax请求修改账户信息
      editProdcu(this.Productfrom).then(data => {
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
              pageProdcu().then(data=>{
                this.tableData=data;
              })
            }
          });
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //3.商品查询
    qyuersearch(){
      //发送ajax
      searchProdcu(this.searchform).then(data=>{
          this.tableData=data;
      })
    },
    //3.重置按钮
    Doreset(searchform){
      this.$refs[searchform].resetFields();
    },
    //商品分页
    //条数改变监听
    handleSizeChange(val){
          //点击下一页
        this.page.pageSize=val;
      this.page.currentPage=1;
    },
    //页数改变的监听
    handleCurrentChange(val){
        this.page.currentPage=val;
         pageProdcu(this.page).then(data=>{
          //更新行数据
          this.tableData=data.data;
          //跟新总数
          this.page.total=data.total;
      })
    }
  },
  //3.生命周期创建后发送ajax获取商品分类列表
  created () {
     pageProdcu(this.page).then(pa => {
      //更新表格的数据
      this.tableData = pa.data;
      //更新total
      this.page.total=pa.total;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>