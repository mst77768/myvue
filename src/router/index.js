import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/index'),
    redirect: "voyagetable", //重定向到这个航次分析页面
    children: [{
      path: "voyagetable",
      component:()=> import("../views/sample/voyage")
      // 航次效益分析页面
    }]
  },

];

const router = new VueRouter({
  routes,
});

export default router;
