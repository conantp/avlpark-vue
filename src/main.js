import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';
import store from './store';


// var TWEEN = require("@tweenjs/tween.js");

import 'bulma/css/bulma.css';

// Vue.use(VueSocketio, io('http://localhost:5001'), { store });
Vue.use(VueSocketio, io('https://data.avlpark.com'), { store });
// import "bulma/sass/bulma.sass";

Vue.use(VueAnalytics, {
  id: 'UA-38567004-3',
  router,
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
