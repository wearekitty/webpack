{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import '@/assets/scss/index.scss'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import retina from 'retinajs'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import VueRetina from 'vue-retina'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#vuex}}
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import store from '@/../store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}

import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import router from './router'
{{/router}}

Vue.config.productionTip = false

{{#vuex}}
Vue.use(Vuex);
{{/vuex}}
Vue.use(VueRetina, { retina });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#vuex}}
  store,
  {{/vuex}}
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
