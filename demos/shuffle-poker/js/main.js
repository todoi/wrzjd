var RATIO = getRatio('pc', 0)
$(function() {
  var $cardList = $('.ice_container li')
  var prizeList = ['coin1', 'hongbao', 'bag1', 'iPad', 'coin2', 'card', 'bag2', 'iPhone']
  ployfill()
  disoderPrize(prizeList, $cardList)
  scale('.smash', {maxWidth: 1, minWidth: 0.9, maxHeight: 1, minHeight: 0.9 }, 1000)
  $('#btn_hammer').on('click', function() {
    startShuffle.call(this, $cardList, prizeList)
  })
})

function startShuffle($cardList, prizeList) {
  $(this).off('click')
  resetPoker()
  window.setTimeout(function() {
    //开始洗牌第一步,将牌集合到一处
    sort($cardList, {timeout:100, top: 90, left: 100})
  }, 500)
  window.setTimeout(function() {
    shuffleStep02($cardList,10)
  }, 1000)
  window.setTimeout(function() {
    shuffleStep03($cardList, prizeList)
  }, 1500)
}

/*
 * [resetPoker] 开始洗牌前重置牌面
 * @return {[undefined]} [description]
 */
function resetPoker(){
  //隐藏锤子
  $('.hammer').hide()
  $('.icon_prizeOn').removeClass('icon_prizeOn')
  $('.ice_container .ice_bg').removeClass('ice_bgOn').attr('src', './images/icebreaking/ice_bg.png')
}

/*
 * [shuffleStep01] 开始洗牌第二步，将牌洗乱，最后再收集到一处
 * @param {[type]} count 洗牌的次数
 * @return {[type]} [description]
 */
function shuffleStep02($cardList, count){
  // 洗牌次数
  for (var j = 0; j < count; j++) {
    if (j === 3) $('.ice_container .item_inner').remove()
    shuffle($cardList, {top: 100, left: 90, deviation: 30})
  }
  sort($cardList, {timeout:100, top: 90, left: 100})
}

/*
 * [shuffleStep01] 开始洗牌第三步，发牌并在发完牌之后为每张牌添加翻牌监听
 * @return {[type]} [description]
 */
function shuffleStep03($cardList, prizeList){
  //发牌
  var cardPosition = {
    item1: {top: 0, left: 0 },
    item2: {top: 0, left: 113 * RATIO },
    item3: {top: 0, left: 227 * RATIO},
    item4: {top: 101 * RATIO, left: 227 * RATIO},
    item5: {top: 202 * RATIO, left: 227 * RATIO},
    item6: {top: 202 * RATIO, left: 113 * RATIO},
    item7: {top: 202 * RATIO, left: 0 * RATIO},
    item8: {top: 101 * RATIO, left: 0 * RATIO},
    length: 8
  }
  poker(100, cardPosition)
  window.setTimeout(function() {
    $cardList.click(function(){
      flip.call(this, prizeList)
    })
  }, 500)
  window.setTimeout(function() {
    $('.ice_container .smash').addClass('smashOn')
    $('.hammer').show()
  }, 500)
}

//翻牌
function flip(prizeList) {
  var url = './images/icebreaking/ice_breaking.gif?version=' + Math.floor(Math.random() * 100000000),
    that = this
  $(that).parent().children().unbind()
  $('.ice_container .smash').removeClass('smashOn')
  $(that).append(getGif(url, 'ice_bg gif', function(gif) {
    showPrize(gif, that, prizeList)
  }))
}

//开始GIF 动画以及展示奖品
function showPrize(gif, that, prizeList) {
  gif.onload = null
  $(that).find('.ice_bg').not('.gif').remove()
  //延迟800ms 等待gif 动画做完，更换背景展示奖品
  window.setTimeout(function() {
    //key 是从后台传过来的
    var key = "coin1"
    var $html = $(getHTML()[key]).find('.icon_prize').addClass('icon_prizeOn').end()
    var $cardList = $(that).siblings()

    prizeList.splice(prizeList.indexOf(key), 1)
    // $(that).find('.gif').removeClass('gif').addClass('ice_bgOn').attr('src', '').end().append($html)
    $(that).find('.gif').remove().end()
      .append($('<img src="./images/icebreaking/ice_bgOn.png" class="ice_bg ice_bgOn"/>'))
      .append($html)
    disoderPrize(prizeList, $cardList, 500)
  }, 800)
}

//打乱扑克顺序
function disoderPrize(prizeList, $cardList, delay){
  var htmlObject = getHTML()
  for (var i = 0; i < $cardList.length; i++){
    var object = spliceArray(prizeList)
    var html = htmlObject[object.item]
    prizeList = object.array
    ;(!delay) ? $($cardList[i]).append(html) : (function(j, nhtml) {
      window.setTimeout(function() {
        $($cardList[j]).append(nhtml)
        if (j === 6) {
          $('#btn_hammer').click(function() {
            //$cardList ===> click element siblings
            startShuffle.call(this, $cardList.parent().children())
          })
        }
      }, delay)
    })(i, html)
  }
}

