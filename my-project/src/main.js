import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'

//开启debug模式
Vue.config.debug = true

Vue.use(VueRouter)
Vue.use(VueResource)

// 定义组件, 也可以像教程之前教的方法从别的文件引入
import content from './components/content.vue'
import home from './components/home.vue'
import category from './components/category.vue'
import shoppingTrolley from './components/shopping-trolley.vue'
import myaccount from './components/myaccount.vue'
import productDetails from './components/product-details.vue'
import allOrder from './components/all-order.vue'
import collect from './components/collect.vue'
import login from './components/login.vue'
import enterprise from './components/enterprise.vue'

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '',
            component: content
        }, {
            path: '/login',
            component: login
        },{
            path: '/content',
            component: content,
            children: [{
                path: '',
                component: home
            }, {
                path: 'home',
                component: home
            }, {
                path: 'category',
                component: category
            }, {
                path: 'shopping-trolley',
                component: shoppingTrolley
            }, {
                path: 'myaccount',
                component: myaccount
            }, {
                path: 'product-details/:detailId',
                name: 'productDetails',
                component: productDetails
            }, {
                path: 'all-order',
                component: allOrder
            }, {
                path: 'collect',
                component: collect
            }, {
                path: 'enterprise',
                component: enterprise
            }]
        }
    ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')



