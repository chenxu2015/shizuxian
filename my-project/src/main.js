import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);

// 定义组件, 也可以像教程之前教的方法从别的文件引入
import home from './components/home.vue'
import category from './components/category.vue'
import shoppingTrolley from './components/shopping-trolley.vue'
import myaccount from './components/myaccount.vue'

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
  	{
      path: '',
      component: home
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/category',
      component: category
    },
    {
      path: '/shopping-trolley',
      component: shoppingTrolley
    },
    {
      path: '/myaccount',
      component: myaccount
    }
  ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')