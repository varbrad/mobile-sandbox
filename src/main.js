// const Vue = require('vue')

var p = {
  data: 5,
  c: function (v) {
    let a = v * this.data
    let k = (n) => { return this.data * n }
    return k(a)
  }
}

console.log(p.c(10))

class Info {
  constructor () {
    this.data = 123
  }
  print () {
    console.log(this.data)
  }
}

var i = new Info()
i.print()

var a = `super dooper trooajper: ${i.data}`

console.log(a)

console.log('promise')

function timeout(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

var timer = timeout(1000).then(() => {
  console.log('timer1')
  return timeout(2000)
}).then(() => {
  console.log('timer2')
  throw new Error('hmmm')
}).catch(err => {
  console.log(err)
  return Promise.all([timeout(100), timeout(1200)]).then(values => {
    console.log('woop!')
  })
})

console.log('es2015 now works, yay!')
