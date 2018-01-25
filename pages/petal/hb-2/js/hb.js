	/*红包雨开始*/
	$(document).ready(function() {
	  var win = ( window.parseInt($(".couten").css("width"))) - 60; //红包撒落范围
	  $(".couten").css("height", $(window).height()); //红包经过的高度
	  $("li").css({}); //重置 li 的样式

	  var add = function() {
	    var hb = parseInt(Math.random() * (3 - 1) + 1); // 图片索引 1/2
	    var Wh = parseInt(Math.random() * (70 - 30) + 20); //图片的宽度 20 ~ 59
	    var Left = parseInt(Math.random() * (win - 0) + 0); //图片距离屏幕左边的位置 0 ~ win
	    var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg"; //旋转的角度 -45deg ~ 45deg
	    //				console.log(rot)
	    num++;
	    $(".couten").append("<li class='li" + num + "' ><a href='javascript:;'><img src='images/petal" + hb + ".png'></a></li>");
	    $(".li" + num).css({"left": Left });
	    $(".li" + num + " a img").css({
	      "width": Wh,
	      "transform": "rotate(" + rot + ")",
	      "-webkit-transform": "rotate(" + rot + ")",
	      "-ms-transform": "rotate(" + rot + ")",
	      /* Internet Explorer */
	      "-moz-transform": "rotate(" + rot + ")",
	      /* Firefox */
	      "-webkit-transform": "rotate(" + rot + ")",
	      /* Safari 和 Chrome */
	      "-o-transform": "rotate(" + rot + ")" /* Opera */
	    });
	    $(".li" + num).animate({
	      'top': $(window).height() + 20
	    }, 3000, "linear",function() { //红包雨的速度
	      //删掉已经显示的红包
	      this.remove()
	    });
	    setTimeout(add, 100)
	  }

	  //增加红包数量
	  var num = 0;
	  setTimeout(add, 200);
})
	/*红包雨结束*/
