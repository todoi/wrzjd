;(function($) {
    var defaults = {
      number: 50,
      imgPathName: cdnpath+"/mobile/images/yfwc/",
      imgName: "redbag",
      imgType: ".png",
      // imgNumber: 2, // 1 ~ 10 包括1 不包括10
      step: null,
      completed: null
    }
    var winHeight, winWidth

    $.fn.extend({
      dropRedBag: function(options) {
        $('#petalbox').html('')
        winHeight = $('#petalbox').height() + 150
        winWidth = $('#petalbox').width() + 150

        var opts = $.extend({}, defaults, options),
          NUMBER_OF_REDBAG = opts.number, //红包的个数
          imgPathName = opts.imgPathName,
          imgName = opts.imgName,
          imgType = opts.imgType,
          imgNumber = opts.imgNumber,
          step = opts.step,
          completed = opts.completed

        return this.each(function() {
          main()
        })

        function main() {
          var $container = $('#petalbox'); //红包容器
          $container.show()
          try {
            for (var i = 0; i < NUMBER_OF_REDBAG; i++) {
              $container.append(createARedbag()); //添加红包
            }
            window.setTimeout(function(){
              //红包下落过程中
              step()
            }, 1500)
            window.setTimeout(function(){
              //红包下落已经完成
              completed()
            }, 4000)
          } catch (e) {
            console.log(e)
          }
        }

        //从low 和 high 中截取一个随机整数，大于等于low 且小于high
        function randomInteger(low, high) {
          return low + Math.floor(Math.random() * (high - low));
        }

        //从low 和 high 中截取一个随机浮点数，大于等于low 且小于high
        function randomFloat(low, high) {
          return low + Math.random() * (high - low);
        }

        function createARedbag() {
          var $redbagDiv = $('<div></div>')
          var image = document.createElement('img');
          // image.src = imgPathName + imgName + randomInteger(1, imgNumber) + '.' + imgType; //图片地址
          image.src = imgPathName + imgName + imgType; //图片地址
          image.width = randomInteger(60, 30) //红包大小
          $redbagDiv.append(image);

          //红包下落的位置
          $redbagDiv.css({
            'top': randomInteger(-200, -100) + 'px',
            'left': randomInteger(10, winWidth) + 'px'
          })

          animateRedbag($redbagDiv)
          return $redbagDiv;
        }

        function animateRedbag(element) {
          var $element = $(element)
          /* 随机下落时间 从开始到结束的时间*/
          var fadeAndDropDuration = randomFloat(1000, 3000);
          /* 随机旋转时间 从开始到结束的时间*/
          var spinDuration = randomFloat(2000, 3000);
          // 随机delay时间
          var redbagDelay = randomFloat(0, 2000);
          //旋转的角度 -45deg ~ 45deg
          var rot = parseInt(Math.random() * 270 - 135);
          setTimeout(function() {
            $element.animate({
              opacity: 0.95,
              top: winHeight
            }, fadeAndDropDuration)
            $element.rotate({
              angle: 0,
              animateTo: rot,
              duration: spinDuration,
              easing: $.easing.easeInOutElastic
            })
          }, redbagDelay)
        }
      }
    })
  })(window.jQuery)
