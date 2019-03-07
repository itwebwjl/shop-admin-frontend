import Vue from 'vue'
import App from './App.vue'

// 1.引入element-ui
import ElementUI from 'element-ui';
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// 3.注册组件
Vue.use(ElementUI);

// 引入vue-router 
import VueRouter from 'vue-router';
// 注册组件
Vue.use(VueRouter);
// 引入组件
import Login from "./pages/Login.vue";
import Admin from "./pages/Admin.vue";
import GoodsList from "./pages/goods/GoodsList.vue";
import GoodsAdd from "./pages/goods/GoodsAdd.vue"
import CategoryList from "./pages/category/CategoryList.vue";


// 配置路由
const routes = [
  { path: "/", redirect: "/admin" },
  { path: "/login", component: Login, meta: "登录页" },
  { path: "/admin", component: Admin, meta: "后台首页" ,redirect:"/admin/goods-list",children:[
    {path:"goods-list",component:GoodsList,meta:"商品管理"},
    {path:"category-list",component:CategoryList,meta:"栏目管理"},
    {path:"goods-add",component:GoodsAdd,meta:"商品添加"}
  ]},
]
// 创建路由对象
const router = new VueRouter({ routes })

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://localhost:8899';


new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement(App);
  },
  // 挂载根实例
  router
})

