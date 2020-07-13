<template>
  <!-- 
        default-active ：当前激活菜单的index
        background-color  : 菜单的背景色
        text-color        : 菜单的文字颜色
        active-text-color : 当前激活菜单的文字颜色（仅支持 hex 格式）
        router: 开启导航路由模式
  -->
  <div class="Left-Menu">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#272930"
      text-color="#C9D4F6"
      active-text-color="#f60"
      router
      unique-opened
    >
      <!-- 
                el-submenu  : 可以展开子集的菜单
                el-menu-item：没有子集的菜单
      -->
      
      <!-- index 唯一标识 -->
      <!-- <el-menu-item index="1"> -->
        <!-- 菜单图标 -->
        <!-- <i class="el-icon-s-home"></i> -->
        <!-- 菜单标题文字 -->
        <!-- <span slot="title">首页</span>
      </el-menu-item> -->

      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          用户管理
        </template>
        <el-menu-item  index="2-1">用户列表</el-menu-item>
        <el-menu-item index="2-2">添加修改</el-menu-item>
      </el-submenu> -->

      <!-- 动态数据添加 -->
        <!-- 头像 -->
        <template v-for="menu in filterList">
                <el-menu-item v-if="!menu.children" :index="menu.index" :key="menu.id">
                <!-- 菜单图标 -->
                <i :class="menu.cls" style="color:#0a0"></i>
                <!-- 菜单文字 -->
                <span slot="title">{{menu.title}}</span>
                </el-menu-item>
                <!-- 有子级的 -->
                <el-submenu v-else :index="menu.index" :key="menu.id">
                <template slot="title">
                    <i :class="menu.cls" style="color:#0a0"></i>
                    {{menu.title}}
                </template>
                  <el-menu-item v-for="item in menu.children" :key="item.index" :index="item.index">
                    {{item.name}}
                    </el-menu-item>
                </el-submenu> 
          </template>
    </el-menu>
  </div>
</template>

<script>
//引入接口
import {getCurrentUserRole} from '@/api/';//默认index.js
//引入图片
import squareUrl from '@/assets/images/sad.jpg';
export default {
  data() {
    return {
      squareUrl:squareUrl,
      menulist: [
        {
          id: 1,
          index: "/home/dashbroad",
          cls: "el-icon-s-home",
          title: "首页",
          role:[1,2]//可访问角色有：超级管理员&普通员工
        },
        {
          id: 2,
          index: "2",
          cls: "el-icon-goods",
          title: "商品分类管理",
          role:[1],//可访问角色有：超级管理员
          children: [
            { index: "/home/producttype-list", name: "商品分类列表" },
            { index: "/home/productyype-add", name: "添加商品分类" }
          ]
        },
        {
          id: 3,
          index: "3",
          cls: "el-icon-s-goods",
          title: "商品管理",
          role:[1,2],
          children: [
            { index: "/home/prodcut-list", name: "商品管理" },
            { index: "/home/prodcut-add", name: "添加管理" }
          ]
        },
        {
          id: 4,
          index: "4",
          cls: "el-icon-s-custom",
          title: "账号管理",//可访问角色有：超级管理员
          role:[1],
          children: [
            { index: "/home/account-list", name: "账号列表" },
            { index: "/home/account-add", name: "增加账号" },
             { index: "/home/account-alter", name: "修改密码" }
          ]
        },
        {
          id: 5,
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          role:[1],//超级管理员
          children: [
            { index: "/home/statistics-report", name: "销售统计" },
            { index: "/home/sales-report", name: "进货统计" }
          ]
        },
        {
          id: 6,
          index: "6",
          cls: "el-icon-s-tools",
          title: "菜单管理",
          role:[1],//超级管理员
          children: [
            { index: "/home/systemmenu-list", name: "菜单管理" },
            { index: "/home/systemmenu-add", name: "添加菜单" }
          ]
        }
      ],
      currentUserRole:2//默认普通员工
    };
  },
  created () {
    //发送ajax传token过去
    getCurrentUserRole().then(data=>{
      //把当前登录用户的角色挂到data中
      this.currentUserRole=data.role;
    })
  },
  computed: {
   filterList(){//过滤后的菜单‘集合’
    //1.准备
        let arr=[];
    //2.处理
      arr = this.menulist.filter((value)=>{
              return value.role.includes(this.currentUserRole)
        })
    //3.结果
     return arr;
   }
  },
};
</script>

<style lang="less" scoped>
.Left-Menu {
  .touxiang{
    display: flex;
    line-height: 40px;
    margin: 10px 20px;
  }
  .el-menu {   
    border-right: 0px;
  }
  /deep/.el-submenu__title {font-size: 13px};
}
</style>