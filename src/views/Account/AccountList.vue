<template>
  <div class="accoun-list">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>用户列表</h3>
      </div>
      <!-------搜索框------>
      <el-form :inline="true" :model="sarchForm" ref="sarchForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="sarchForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="sarchForm.role" placeholder="角色">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dosarch">查询</el-button>
          <el-button @click="doRest">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格列表 -->
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="id" label="标号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>

        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.role===1?'超级管理员':'普通管理员'}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="inputtime" label="日期">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.inputtime|fordata}}</span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              slot="reference"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 
          current-page 当前页数
          page-sizes   每页显示个数选择器的选项设置
          page-size    每页显示几条的个数(值必须属于page-sizes)
          layout          
          size-change    点击下一页
          current-change  点击上一页
          total         总条目数
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
    <!-- 编辑对话框 -->
    <!-- 
        visible ： 对话框是否默认可见
    -->
    <el-dialog title="账号修改" :visible.sync="dialogFormVisible  ">
      <el-form
        :model="editAcountForm"
        status-icon
        :rules="rules"
        ref="editAcountForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="帐号" prop="username">
          <el-input v-model="editAcountForm.username"></el-input>
        </el-form-item>
        <!-- 角色信息 -->
        <el-form-item label="用户角色" prop="role">
          <el-select v-model.number="editAcountForm.role" placeholder="请选择">
            <!-- 
                  label ： 下拉框显示的值
                  value ： 下拉框传递的值
            -->
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editForm">修改</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入axios模块
import { editAcount, delAccount ,searchAccount ,pageAccount} from "@/api/account.js";
import moment from "moment";

export default {
  data() {
    return {
      //编辑 表单
      dialogFormVisible: false, //对话框不可见
      editAcountForm: {
        id: "",
        username: "",
        role: ""
      },
      rules: {},
      //列表
      tableData: [
        {
          id: 1,
          name: "王小虎",
          role: "超级管理",
          date: "2016-05-02"
        },
        {
          id: 2,
          name: "李白",
          role: "普通管理",
          date: "2016-05-04"
        },
        {
          id: 3,
          name: "王五",
          role: "普通管理",
          date: "2016-05-01"
        },
        {
          id: 4,
          name: "周公",
          role: "普通管理",
          date: "2016-05-03"
        }
      ],
      //搜索框表单
      sarchForm:{
          uaername:"",
          role:""
      },
      //分页对象
      page:{
          currentPage:1,//当前页
          pageSize:5,//一页显示几条
          total:10//总页数
      }
    };
  },
  methods: {
    //编辑事件
    handleEdit(i, row) {
      //修改对话框的显示状态为true,然后显示对话框
      this.dialogFormVisible = true;
      //点击编辑按钮时,把当前行的数据,更新到form对应的Model表单对象上
      this.editAcountForm = Object.assign({}, row); //拷贝
    },
    //删除事件
    handleDelete(index, row) {
      this.$confirm("你确定是否删除该帐号吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delAccount(row.id).then(data => {
            if (data.success) {
              this.$message({
                type: "success",
                message: data.message,
                duration: 2000,
                showClose: true,
                onClose: () => {
                  //获取列表数据刷新列表
                  pageAccount().then(data => {
                    this.tableData = data;
                  });
                }
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改按钮
    editForm() {
      //发送ajax请求修改账户信息
      editAcount(this.editAcountForm).then(data => {
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
              pageAccount().then(data => {
                this.tableData = data;
              });
            }
          });
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //查询帐号
    dosarch(){
       searchAccount(this.sarchForm).then(data=>this.tableData=data);
    },
    //重置
    doRest(){
      //重置表单
        this.$refs.sarchForm.resetFields();
    },
    //分页的方法
    handleSizeChange(val){//每页长度修改
      //监听每页状态改变赋值给上面定义好的
      this.page.pageSize=val;
      this.page.currentPage=1;
      },

    handleCurrentChange(val){//当前页切换
      this.page.currentPage=val;
      //根据新条件查询页面
      pageAccount(this.page).then(data=>{
          //1.更新行数据
          this.tableData=data.data;
          //2.跟新总数据
          this.total =data.total;
      })
    }
  },
  //ajax数据请求获取帐号列表
  created() {
    pageAccount(this.page).then(pa => {
      //更新表格的数据
      this.tableData = pa.data;
      //更新total
      this.page.total=pa.total;
    });
  },
  //过滤时间
  filters: {
    fordata(v) {
      return moment(v).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.accoun-list {
  .el-card {
    .el-table {
      /deep/.el-table__row--striped td {
        background-color: #ccc;
      }
    }
    .el-pagination {
      margin-top: 30px;
    }
  }
}
</style>