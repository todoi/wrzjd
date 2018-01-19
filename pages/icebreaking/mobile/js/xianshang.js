var ratio = getRatio()
$(function() {
  getIceBreakingGift();
  init();
  scale();
  addHammerBind();//点击破冰按钮
  disorder();

  $(".btn_myPrize").unbind("click").click(function() {
    getMyHistoryMultiPages(1);
  });
  $(".pop_close, .know, .btn_liangjiang").unbind("click").click(function() {
    $('.diaBox').closePop();
  })
});

//打乱顺序
function disorder(){
  var prizeName = ['coin1', 'hongbao', 'bag1', 'iPad', 'coin2', 'card', 'bag2', 'iPhone'],
    $cardList = $('.ice_container li'),
    htmlObject = getHTML()

  $('.item_inner').remove()
  for (var i = 0; i < $cardList.length; i++){
    var object = spliceArray(prizeName)
    var html = htmlObject[object.item]
    prizeName = object.array
    $($cardList[i]).append(html)
  }
}

function addHammerBind(){
  $(".btn_hammer").unbind().bind("click", function() {
    check();
  })
}

//检查次数信息
function check(){
  $('.btn_hammer').unbind();
  $.ajax({
    type : "get",
    url : ctx + "/cases2017/christmas/check.do?timestamp="+ new Date().getTime(),
    cache : false,
    dataTpye : "json",
    data : {},
    success : function(data) {
      if (data.retCode == 0) {
        showLogin();
        return;
      }
      if (data.retCode == 1) {
        startShuffle();
      }else if (data.retCode == -2) {
        if(data.mark == 1){
          $(".tishi").html("<p class=\"rule\">亲，您今天的抽奖次数已用完！</p>");
          $(".cishuBox").openPop();
          addHammerBind();
        }else if(data.mark == 2){
          $("#integral").text("再赢"+data.integral+"积分就能抽奖啦！")
          $(".tianjian").text("亲，您还未达成抽奖条件噢！")
          $(".tiaoJianBox").openPop();
          addHammerBind();
        }
      }else if(data.retCode == -6){
        $("#integral").text("再赢300000积分就能抽奖啦！")
        $(".tianjian").text("亲，您还未达成抽奖条件噢！")
        $(".tiaoJianBox").openPop();
        addHammerBind();
      }else {
        alert(data.retMsg);
        addHammerBind();
      }
    }
  })
}

//初始化
function init() {
  $.ajax({
    type : "get",
    url : ctx + "/cases2017/christmas/init.do?timestamp="+ new Date().getTime(),
    cache : false,
    dataTpye : "json",
    data : {},
    success : function(data) {
      if (data.retCode == 0) {
        showLogin();
        return;
      }
      if (data.retCode == 1) {
        $(".chui").text("破冰锤: " + data.propNum + "个");
      } else {
        alert(data.retCode);
      }
    }
  })
}

//分页获取我的奖品
function getMyHistoryMultiPages(pageNo){
  $.ajax({
    type : "post",
    url : ctx+ "/cases2017/christmas/getBoBingMultiPages.do",
    cache : false,
    dataType : "json",
    data:{
      pageNo : pageNo,
          pageSize : 5
        },
    success : function(data) {
      if (data.retCode == 0) {
        //没有登录
        showLogin();
        return;
      }else if (data.retCode == 1) {
        var obj = data.multiPages;
                var recordHtml = "";
                if(obj.totalPage == 0){
                  recordHtml = "<tr><td colspan=\"4\" style=\"height: 50px;\">无数据...</td></tr>";
                }else {
                  $.each(data.multiPages.luckyRecordList, function(i, item){
                    recordHtml += "<tr class='tr'>";
              var dayValueM = item.getTime.toString().substring(5,7);
              var dayValueD = item.getTime.toString().substring(8,10);
              var dayValueH = item.getTime.toString().substring(11,13);
              var dayValueF = item.getTime.toString().substring(14,16);
              recordHtml += "<td>"+dayValueM+"/"+dayValueD+" "+dayValueH+":"+dayValueF+"</td>";
              recordHtml += "<td class='red'>"+item.giftName+"</td>";
              recordHtml += "<td>已发放</td>";
              recordHtml += "</tr>";
            });
                }
                var prev = obj.currentPage - 1;
                if(prev == 0){
                    prev = 1;
                }
                var next = obj.currentPage + 1;
                if(next > obj.totalPage){
                    next = obj.totalPage;
                }
                var page_html = "<a>第"+obj.currentPage+"页</a><a onclick='getMyHistoryMultiPages("+prev+")'>上一页</a><a  onclick='getMyHistoryMultiPages("+next+")'>下一页</a><a>总页数&nbsp;"+obj.totalPage+"</a>";
                $("#recordList").html(recordHtml);
        $("#recordBox").openPop();
                $(".pages").html(page_html);
      }
    }
  });
}

