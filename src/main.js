import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import plugin from 'components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue ()

// 安装插件
Vue.use(plugin)

// 解决移动端300mm延迟
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
