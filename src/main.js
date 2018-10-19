import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import login from './views/login.vue'
import router from './router'
import store from './store'
import './icons/iconfont.css'
import './styles/reset.css'
import axios from 'axios'
import qs from 'qs'
import "./permission"

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