function scale() {
  var widthMax = $('.ice_container li>i').width() * 1;
  var widthMin = $('.ice_container li>i').width() * 0.9;
  var heightMax = $('.ice_container li>i').height() * 1;
  var heightMin = $('.ice_container li>i').height() * 0.9;
  window.setInterval(function() {
    $('.smash').animate({
      width : Math.floor(widthMin),
      height : Math.floor(heightMin)
    }, 500).animate({
      width : Math.floor(widthMax),
      height : Math.floor(heightMax)
    }, 500)
  }, 1000)
}

function getRatio() {
  var width = document.documentElement.clientWidth;
  width = width > 1280 ? 1280 : width;
  return width / 1280 * 100;
}

//点击破冰
function startShuffle() {
  $('.btn_hammer').unbind()
  $('.hammer').hide()
  // 将牌集合到一处
  window.setTimeout(function() {
    sort()
  }, 500)

  // 洗牌次数
  window.setTimeout(function() {
    for (var j = 0; j < 10; j++) {
      if (j === 3){
        $('.ice_container .item_inner').remove()
        $('.icon_prizeOn').removeClass('icon_prizeOn')
        $('.ice_container .ice_bg').removeClass('ice_bgOn').attr('src',cdnpath+'/cases2017/christmas/mobile/images/icebreaking/ice_bg.png')
        }
      shuffle()
    }
    sort()
  }, 1000)

  // 发牌
  window.setTimeout(function() {
    poker();
    window.setTimeout(function() {
      $('.ice_container i').addClass('smash');
      addLuckyDrawBind();
    }, 500)
    window.setTimeout(function() {
      $('.hammer').show();
    }, 500)
  }, 1500)
}

//添加翻拍绑定
function addLuckyDrawBind(){
  $('.ice_container li').each(function(index, elem){
    var $this = $(elem);
    $this.bind("click", function() {
      luckyDraw($this);
    });
  });
}

//抽奖
function luckyDraw(elem) {
  $('.ice_container li').unbind();
  $(".btn_hammer").unbind();
  $.ajax({
    type : "post",
    url : ctx + "/cases2017/christmas/luckyDraw.do?timestamp="+ new Date().getTime(),
    cache : false,
    dataTpye : "json",
    data : {},
    success : function(data) {
      if (data.retCode == 0) {
        showLogin();
        return;
      } else if (data.retCode == 1) {
        $(".chui").text("破冰锤: " + data.propNum + "个");
        flip(data.giftConfig, elem);
      } else if (data.retCode == -2) {
        if(data.mark == 1){
          $(".cishuBox").openPop();
        }else if(data.mark == 2){
          $("#integral").text("再赢"+data.integral+"积分就能抽奖啦！")
          $(".tiaoJianBox").openPop();
        }
      } else if(data.retCode == -1){
        alert(data.retMsg);
        addHammerBind();
      }else {
        alert(data.retMsg);
      }
    }
  })
}

