import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Rec from '../components/home/Rec'
import Singer from '../components/home/Singer'
import Rank from '../components/home/Rank'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name:'Home',
    redirect:'/home/rec',
    component:Home,
    children:[
      {
        path:'rec',
        component:Rec
      },
      {
        path:'singer',
        component:Singer
      },{
        path:'rank',
        component:Rank
      }
    ]
  },
  {
    path:'/search',
    name:'Search',
    component: ()=> import('../views/Search')
  },
  {
    path:'/playList/:id',
    name:'PlayList',
    component: ()=> import('../views/PlayList')
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('../views/Play')
  },
  {
    path:'/demo',
    component: () => import('../views/Demo')
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/play') {
    store.state.songInfo.fixShow = false
  }
  if (from.path === '/play') {
    store.state.songInfo.fixShow = true
  }
  next()
})

export default router
