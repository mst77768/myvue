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
    }, {
      path: "TrinHousePage", //海务输入页面的路由定位
      component: () => import("../views/sample/TrinHousePage")

    }, {
      path: "huiyi", //会议页面
      component: () => import("../views/work/huiyi")
    }, {
      path: "rlzz", //热力追踪页面
      component: () => import("../views/work/rlzz")
    },{
      path:"database",//数据采集页面
      component:()=>import("../views/databasepage/database")
    }]
  },
  {
    path: "/addhuiyi", //执行力跟踪的添加单独页面路由
    component: () => import("../views/oneself-Page/conference")
  }, {
    path: "/wenjian", //管理员查看附件的单独页面路由
    component: () => import("../views/oneself-Page/wenjian")
  }, {
    path: "/adwenjian", //添加会议报告单独页面的路由
    component: () => import("../views/oneself-Page/addhuiyi")
  }, {
    path: "/person", //选择参会人员的页面的路由
    component: () => import("../views/oneself-Page/person")
  }, {
    path: "/fankui", //管理员查看附件的反馈页面路由
    component: () => import("../views/oneself-Page/wenjian2")
  }, {
    path: "/readhuiyi", //动态路由的查看会议的页面路由
    component: () => import("../views/oneself-Page/readhuiyi")
  }, {
    path: "/readyuedu", //查看月度会议的页面路由
    component: () => import("../views/oneself-Page/readyuedu.vue")
  }

];

const router = new VueRouter({
  routes,
});

export default router;
router.beforeEach((to, from, next) => { //路由守卫
  ViewUI.LoadingBar.start();
  next();
});

router.afterEach(route => {
  console.log(route)
  ViewUI.LoadingBar.finish();
});