//翻牌
function flip(obj, elem) {
  var self = elem;
  var giftObj = obj;
  $('.ice_container .smash').removeClass('smash');//去掉砸字gif显示效果
  var url = cdnpath+'/cases2017/christmas/mobile/images/icebreaking/ice_breaking.gif?version=' + Math.floor(Math.random() * 100000000);

  elem.append(getGif(url, 'ice_bg gif', function(){showPrize.call(this,self)}));

    function showPrize(self){
        $(self).find('.ice_bg').not('.gif').remove();
        this.onload = null
        window.setTimeout(function(){
          var prizeName = ['coin1', 'hongbao', 'bag1', 'iPad', 'coin2', 'card', 'bag2', 'iPhone']
          var htmlObject = getHTML();

          //key 是从后台传过来的
          var key = "";
        if(giftObj.giftTypeID == 1){
          if(giftObj.turnType == 1){
            key = 'coin1'
          }else{
            key = 'coin2'
          }
        }else if(giftObj.giftTypeID == 9){
          key = 'hongbao'
        }else if(giftObj.giftTypeID == 100){
          key = 'iPad'
        }else if(giftObj.giftTypeID == 101){
          key = 'iPhone'
        }else if(giftObj.giftTypeID == 102){
          key = 'card'
        }else{
          key = 'bag1'
        }

          var $html = $(htmlObject[key]).find('.icon_prize').addClass('icon_prizeOn').end()
          var $cardList = $(self).siblings()
          prizeName.splice(prizeName.indexOf(key), 1)
          var $ice_bgOn = $('<img/>').attr('src', cdnpath+'/cases2017/christmas/mobile/images/icebreaking/ice_bgOn.png').addClass('ice_bg ice_bgOn')
          $(self).find('.gif').remove().end().append($ice_bgOn).append($html)

          //展示奖品
          showGiftBox(giftObj);

          for (var i = 0; i < $cardList.length; i++){
            var object = spliceArray(prizeName)
            prizeName = object.array
            var html = htmlObject[object.item]
            !function(j,nhtml){
              window.setTimeout(function(){
                $($cardList[j]).append(nhtml)
                if(j === 6){
//                  $('#btn_hammer').click(startShuffle)
                }
              }, 500)
            }(i,html)
          }
        }, 800)
  }
}

function getGif(url, className, callback){
    var image = new Image()
    image.setAttribute('class', className)
    image.onload = callback
    image.src = url
    return image
}

//抽奖完成展示商品
function showGiftBox(giftObj) {
  $(".gift_name").text(giftObj.giftName);
  if(giftObj.giftTypeID == 1){
    jifen(giftObj)
  }else if(giftObj.giftTypeID == 9){
    hongbao(giftObj);
  }else if(giftObj.giftTypeID == 100 || giftObj.giftTypeID == 101 || giftObj.giftTypeID == 102){
    shiti();
  }else{
    daoju(giftObj);
  }
  setTimeout(openShowBox, 1200);
  synchronous(giftObj)
}

function openShowBox(){
  addHammerBind();
  $(".gongxi").openPop();
}

function synchronous(giftObj) {
  if(giftObj.giftTypeID == 1){
    sendSynchroPost(1, giftObj.giftValues);
  }else if(giftObj.giftTypeID == 9){
    sendSynchroPost(5, giftObj.giftValues);
  }
}

//积分奖品展示
function jifen(giftObj){
  $(".tishi").html("获得 <span>" + giftObj.giftName + "</span>");
  $(".btnAgain > p").text("万人拼十双旦大战每日壕送万元奖励");
  $("#card_gift").attr("class", "card_coin");
}

//红包奖品展示
function hongbao(giftObj){
  $(".tishi").html("获得 <span>" + giftObj.giftName + "</span>");
  $(".btnAgain > p").text("万人拼十双旦大战每日壕送万元奖励");
  $("#card_gift").attr("class", "card_hongbao");
}

//道具奖品展示
function daoju(giftObj){
  $(".btnAgain > p").text("可在万人拼十双旦大战中代替积分消耗");
  if(giftObj.giftID == 1 || giftObj.giftID == 2){
    $(".tishi").html("获得 <span>" + giftObj.giftName + "</span>");
    $("#card_gift").attr("class", "card_socks");
  }else if(giftObj.giftID == 3 || giftObj.giftID == 4){
    $(".tishi").html("获得 <span>" + giftObj.giftName + "</span>");
    $("#card_gift").attr("class", "card_hat");
  }else if(giftObj.giftID == 5){
    $(".tishi").html("获得 <span>" + giftObj.giftName + "</span>");
    $("#card_gift").attr("class", "card_bell");
  }
}

//实体奖品展示
function shiti(giftObj) {
  if(giftObj.giftID == 100 || giftObj.giftID == 101 || giftObj.giftID == 102){
    $(".tishi").html("获得 <span>" + giftObj.giftName + "</span>");
  }
}

