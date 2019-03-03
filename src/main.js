import Vue from 'vue'
import App from './App.vue'

// 1.引入element-ui
import ElementUI from 'element-ui';
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// 3.全局注册组件
Vue.use(ElementUI);


Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  el: "#app",
  render: function (createElement) {
        return createElement(App);
  },
})

