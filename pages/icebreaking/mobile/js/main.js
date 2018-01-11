function getRatio() {
  var width = document.documentElement.clientWidth;
  width = width > 1280 ? 1280 : width;
  return width / 1280 * 100;
}

function scale() {
  var widthMax = $('.ice_container li>i').width() * 1,
    widthMin = $('.ice_container li>i').width() * 0.9,
    heightMax = $('.ice_container li>i').height() * 1,
    heightMin = $('.ice_container li>i').height() * 0.9
  window.setInterval(function() {
    $('.smash').animate({
      width: widthMin,
      height: heightMin
    }, 500).animate({
      width: widthMax,
      height: heightMax
    }, 500)
  }, 1000)
}

var ratio = getRatio()
$(function() {
  scale()
  $('#btn_hammer').click(startShuffle)
})

function startShuffle() {
  $('#btn_hammer').unbind()
  $('.hammer').hide()
  $('.icon_prizeOn').removeClass('icon_prizeOn')
  $('.ice_container .ice_bg').removeClass('ice_bgOn').attr('src', './images/icebreaking/ice_bg.png')
  //将牌集合到一处
  window.setTimeout(function() {
    sort()
  }, 500)

  // 洗牌次数
  window.setTimeout(function() {
    for (var j = 0; j < 10; j++) {
      if (j === 3) {
        $('.ice_container .item_inner').remove()
      }
      shuffle()
    }
    sort()
  }, 1000)

  //发牌
  window.setTimeout(function() {
    poker()
    window.setTimeout(function() {
      $('.ice_container li').click(flip)
      $('.ice_container i').addClass('smash')
    }, 500)
    window.setTimeout(function() {
      $('.hammer').show()
    }, 500)
  }, 1500)
}

//翻牌
function flip() {
  var url = './images/icebreaking/ice_breaking.gif?version=' + Math.floor(Math.random() * 100000000),
    self = this
  $('.ice_container li').unbind()
  $('.ice_container .smash').removeClass('smash')
  $(this).append(getGif(url, 'ice_bg gif', function() {
    showPrize.call(this)
  }))

  function showPrize() {
    $(self).find('.ice_bg').not('.gif').remove()
    this.onload = null
    window.setTimeout(function() {
      var prizeName = ['coin1', 'hongbao', 'bag1', 'iPad', 'coin2', 'card', 'bag2', 'iPhone']
      var htmlObject = getHTML()
      //key 是从后台传过来的
      var key = "iPad"
      var $html = $(htmlObject[key]).find('.icon_prize').addClass('icon_prizeOn').end()
      var $cardList = $(self).siblings()

      prizeName.splice(prizeName.indexOf(key), 1)
      $(self).find('.gif').removeClass('gif').addClass('ice_bgOn').attr('src', './images/icebreaking/ice_bgOn.png').end().append($html)

      for (var i = 0; i < $cardList.length; i++) {
        var object = spliceArray(prizeName)
        var html = htmlObject[object.item]
        prizeName = object.array;
        (function(j, nhtml) {
          window.setTimeout(function() {
            $($cardList[j]).append(nhtml)
            if (j === 6) {
              $('#btn_hammer').click(startShuffle)
            }
          }, 500)
        })(i, html)
      }
    }, 800)
  }
}

//发牌
function poker() {
  var position = {
      item1: {
        "top": 0,
        "left": 0
      },
      item2: {
        top: 1.45 * ratio,
        left: 0
      },
      item3: {
        top: 2.91 * ratio,
        left: 0
      },
      item4: {
        top: 2.91 * ratio,
        left: 1.64 * ratio
      },
      item5: {
        top: 2.91 * ratio,
        left: 3.27 * ratio
      },
      item6: {
        top: 1.45 * ratio,
        left: 3.27 * ratio
      },
      item7: {
        top: 0,
        left: 3.27 * ratio
      },
      item8: {
        top: 0,
        left: 1.64 * ratio
      }
    },
    timeout = 100
  for (var i = 1; i < 9; i++) {
    var className = 'item' + i
    $('.' + className).animate({
      top: position[className].top,
      left: position[className].left,
      'z-index': 1
    }, timeout)
    timeout += 10
  }
}

//洗牌
function shuffle() {
  var $cardList = $('.ice_container li'),
    zIndexList = [1, 2, 3, 4, 5, 6, 7, 8]
  for (var j = 0; j < $cardList.length; j++) {
    var zIndex = spliceArray(zIndexList).index
    var left = window.Math.random() < 0.5 ? 166 + window.Math.floor(50 * window.Math.random()) : 166 - window.Math.floor(50 * window.Math.random())
    var top = window.Math.random() < 0.5 ? 166 + window.Math.floor(50 * window.Math.random()) : 166 - window.Math.floor(50 * window.Math.random())
    var card = $cardList[j]
    $(card).animate({
      left: left / 100 * ratio,
      top: top / 100 * ratio,
      'z-index': zIndex
    }, 30)
  }
}

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
function sort() {
  var $cardList = $('.ice_container li'),
    timeout = 100,
    top = 1.75 * ratio,
    left = 1.75 * ratio

  for (var i = 0; i < $cardList.length; i++) {
    $($cardList[i]).animate({
      top: top,
      left: left,
      opacity: 1
    }, timeout, 'swing')
    timeout += 50
    top -= 1
    left -= 1
  }
}

function getGif(url, className, callback) {
  var image = new Image()
  image.setAttribute('class', className)
  image.onload = callback
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
