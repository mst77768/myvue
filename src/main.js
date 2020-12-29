import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Echarts from 'echarts'


Vue.config.productionTip = false
Vue.use(Echarts)

Vue.prototype.$echarts = Echarts
Vue.use(ViewUI);//使用iviewul

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')