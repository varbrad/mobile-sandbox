const Chart = require('chart.js')

var chart = {
  template: `<div>
    <canvas class="chart full-size" height="400px"></canvas>
  </div>`,
  data: function () {
    return {
      watcher: null,
      chart: null,
      n: 1
    }
  },
  methods: {
    newPoint: function (x, y, z, movement) {
      if (this.chart.data.labels.length >= 100) {
        this.chart.data.labels.shift()
        this.chart.data.datasets[0].data.shift()
        this.chart.data.datasets[1].data.shift()
        this.chart.data.datasets[2].data.shift()
        this.chart.data.datasets[3].data.shift()
      }
      this.chart.data.labels.push(this.n)
      this.chart.data.datasets[0].data.push(x)
      this.chart.data.datasets[1].data.push(y)
      this.chart.data.datasets[2].data.push(z)
      this.chart.data.datasets[3].data.push(movement)
      this.chart.update()
      this.n++
    }
  },
  mounted: function () {
    // Size canvas
    this.chart = new Chart(document.querySelector('.chart').getContext('2d'), {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'X',
          data: [],
          lineTension: 0,
          fill: false,
          pointRadius: 0,
          spanGaps: true,
          borderColor: 'rgba(255, 0, 0, .5)'
        },{
          label: 'Y',
          data: [],
          lineTension: 0,
          fill: false,
          pointRadius: 0,
          spanGaps: true,
          borderColor: 'rgba(0, 255, 0, .5)'
        },{
          label: 'Z',
          data: [],
          lineTension: 0,
          fill: false,
          pointRadius: 0,
          spanGaps: true,
          borderColor: 'rgba(0, 0, 255, .5)'
        },{
          label: 'Movement',
          data: [],
          lineTension: 0,
          fill: false,
          pointRadius: 0,
          spanGaps: true,
          borderColor: 'black'
        }]
      }
    })

    // Accel watcher
    if (navigator.accelerometer) {
      this.watcher = navigator.accelerometer.watchAcceleration((a) => {
        this.newPoint(a.x, a.y, a.z, Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z) - 9.81)
      }, (e) => {
        console.log(e)
      }, {
        frequency: 10
      })
    } else {
      this.accel.x = 'Accelerometer not supported'
    }
  },
  beforeDestroy: function () {
    if (this.watcher) {
      navigator.accelerometer.clearWatch(this.watcher)
      this.watcher = null
    }
  }
}

module.exports = chart