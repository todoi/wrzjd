var $slideContainer = $("#part-list")[0], //a 为part4-list
  $dots = $("#btns-arr li"), // c 为小圆点集合 (5个li)
  $slides = $("#part-list li"), // 图片容器 (5个li)
  $btns = $("#part-list a"), // prev button 和 next button
  $smallContainer = $('#btns-arr .small')[0], // 是圆点li 的 ul 的上一级 div
  slideLength = $slides.length,
  indexNow = 0, //iNow 为 index now
  indexArray = [2, 1, 0, 4, 3],
  copyArr = [],
  clock = null,
  slideInfo = [
  { //右边较小图片
    width: 240,
    height: 130,
    top: 80,
    left: 740,
    zIndex: 2
  }, { //右边较大图片
    width: 320,
    height: 174,
    top: 56,
    left: 570,
    zIndex: 6
  }, { //中间最大图片
    width: 480,
    height: 260,
    top: 0,
    left: 260,
    zIndex: 10
  }, { //左边较大图片
    width: 320,
    height: 174,
    top: 56,
    left: 110,
    zIndex: 8
  },{ //左边较小图片
    width: 240,
    height: 130,
    top: 80,
    left: 20,
    zIndex: 4
  }
  ];

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
    //当前元素的所有值和 slideInfo 中各个属性值相等是才清除循环
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


function show() {
  for (var i = 0; i < slideLength; i++) {
    if ($($slides[i]).width() === 480) {
      var img = $slides.find('img')[i];
      startMove(img, {opacity: 100 })
    }
  }
}


//每张图移动
function updateSlide() {
  for (var i = 0; i < slideLength; i++) {
    var img = $slides.find('img')[i];
    startMove(img, {opacity: 85 })
    startMove($slides[i], copyArr[i], function() {
        show()
    })
  }
}

//变换图片宽高数组的顺序
function changeSlideInfo() {
  copy()
  for (var i = 0; indexNow > i; i++) {
    copyArr.unshift(copyArr.pop());
  }
}

//重置小圆点的className，为激活圆点加 "hove" class ,开始移动
function updateDot() {
  $dots.eq(indexArray.indexOf(indexNow)).addClass('hove').siblings().removeClass('hove')
  startMove($dots[indexNow], {opacity: 100 });
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
    indexNow = indexArray[$(this).index()];
    console.log(indexNow)
    updateDot()
    changeSlideInfo()
    updateSlide()
  })

  $btns.closest('.prev').on("click", function() { //向左按钮
    copyArr.unshift(copyArr.pop())
    updateSlide()
    updateIndex()
  })

  $btns.closest('.next').on("click", function() { //向右按钮
    copyArr.push(copyArr.shift())
    updateSlide()
    updateIndex(true)
  })

  $smallContainer.onmouseover = $slideContainer.onmouseover = function() {
    clearInterval(clock)
  }

  $smallContainer.onmouseout = $slideContainer.onmouseout = function() {
    clearInterval(clock)
    clock = setInterval(updateIndex, 2e3)
  };

  clock = setInterval(updateIndex, 2e3)
}


window.onload = function() {
  main()
}
