(function($) {
  //图片次序
  var indexArray = [2, 1, 0, 4, 3]
  //左边较小图片 左边较大图片 中间最大图片 右边较大图片 右边较小图片
  var slideInfo = [{width: 240, height: 130, top: 80, left: 20, zIndex: 4
  }, {width: 320, height: 174, top: 56, left: 110, zIndex: 8
  }, {width: 480, height: 260, top: 0, left: 260, zIndex: 10
  }, {width: 320, height: 174, top: 56, left: 570, zIndex: 6
  }, {width: 240, height: 130, top: 80, left: 740, zIndex: 2 }];
  var defaults = {
    indexArray: indexArray,
    slideInfo: slideInfo
  }
  $.fn.extend({
    slide: function(options) {
      return this.each(function() {
        var opts = $.extend({}, defaults, options),
          $box = $(this),
          $slideContainer = $box.find('#slider-list'), //a 为slider-list
          $dots = $box.find('#btns-arr li'), // c 为小圆点集合 (5个li)
          $slides = $slideContainer.find('li'), //图片容器 (5个li)
          $smallContainer = $box.find('#btns-arr .small'), // 是圆点li 的上一级 ul
          slideLength = $slides.length,
          indexNow = 0, //iNow 为 index now
          copyArr = [], //用于copy slideInfo 数组
          clock = null //定时器
        indexArray = opts.indexArray
        slideInfo = opts.slideInfo

        function doMove(element, styleObject, cb) {
          var currentDifferTarget,
            currentValue = 0,
            isEqual = true
          for (var styleName in styleObject) {
            currentValue = styleName === "opacity" ? window.parseInt(100 * parseFloat($(element).css("opacity"))) : window.parseInt($(element).css(styleName));
            isNaN(currentValue) && (currentValue = 0);
            currentDifferTarget = navigator.userAgent.indexOf("MSIE 8.0") > 0 ? (styleObject[styleName] - currentValue) / 3 : (styleObject[styleName] - currentValue) / 5;
            currentDifferTarget = currentDifferTarget > 0 ? Math.ceil(currentDifferTarget) : Math.floor(currentDifferTarget);

            window.parseInt(styleObject[styleName]) !== currentValue && (isEqual = false);
            if (styleName === "opacity") {
              element.style.filter = "alpha(opacity:" + (currentValue + currentDifferTarget) + ")"
              element.style.opacity = (currentValue + currentDifferTarget) / 100
            } else {
              element.style[styleName] = styleName === "zIndex" ? currentValue + currentDifferTarget : currentValue + currentDifferTarget + "px"
            }
          }
          if (isEqual) {
            //当前元素的所有值和 下移元素的slideInfo 中各个属性值相等是才清除循环
            clearInterval(element.timer);
            element.timer = null;
            cb && cb()
          }
        }

        function startMove(element, styleObject, cb) {
          element.timer && clearInterval(element.timer)
          element.timer = setInterval(function() {
            doMove(element, styleObject, cb)
          }, 50)
        }

        //copy 图片的宽高位置到 i 数组
        function copy() {
          copyArr = []
          for (var i = 0; i < slideLength; i++) {
            copyArr.push(slideInfo[i])
          }
        }

        function changeImageOpacity() {
          for (var i = 0; i < slideLength; i++) {
            var itemWidth = $($slides[i]).width()
            var img = $slides.find('img')[i];
            if (itemWidth === 480) {
              startMove(img, {
                opacity: 100
              })
            } else if (itemWidth === 320) {
              startMove(img, {
                opacity: 90
              })
            }
          }
        }

        //每张图移动
        function updateSlide() {
          for (var i = 0; i < slideLength; i++) {
            var img = $slides.find('img')[i];
            startMove(img, {
              opacity: 80
            })
            startMove($slides[i], copyArr[i], function() {
              changeImageOpacity()
            })
          }
        }

        //变换图片宽高数组的顺序
        function changeSlideInfo() {
          copy()
          for (var i = 0; indexNow > i; i++) {
            copyArr.push(copyArr.shift());
          }
        }

        //重置小圆点的className，为激活圆点加 "hove" class ,开始移动
        function updateDot() {
          $dots.eq(indexArray.indexOf(indexNow)).addClass('hove').siblings().removeClass('hove')
          startMove($dots[indexNow], {
            opacity: 100
          });
          changeSlideInfo()
          updateSlide()
        }

        /* 更新indexNow */
        function updateIndex(isSubstract) {
          if (isSubstract) {
            indexNow--
            indexNow < 0 && (indexNow = slideLength - 1)
          } else {
            indexNow++
            indexNow > slideLength - 1 && (indexNow = 0)
          }
          updateDot()
        }

        function main() {
          $dots.on("click", function() {
            indexNow = indexArray[$(this).index()];
            updateDot()
          })

          for (var i = 0; i < slideLength; i++) {
            $($slides[i]).css({
              'width': slideInfo[i].width + 'px',
              'height': slideInfo[i].height + 'px',
              'top': slideInfo[i].top + 'px',
              'left': slideInfo[i].left + 'px',
              'z-index': slideInfo[i].zIndex
            })
          }

          $slides.on("click", function() {
            var clickIndex = $(this).index()
            indexNow = indexArray[clickIndex]
            updateDot()
            changeSlideInfo()
            updateSlide()
          })

          $box.find('.prev').on("click", function() { //向左按钮
            copyArr.push(copyArr.shift())
            updateSlide()
            updateIndex()
          })

          $box.find('.next').on("click", function() { //向右按钮
            copyArr.unshift(copyArr.pop())
            updateSlide()
            updateIndex(true)
          })

          $smallContainer[0].onmouseover = $slideContainer[0].onmouseover = function() {
            clearInterval(clock)
          }

          $smallContainer[0].onmouseout = $slideContainer[0].onmouseout = function() {
            clearInterval(clock)
            clock = setInterval(updateIndex, 3e3)
          };

          clock = setInterval(updateIndex, 3e3)
        }

        main()
      })
    }
  })
})(window.jQuery)
