import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Fenlei = () => import('../views/category/Fenlei.vue')
const Shop = () => import('../views/shopcar/Shop.vue')
const User = () => import('../views/profile/User.vue')
const Detail = () => import('../views/detail/Detail.vue')

const routes = [
  {
    path : '/home',
    name : 'Home',
    meta : {
      keepAlive : true
    },
    component : Home
  },
  {
    path : '/fenlei',
    name : 'Fenlei',
    meta : {
      keepAlive : true
    },
    component : Fenlei
  },
  {
    path : '/shop',
    name : 'Shop',
    meta : {
      keepAlive : true
    },
    component : Shop
  },
  {
    path : '/user',
    name : 'User',
    meta : {
      keepAlive : true
    },
    component : User
  }, 
  {
    path : '/detail/:iid',
    name : 'Detail',
    meta : {
      keepAlive : false
    },
    component : Detail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes
})

export default router
