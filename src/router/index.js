import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Rec from "../components/home/Rec";
import Singer from "../components/home/Singer";
import Rank from "../components/home/Rank";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/rec",
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log(from);
      next();
    },
    children: [
      {
        path: "rec",
        component: Rec,
      },
      {
        path: "singer",
        component: Singer,
      },
      {
        path: "rank",
        component: Rank,
      },
    ],
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search"),
  },
  {
    path: "/playList/:id",
    name: "PlayList",
    component: () => import("../views/PlayList"),
  },
  {
    path: "/play",
    name: "Play",
    component: () => import("../views/Play"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/play") {
    setTimeout(() => {
      store.state.fixShow = false
      // store.state.animationStatus.name = 'playing'
    })
  } else {
    // store.state.animationStatus.name = 'in'

  }
  if (from.path === "/play") {
    setTimeout(() => {
      store.state.fixShow = true
      // store.state.animationStatus.name = 'playing'

    }, 0);
  } else {
    // store.state.animationStatus.name = 'in'

  }
  next();
});

export default router;
