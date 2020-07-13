import Vue from 'vue'//引入vue组件
import VueRouter from 'vue-router'//引入vue-router路由组件
// import Home from '../views/Home.vue'

Vue.use(VueRouter)//注册路由组件到全局

//配置路线,创建路由
const routes = [
    {
      //根路径的重定向，作用:一打开定位到的位置
      path:'/',
      redirect:'login'
    },
    {
      path:'/login',
      name:'login',
      //路由级别的代码分解
      //为这个路由生成一个单独的块(大约。[hash].js)
      //当访问该路由时，它是"惰性加载"的。
      component:()=>import('@/views/Login.vue')
    },

    {
      path:'/home',//hash地址
      name:'home',//可以通过别名找到
      meta:{
        //需要验证的标识
          requiresAuth:true,
      },
      component:()=>import('@/views/Home.vue')//访问path加载的 路径地址
      ,children:[
          {
            path:'dashbroad',//首页
            name:'dashbroad',
            meta:{requiresAuth:true},
            component:()=>import('@/views/Dashbroad/Dashbroad.vue'),//访问path加载的 路径地址
          },
          {
            path:'personage',//个人中心
            meta:{
              requiresAuth:true,
              title:'个人中心'
            },
            component:()=>import('@/views/Dashbroad/Personage.vue'),//访问path加载的 路径地址
          },
          {
            path:'producttype-list',//商品分类管理列表
            name:'title',
            meta:{requiresAuth:true,title:'商品分类列表'},
            component:()=>import('@/views/ProductType/ProductTypeList.vue'),//访问path加载的 路径地址
          },
          {
            path:'productyype-add',//商品分类管理添加
            meta:{requiresAuth:true,title:'商品分类添加'},
            component:()=>import('@/views/ProductType/ProductTypeAdd.vue'),//访问path加载的 路径地址
          },
          {
            path:'prodcut-list',//商品管理列表
            meta:{requiresAuth:true,title:'商品管理列表'},
            component:()=>import('@/views/Product/ProdcutList.vue'),//访问path加载的 路径地址
          },
          {
            path:'prodcut-add',//商品管理添加
            meta:{requiresAuth:true,title:'商品分类列表'},
            component:()=>import('@/views/Product/ProdcutAdd.vue'),//访问path加载的 路径地址
          },
          {
            path:'account-list',  //帐号列表
            meta:{requiresAuth:true,title:'帐号列表'},
            component:()=>import('@/views/Account/AccountList.vue'),//访问path加载的 路径地址
          },
          {
            path:'account-add',   //帐号添加
            meta:{requiresAuth:true,title:'帐号添加'},
            component:()=>import('@/views/Account/AccountAdd.vue'),//访问path加载的 路径地址
          },
          {
            path:'account-alter',   //修改密码
            meta:{requiresAuth:true,title:'修改密码'},
            component:()=>import('@/views/Account/AccountAlter.vue'),//访问path加载的 路径地址
          },
          {
            path:'statistics-report',   //统计管理1.销售统计
            meta:{requiresAuth:true,title:'销售统计'},
            component:()=>import('@/views/Report/StatisticsReport.vue'),//访问path加载的 路径地址
          },
          {
            path:'sales-report',   //修改密码2.进货统计
            meta:{requiresAuth:true,title:'进货统计'},
            component:()=>import('@/views/Report/SalesReport.vue'),//访问path加载的 路径地址
          },
          {
            path:'systemmenu-list',   //菜单管理1.系统菜单管理
            meta:{requiresAuth:true,title:'系统菜单管理'},
            component:()=>import('@/views/SystemMenu/SystemMenuList.vue'),//访问path加载的 路径地址
          },
          {
            path:'systemmenu-add',   //菜单管理2.添加菜单
            meta:{requiresAuth:true,title:'添加菜单'},
            component:()=>import('@/views/SystemMenu/SystemMenuAdd.vue'),//访问path加载的 路径地址
          },
        ]
    },


    //如果地址错误处理
    {
      // 其余错误地址的重定向：输入错误地址默认回到那里
      path:'*',// 除上面配置以外的其他地址，统一指向“/”
      redirect:'/'
    },
]

//根据路线，创建路由
const router = new VueRouter({
  routes
})

//配置路由前置守卫
//1.参数1，to,即将要进入的地址
//2.参数2，from,上一个路由对象
//3.参数3. next,回调函数
 //   next()放行
 //   next('/login')拦截到指定位置
router.beforeEach((to,from,next)=>{
  //根据元素上的requiresAuth标识，对需要验证的内容进来拦截
    if(to.meta.requiresAuth){
        //获取本地存储的token令牌
      const token=localStorage.getItem('token')
      //判断令牌是否有值
            if(token){
              //有就放行
                next()
            }else{
              //没有拦截强制回到登录界面
              next('/login')
            }
    }else{//没有requireAuth的标识拦截直接放行
      next()
    }
})

//导出路由模块
export default router
