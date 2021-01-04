import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

// 定义路由规则
const routes = [
  { path: '/list/:id', component: List },
  { path: '/detail/:id', component: Detail },
  { path: '*', component: Home }
]

// 定义路由
export default new VueRouter({ routes })
