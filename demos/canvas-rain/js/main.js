(function($) {
  $(function() {
    var main = function(selector, direction) {
      var $element = $(selector),
        context = $element[0].getContext("2d"),
        maxWidth = $(window).width(), //misc.maxViewWidth(), 用于取得屏幕的宽
        maxHeight = $(window).height() //misc.maxViewHeight(); 用于取得屏幕的高

      $element.attr({width: maxWidth, height: maxHeight })

      var number = 5e3, //制造雨点的数量
        isSkew = 1,  //雨点的运动轨迹倾斜时，值为1；雨点垂直落下，值为0
        rainArray = [], //雨点对象的数组
        animate = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

      function CreateRain(opacity, speed, xPosition, yPosition) {
        this.speed = speed      // 5 < speed < 10
        this.xPos = xPosition   // maxWidth <= xPosition <= 2 * maxWidth
        this.yPos = yPosition   // -2*maxHeight - 50 <= yPosition <= -50
        this.opacity = -0.03 + opacity / 10  //0.07 < opacity <= 0.97
        this.counter = 0
        // this.time = 0
        this.color = null
      }

      //更新雨点对象的位置
      CreateRain.prototype.update = function() {
        this.counter += this.speed
        // context.fillStyle = "rgba(255, 255, 255," + this.opacity.toFixed(2) + ")"
        if (this.yPos + this.counter > maxHeight) { //如果雨点的位置超出y轴，那么重置雨点位置
          // this.time += 100
          this.color = `rgba(${Math.round(255 * Math.random())}, ${Math.round(255 * Math.random())}, ${Math.round(255 * Math.random())},${this.opacity.toFixed(2)})`
          this.xPos = Math.round(Math.random() * maxWidth * isSkew + maxWidth)  // xPos >= maxWidth
          if(direction === "right"){
            this.xPos = -1 * Math.round(Math.random() * maxWidth * isSkew + 25) //-25-maxWidth <= xPos <= -25
          }else if(direction !== "left"){
            this.xPos = Math.round(Math.random() * maxWidth + 1) //1 <= xPosition <= maxWidth
          }
          this.yPos = -1 * Math.round(Math.random() * maxHeight * 2 + 1)  //-1-2*maxHeight <= yPosition <= -1
          this.counter = 0
        }

        if (!this.color){
          this.color = `rgba(${Math.round(255 * Math.random())}, ${Math.round(255 * Math.random())}, ${Math.round(255 * Math.random())},${this.opacity.toFixed(2)})`
        }

        //开始画图
        context.beginPath()
        if (direction === "left") {
          drawCurve(this, -1, 7, 10, 11, 5)
        } else if (direction === "right") {
          drawCurve(this, 1, 7, 10, 11, 5)
        } else {
          isSkew = 0
          drawCurve(this, 1, 0, 15, 3, 20)
        }
        context.fillStyle = this.color
        context.fill()
        //结束画图
      }

      function drawCurve(rain, leftToRight, x1, y1, x2, y2) { //-1, 7, 10, 11, 5
        //雨点的位置
        context.moveTo(rain.xPos + rain.counter * isSkew * leftToRight, rain.yPos + rain.counter) //xPos + counter, yPos + counter

        //画出点滴形状
        context.bezierCurveTo(
          rain.xPos + rain.counter * isSkew * leftToRight + x1 * leftToRight, //xPos + counter + 7
          rain.yPos + rain.counter + y1,  //yPos + counter + 10
          rain.xPos + rain.counter * isSkew * leftToRight + x2 * leftToRight, //xPos + counter + 11
          rain.yPos + rain.counter + y2, //yPos + counter + 5
          rain.xPos + rain.counter * isSkew * leftToRight, //xPos + counter
          rain.yPos + rain.counter //yPos + counter
          )
      }

      function init() {
        for (var i = 0; number > i; i++) {
          var xPosition = Math.round(Math.random() * maxWidth * isSkew + maxWidth); //maxWidth <= xPosition <= 2 * maxWidth
          if(direction === "right"){
            xPosition *= -1 //雨点从左向右运动，那么 xPos 为负值
          }else if(direction !== "left"){
            xPosition = Math.round(Math.random() * maxWidth * isSkew + 1)  // 1 =< xPosition <= maxWidth + 1
          }
          var yPosition = -1 * Math.round(Math.random() * maxHeight * 2 + 50), // -2*maxHeight - 50 =< yPosition <= -50
            // speed = 5 + 5 * Math.random(),                                    // 5 < speed < 10
            speed = 3 + 3 * Math.random(),                                    // 5 < speed < 10
            opacity = Math.floor(10 * Math.random() + 1)                      // 1 < opacity <= 10
          rainArray.push(new CreateRain(opacity, speed, xPosition, yPosition))
        }
        draw()
      }

      // var n = 0
      function draw() {
        context.clearRect(0, 0, maxWidth, maxHeight);
        for (var i = 0; i < rainArray.length; i++){
          rainArray[i].update();
        }
        // if(n < 100)
        //定时更新画布
        animate(draw)
        // n++
      }

      init()
    };
    main("#rain_canvas", "left") //画布id， 雨点从右向左运动
  })
})(jQuery)
