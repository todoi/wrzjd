(function($) {
  $(function() {
    var main = function(selector, c) {
      var $element = $(selector),
        context = $element[0].getContext("2d"),
        maxWidth = 1020, //misc.maxViewWidth(), 用于取得屏幕的宽
        g = 900 //misc.maxViewHeight(); 用于取得屏幕的高
      $element.attr({
        width: maxWidth,
        height: g
      });
      var l, h = 5e3,
        i = 1,
        c = "left",
        j = [],
        k = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

      function Init(opacity, speed, xPosition, yPosition) {
        this.speed = speed
        this.xPos = xPosition
        this.yPos = yPosition
        this.opacity = -0.03 + opacity / 10
        this.counter = 0
      }

      Init.prototype.update = function() {
        this.counter += this.speed
        if (this.yPos + this.counter > g) {
          this.xPos = Math.round(Math.random() * maxWidth * i + maxWidth)
          if(c === "right"){
            this.xPos = -1 * Math.round(Math.random() * maxWidth * i + 25)
          }else if(c !== "left"){
            this.xPos = Math.round(Math.random() * maxWidth + 1)
          }
          this.yPos = -1 * Math.round(Math.random() * g * 2 + 1)
          this.counter = 0
        }
        context.beginPath()
        if (c === "left") {
          n(this, -1, 7, 10, 11, 5)
        } else if (c === "right") {
          n(this, 1, 7, 10, 11, 5)
        } else {
          i = 0
          n(this, 1, 0, 15, 3, 20)
        }
        context.fillStyle = "rgba(255, 255, 255," + this.opacity.toFixed(2) + ")"
        context.fill()
      }

      function n(a, b, c, d, f, g) {
        context.moveTo(a.xPos + a.counter * i * b, a.yPos + a.counter)
        context.bezierCurveTo(
          a.xPos + a.counter * i * b + c * b,
          a.yPos + a.counter + d,
          a.xPos + a.counter * i * b + f * b,
          a.yPos + a.counter + g,
          a.xPos + a.counter * i * b,
          a.yPos + a.counter)
      }

      function o() {
        for (var a = 0; h > a; a++) {
          var xPosition = Math.round(Math.random() * maxWidth * i + maxWidth);
          if(c === "right"){
            xPosition *= -1
          }else if(c !== "left"){
            xPosition = Math.round(Math.random() * maxWidth * i + 1)
          }
          var yPosition = -1 * Math.round(Math.random() * g * 2 + 50),
            speed = 5 + 5 * Math.random(),
            opacity = Math.floor(10 * Math.random() + 1)
          j.push(new Init(opacity, speed, xPosition, yPosition))
        }
        p()
      }

      function p() {
        context.clearRect(0, 0, maxWidth, g);
        for (var a = 0; a < j.length; a++)
          j[a].update();
        l = k(p)
      }

      o()
    };
    main("#rain_canvas", "left")
  })
})(jQuery)
