import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import ViewUI from 'view-design';
Vue.use(ViewUI);

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/index.vue'),
    redirect: "/login", //重定向到这个航次分析页面
    children: [{
      path: "voyagetable",
      component: () => import("../views/sample/voyage.vue")
      // 航次效益分析页面
    }, {
      path: "voyageLook", //二级路由数据显示分析页面的路由定位
      component: () => import("../views/sample/voyageLook.vue")
    }, {
      path: "contribution", //贡献度分析页面的定位路由！
      component: () => import("../views/sample/contribution.vue")
    }, {
      path: "Trintyhouse", //海务输入表页面的路由定位
      component: () => import("../views/sample/TrinityHouse.vue")
    }, {
      path: "TrinHousePage", //海务输入页面的路由定位
      component: () => import("../views/sample/TrinHousePage.vue")

    }, {
      path: "huiyi", //会议页面
      component: () => import("../views/work/huiyi.vue")
    }, {
      path: "rlzz", //热力追踪页面
      component: () => import("../views/work/rlzz.vue")
    },{
      path:"database",//数据采集页面
      component:()=>import("../views/databasepage/database.vue")
    },{
      path:"iframe",//嵌入页面
      component:()=>import("../views/databasepage/iframe.vue")
    }] 
  },
  // 下面都是一级路由
  {
    path: "/addhuiyi", //执行力跟踪的添加单独页面路由
    component: () => import("../views/oneself-Page/conference.vue")
  }, {
    path: "/wenjian", //管理员查看附件的单独页面路由
    component: () => import("../views/oneself-Page/wenjian.vue")
  }, {
    path: "/adwenjian", //添加会议报告单独页面的路由
    component: () => import("../views/oneself-Page/addhuiyi.vue")
  }, {
    path: "/person", //选择参会人员的页面的路由
    component: () => import("../views/oneself-Page/person.vue")
  }, {
    path: "/fankui", //管理员查看附件的反馈页面路由
    component: () => import("../views/oneself-Page/wenjian2.vue")
  }, {
    path: "/readhuiyi", //动态路由的查看会议的页面路由
    component: () => import("../views/oneself-Page/readhuiyi.vue")
  }, {
    path: "/readyuedu", //查看月度会议的页面路由
    component: () => import("../views/oneself-Page/readyuedu.vue")
  },{
    path:"/login",//登录页面的接口
    component:()=>import("../views/login/login.vue")
  },{
     path:"/pertale",//确认人员记录页面
     component:()=>import("../views/oneself-Page/pertable.vue")
  },{
    path:"/updatehuiyi",//修改周例会页面
    component:()=>import("../views/oneself-Page/updatezou.vue")
  },{
    path:"/updateyue",//修改月度会议的页面
    component:()=>import("../views/oneself-Page/updateyue.vue")
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
