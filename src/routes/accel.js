var accel = {
  template: `<div>
    <h3>Accelerometer</h3>
    <p>X: {{ accel.x }}</p>
    <p>Y: {{ accel.y }}</p>
    <p>Z: {{ accel.z }}</p>
    <p>Sum: {{ accel.sum }}</p>
    <p>Timestamp: {{ accel.timestamp }}</p>
  </div>`,
  data: function () {
    return {
      accel: {
        x: 0,
        y: 0,
        z: 0,
        sum: 0,
        timestamp: 0
      },
      watcher: null
    }
  },
  mounted: function () {
    if (navigator.accelerometer) {
      this.watcher = navigator.accelerometer.watchAcceleration((a) => {
        this.accel.x = a.x
        this.accel.y = a.y
        this.accel.z = a.z
        this.accel.sum = Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z)
        this.accel.timestamp = a.timestamp
      }, (e) => {
        console.log(e)
      }, {
        frequency: 500
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

module.exports = accel
