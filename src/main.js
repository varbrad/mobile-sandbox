const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

const vm = new Vue({

})

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    vm.$mount('#app')
    console.log('Device Ready')
  })
} else {
  vm.$mount('#app')
}
