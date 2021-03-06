import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import Dayjs from 'vue-dayjs'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy);
Vue.config.productionTip = false;
Vue.use(Dayjs);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
