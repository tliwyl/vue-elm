// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Vuex from 'vuex';
import vueResource from 'vue-resource';
import App from '@/App';
import router from '@/router';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import store from '@/vuex/store';
import '@/common/styl/index.styl';

Vue.use(vueResource);
Vue.component('cartcontrol', cartcontrol);
// Vue.use(Vuex);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: {App}
});
router.replace('/goods');
