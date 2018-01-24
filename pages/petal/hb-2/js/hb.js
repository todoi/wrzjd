	/*红包雨开始*/
	$(document).ready(function() {
	  var win = ( window.parseInt($(".couten").css("width"))) - 60;
	  $(".couten").css("height", $(window).height());
	  $("li").css({});

	  var add = function() {
	    var hb = parseInt(Math.random() * (3 - 1) + 1);
	    var Wh = parseInt(Math.random() * (70 - 30) + 20);
	    var Left = parseInt(Math.random() * (win - 0) + 0);
	    var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
	    //				console.log(rot)
	    num++;
	    $(".couten").append("<li class='li" + num + "' ><a href='javascript:;'><img src='images/petal" + hb + ".png'></a></li>");
	    $(".li" + num).css({
	      "left": Left
	    });
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
	    }, 8000, function() { //红包雨的速度
	      //删掉已经显示的红包
	      this.remove()
	    });
	    setTimeout(add, 200)
	  }

	  //增加红包数量
	  var num = 0;
	  setTimeout(add, 200);
})
	/*红包雨结束*/
