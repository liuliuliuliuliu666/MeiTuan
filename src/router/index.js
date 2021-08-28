import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

// 定义路由规则
const routes = [
  { path: '/list/:id', component: List },
  { path: '/detail/:id', component: Detail },
  { path: '/Home', component: Home },
  { path: '*', component: Login }
]

// 定义路由
export default new VueRouter({ routes })
