import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Rec from "../components/home/Rec";
import Singer from "../components/home/Singer";
import Rank from "../components/home/Rank";
import store from "../store/index";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/rec",
    component: Home,
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
    path: "/singerSongs/:id",
    name: "singerSongs",
    component: () => import("../views/SingerSongs"),
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


export default router;