//发牌
function poker(timeout, cardPosition) {
  for (var i = 1; i <= cardPosition.length; i++) {
    var className = 'item' + i
    $('.' + className).animate({
      top: cardPosition[className].top * RATIO,
      left: cardPosition[className].left * RATIO,
      'z-index': 1
    }, timeout)
    timeout += 10
  }
}

//一次洗牌动作
function shuffle($cardList, obj) {
  var zIndexList = new Array($cardList.length)
  for (var i = 1; i <= $cardList.length ; i++){
    zIndexList[i] = i
  }
  for (var j = 0; j < $cardList.length; j++) {
    $($cardList[j]).animate({
      left: createRandomNumber(obj.top * RATIO, obj.deviation * RATIO),
      top: createRandomNumber(obj.left * RATIO, obj.deviation * RATIO),
      'z-index': spliceArray(zIndexList).index
    }, 30)
  }
}

function createRandomNumber(number, deviation){
  var result
  if (window.Math.random() < 0.5){
    result = number + window.Math.floor(deviation * window.Math.random())
  }else{
    result = number - window.Math.floor(deviation * window.Math.random())
  }
  return result
}

/**
 * [spliceArray description] 随机删除数组中的一个元素
 * @param  {[type]} array [description]
 * @return {[object]} 一个对象，array删除后的数组，item删除掉的元素，index删除的位置
 */
function spliceArray(array) {
  var removeIndex = window.Math.floor(array.length * window.Math.random())
  var removeItem = array[removeIndex]
  array.splice(removeIndex, 1)
  return {
    array: array,
    index: removeIndex,
    item: removeItem
  }
}

// 洗牌结束后将牌集中一处
function sort($cardList, obj) {
  var top = obj.top, left = obj.left, timeout = obj.timeout
  for (var i = 0; i < $cardList.length; i++) {
    $($cardList[i]).animate({
      top: top * RATIO,
      left: left * RATIO,
      opacity: 1
    }, timeout, 'swing')
    timeout += 50
    top -= 1
    left -= 1
  }
}

//取得GIF 图片
function getGif(url, className, callback) {
  var image = new Image()
  $(image).addClass(className)
  image.onload = function(){
    var gif = this
    callback.call(null, gif)
  }
  image.src = url
  return image
}

function getHTML() {
  return {
    coin1: '<div class="item_inner coin1"> <span class="icon_prize"></span> <div class="txt"> <p>1000~10万</p> <p>积分</p> </div> </div> ',
    hongbao: '<div class="item_inner hongbao"> <span class="icon_prize"></span> <div class="txt"> <p>1~100元</p> <p>红包</p> </div> </div> ',
    bag1: '<div class="item_inner bag1"> <span class="icon_prize"></span> <div class="txt"> <p>x 1</p> <p>游戏福袋</p> </div> </div> ',
    iPad: '<div class="item_inner iPad"> <span class="icon_prize"></span> <div class="txt"> <p>iPad mini4</p> <p>128G</p> </div> </div> ',
    coin2: '<div class="item_inner coin2"> <span class="icon_prize"></span> <div class="txt"> <p>1万~100万</p> <p>积分</p> </div> </div> ',
    card: '<div class="item_inner card"> <span class="icon_prize"></span> <div class="txt"> <p>500元京东卡</p> </div> </div> ',
    bag2: '<div class="item_inner bag2"> <span class="icon_prize"></span> <div class="txt"> <p>x 1</p> <p>游戏福袋</p> </div> </div> ',
    iPhone: '<div class="item_inner iPhone"> <span class="icon_prize"></span> <div class="txt"> <p>iPhone X</p> <p>256G</p> </div> </div> '
  }
}

/*
 * [scale] 兼容ie7, 图片循环变大变小, 不要用图片做背景会实现bug
 * @param  {[type]} imgSelector   [图片选择器]
 * @param {[type]} sizeObj       [是一个对象有maxWidth, minWidth, maxHeight, minHeight 四个属性; 属性值是图像大小比例]
 * @param {[type]} duration      [动画开始到结束间隔时间]
 */
function scale(imgSelector, sizeObj, duration) {
  var width = $(imgSelector).width(),
    height = $(imgSelector).height()
  window.setInterval(function() {
    $(imgSelector).animate({
      width: width * sizeObj.minWidth,
      height: height * sizeObj.minHeight
    }, duration / 2).animate({
      width: width * sizeObj.maxWidth,
      height: height * sizeObj.maxHeight
    }, duration / 2)
  }, duration)
}

/*
 * [getRatio] 用于移动端适配，得到缩放比例
 * @return {[ratio]} PC返回1，mobile 返回缩放比例
 */
function getRatio(device, designWidth) {
  if (device === 'pc') {
    return 1
  }else{
    var width = document.documentElement.clientWidth
    width = width > designWidth ? 1280 : designWidth
    return width / designWidth
  }
}

// polyfill Array.prototype.indexOf
function ployfill() {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
      var k;
      if (this === null) {
        throw new TypeError('"this" is null or not defined');
      }

      var O = Object(this);
      var len = O.length >>> 0;
      if (len === 0) {
        return -1;
      }

      var n = +fromIndex || 0;
      if (Math.abs(n) === Infinity) {
        n = 0;
      }
      if (n >= len) {
        return -1;
      }

      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      while (k < len) {
        if (k in O && O[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    }
  }
}