//发牌
function poker() {
  var position = {
    item1: { "top": 0, "left": 0 },
        item2: { top: Math.floor(1.45 * ratio), left: 0 },
        item3: { top: Math.floor(2.91 * ratio), left: 0 },
        item4: { top: Math.floor(2.91 * ratio), left: Math.floor(1.64 * ratio) },
        item5: { top: Math.floor(2.91 * ratio), left: Math.floor(3.27 * ratio) },
        item6: { top: Math.floor(1.45 * ratio), left: Math.floor(3.27 * ratio) },
        item7: { top: 0, left: Math.floor(3.27 * ratio) },
        item8: { top: 0, left: Math.floor(1.64 * ratio) }
  }, timeout = 100
  for (var i = 1; i < 9; i++) {
    var className = 'item' + i
    $('.' + className).animate({
      top : position[className].top,
      left : position[className].left,
      'z-index': 1
    }, timeout)
    timeout += 10
  }
}

// 洗牌
function shuffle() {
  var $cardList = $('.ice_container li'), zIndexList = [ 1, 2, 3, 4, 5, 6, 7, 8 ]
  for (var j = 0; j < $cardList.length; j++) {
    var zIndex = spliceArray(zIndexList).index
    var left = window.Math.random() < 0.5 ? 166 + window.Math
        .floor(50 * window.Math.random()) : 166 - window.Math
        .floor(50 * window.Math.random())
    var top = window.Math.random() < 0.5 ? 166 + window.Math
        .floor(50 * window.Math.random()) : 166 - window.Math
        .floor(50 * window.Math.random())
    var card = $cardList[j]
    $(card).animate({
      left : Math.floor(left / 100 * ratio),
      top : Math.floor(top / 100 * ratio),
      'z-index' : zIndex
    }, 30)
  }
}

function spliceArray(array){
    var removeIndex = window.Math.floor(array.length * window.Math.random())
    var removeItem = array[removeIndex]
    array.splice(removeIndex, 1)
    return {array: array, index: removeIndex, item: removeItem}
}

// 洗牌结束后将牌集中一处
function sort() {
  var $cardList = $('.ice_container li'), timeout = 100, top = Math.floor(1.75 * ratio), left = Math.floor(1.75 * ratio)

  for (var i = 0; i < $cardList.length; i++) {
    $($cardList[i]).animate({
      top : top,
      left : left,
      opacity : 1
    }, timeout, 'swing')
    timeout += 50
    top -= 1
    left -= 1
  }
}

function getHTML(){
    return {
      coin1: '<div class="item_inner coin1"> <span class="icon_prize"></span> <div class="txt"> <p>1000~10万</p> <p>积分</p> </div> </div> ',
      hongbao: '<div class="item_inner hongbao"> <span class="icon_prize"></span> <div class="txt"> <p>1~100元</p> <p>红包</p> </div> </div> ',
      bag1:'<div class="item_inner bag1"> <span class="icon_prize"></span> <div class="txt"> <p>x 1</p> <p>游戏福袋</p> </div> </div> ',
      iPad: '<div class="item_inner iPad"> <span class="icon_prize"></span> <div class="txt"> <p>iPad mini4</p> <p>128G</p> </div> </div> ',
      coin2: '<div class="item_inner coin2"> <span class="icon_prize"></span> <div class="txt"> <p>1万~100万</p> <p>积分</p> </div> </div> ',
      card: '<div class="item_inner card"> <span class="icon_prize"></span> <div class="txt"> <p>500元京东卡</p> </div> </div> ',
      bag2: '<div class="item_inner bag2"> <span class="icon_prize"></span> <div class="txt"> <p>x 1</p> <p>游戏福袋</p> </div> </div> ',
      iPhone: '<div class="item_inner iPhone"> <span class="icon_prize"></span> <div class="txt"> <p>iPhone X</p> <p>256G</p> </div> </div> '
    }
}

//奖品播报
function getIceBreakingGift() {
  $.ajax({
    type : "get",
    url : ctx + "/cases2017/christmas/getIceBreakingGift.do?timestamp=" + new Date().getTime(),
    cache : false,
    dataTpye : "json",
    data : {},
    success : function(data) {
      if(data.retCode == 1){
        var rankHtml = "";
        rankHtml += "<ul>";
        $.each(data.rankList, function(i, item){
          rankHtml += "<li>";
          rankHtml += item.nickName + item.getTime.toString().substring(11,16) + "抽中" + item.giftName;
          rankHtml += "</li>";
        });
        rankHtml += "</ul>";
        $(".rollCon1").html(rankHtml)
        $(".rollCon1").rollOdao();
      }
    }
  })
}
