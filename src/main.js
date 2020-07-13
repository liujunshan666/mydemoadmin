import Vue from 'vue'//引入Vue组件
import App from './App.vue'//引入APP顶级组件
import router from './router'//引入路由组件

import ElementUI from 'element-ui';//引入element组件
import 'element-ui/lib/theme-chalk/index.css';//引入element样式组件


import 'normalize.css';//引入重置样式组件

import '@/assets/styles/common.less';//引入全局样式

import '@/assets/font_scpcciq5q0e/iconfont.css'//引入阿里巴巴矢量图

import echarts from 'echarts'//引入echarts组件

Vue.prototype.$echarts=echarts//注册到全局 注意：一般不会直接写prototype

Vue.use(ElementUI);//注册elementUI到全局

Vue.config.productionTip = false//是否开启生产模式的提示(少一些优化之类的提示看起烦)

new Vue({
  router,//配置路由
  render: h => h(App)//渲染APP组件
}).$mount('#app')//挂载视图，(把Vue内部生产的视图内容,渲染到index.html的id为app的元素中)
