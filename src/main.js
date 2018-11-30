// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import MyHttpServer from '@/plugins/http.js';
// MyBread其实是组件选项所在的对象{template:'',data等}
import MyBread from '@/components/common/myBread.vue'
import moment from 'moment'


import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'
Vue.use(ElementUI);
Vue.use(MyHttpServer);

Vue.config.productionTip = false;
// 全局过滤器--日期格式
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
});
// 自定义全局组件--面包屑
Vue.component(MyBread.name, MyBread);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});


