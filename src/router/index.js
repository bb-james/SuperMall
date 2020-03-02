import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../views/Home/Home')
const detail = () => import('../views/Home/detail/detail')
const about =() =>  import('../views/About/About')
const cart = () => import('../views/Cart/cart')
const profile = () => import('../views/Profile/Profile')
const login = () => import('../views/Profile/profilechild/Login')



Vue.use(VueRouter)

const routes = [
  
    {
      path:'/home',
      component: home     
    },
    {
      path:'/about',
      component: about      
    },
    {
      path:'/cart',
      component: cart      
    },
    {
      path:'/profile',
      component: profile     
    },
      {
      path:'/detail/:id',
      component: detail
      },
    {
      path:'/login',
      component: login
    },
    {
      path:'/',
      redirect: '/home' 
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
