require('./css/style.scss')

const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

const vm = new Vue({
  data: {
    info: 123
  }
})

vm.$mount('#app')
