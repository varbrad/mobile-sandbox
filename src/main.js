require('./style.scss')

const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

const backendless = require('backendless')
backendless.initApp(
  '4BAFC2A3-01EC-749A-FF8C-BF60D9AA5B00',
  '32E2B58E-6CD4-EE24-FF55-2C0D7426CC00',
  'v1'
)

const moment = require('moment')

function Tasks (name) {
  this.name = name
  this.completed = false
}

const vm = new Vue({
  data: {
    tasks: [],
    newTask: '',
    filter: 'all'
  },
  methods: {
    submitTask: function () {
      let o = new Tasks(this.newTask)
      backendless.Persistence.of(Tasks).save(o)
      this.loadTasks()
      this.newTask = ''
    },
    modifyTask: function (task) {
      task.completed = !task.completed
      backendless.Persistence.of(Tasks).save(task)
    },
    deleteTask: function (task) {
      backendless.Persistence.of(Tasks).remove(task)
      this.loadTasks()
    },
    loadTasks: function () {
      let query = new backendless.DataQuery()
      switch (this.filter) {
        case 'true': query.condition = 'completed = true'; break
        case 'false': query.condition = 'completed = false'; break
      }
      query.options = {
        sortBy: ['name ASC'],
        pageSize: 50
      }
      this.tasks = backendless.Persistence.of(Tasks).find(query).data
    },
    setFilter: function (filter) {
      this.filter = filter
      this.loadTasks()
    },
    formatedDate: function (timestamp) {
      return moment(timestamp).fromNow()
    }
  },
  mounted: function () {
    this.loadTasks()
  }
})

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    vm.$mount('#app')
    console.log('Device Ready')
  })
} else {
  vm.$mount('#app')
}
