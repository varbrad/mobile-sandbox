require('./css/style.scss')

const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

const vm = new Vue({
  data: {
    accel: {
      x: 0,
      y: 0,
      z: 0,
      sum: 0,
      timestamp: null
    }
  },
  router: new VueRouter({
    routes: [
      { path: '/', redirect: '/accel' },
      { path: '/accel', component: require('./routes/accel') },
      { path: '/chart', component: require('./routes/chart') }
    ]
  })
})

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    vm.$mount('#app')
    console.log('Device Ready')
  })
} else {
  vm.$mount('#app')
}
