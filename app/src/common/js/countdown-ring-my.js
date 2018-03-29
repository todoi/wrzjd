// 画布倒计时
// 参数对象{canvasId, numberId, borderWidth, radius, time, interval, callback}
//canvasId 画布节点id
// numberId 数值节点id
// borderWidth 边框的宽度
// radius 圆的半径，不包括边框
// time 是总共时间，单位为毫秒
// interval 刷新画布的间隔时间，越小画布刷新的越快
// callback 时间走完调用的函数


function CountDownRing(opts) {
  var canvas = document.getElementById(opts.canvasId) //element
  this.numberNode = document.getElementById(opts.numberId)

  this.borderWidth = opts.borderWidth //px
  this.radius = opts.radius //px
  this.time = opts.time //ms
  this.interval = opts.interval //ms
  this.callback = opts.callback

  this.MAX = opts.time / 1000 //s
  if (canvas.getContext){
    this.isSupport = true
    this.context = canvas.getContext('2d')
    this.context.textAlign = 'center'
  }
  canvas.setAttribute('width', (this.radius + this.borderWidth) * 2)
  canvas.setAttribute('height', (this.radius + this.borderWidth) * 2)
  this.timer = null
  // this.fontSize = opts.fontSize //px
}

CountDownRing.prototype.go = function (){
  this.time -= this.interval
  if(this.time < 0){
    this.callback()
    return
  }
  this.paint()
  this.timer = window.setTimeout( function (){
    this.go()
  }.bind(this), this.interval)
  return this
}

CountDownRing.prototype.clear = function(x, y) {
  this.context.clearRect(-x, -y, 2 * x, 2 * y)
}

CountDownRing.prototype.paint = function() {
  var x = this.radius + this.borderWidth,
    y = x
  var value = parseFloat(this.time / 1000)
  // var degrees = 360 - (value / this.MAX) * 360.0;
  var endAngle = (value / this.MAX) * 2 * Math.PI

  if (this.isSupport){
    this.context.save()
    this.context.translate(x, y)
    this.clear(x, y)

    // first circle
    this.context.strokeStyle = "rgba(202,170,123,0.2)";
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
    this.context.lineWidth = this.borderWidth;
    this.context.stroke();

    // second circle
    this.context.strokeStyle = "rgba(16, 113, 17, 1)";
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, endAngle, 0);
    this.context.lineWidth = this.borderWidth;
    this.context.stroke();

    // label
    // this.context.fillStyle = "#107111";
    // this.context.font = 'bold ' + this.fontSize + 'px "Microsoft Yahei"'
    // this.context.fillText(Math.floor(value), -10, 10);
    this.context.restore();
  }

  this.numberNode.innerText = Math.ceil(value)
}

CountDownRing.prototype.restart = function(){
  this.time = this.MAX * 1000
  return this
}

CountDownRing.prototype.stop = function(){
  window.clearTimeout(this.timer)
}


