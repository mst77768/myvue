import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import ViewUI from 'view-design';
Vue.use(ViewUI);

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/index'),
    redirect: "voyagetable", //重定向到这个航次分析页面
    children: [{
      path: "voyagetable",
      component: () => import("../views/sample/voyage")
      // 航次效益分析页面
    }, {
      path: "voyageLook", //二级路由数据显示分析页面的路由定位
      component: () => import("../views/sample/voyageLook")
    }, {
      path: "contribution", //贡献度分析页面的定位路由！
      component: () => import("../views/sample/contribution")
    }, {
      path: "Trintyhouse", //海务输入表页面的路由定位
      component: () => import("../views/sample/TrinityHouse")
    },{
      path:"TrinHousePage",//海务输入页面的路由定位
      component:()=>import("../views/sample/TrinHousePage")

    },{
      path:"huiyi",//会议页面
      component:()=>import("../views/work/huiyi")
    },{
      path:"rlzz",//热力追踪页面
      component:()=>import("../views/work/rlzz")
    }]
  },

];

const router = new VueRouter({
  routes,
});

export default router;
router.beforeEach((to, from, next) => {//路由守卫
  ViewUI.LoadingBar.start();
  next();
});

router.afterEach(route => {
  console.log(route)
  ViewUI.LoadingBar.finish();
});
