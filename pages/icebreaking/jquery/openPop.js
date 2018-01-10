;(function($){
  $.fn.extend({
    openPop:function(){
      return this.each(function(){
        $('.bg').height($(document).height());
        var element = $(this);
        //$(window.height()) 它会等于视口高度
        var bodyHeight = $(window).height() > $('body').height() ? $('body').height() : $(window).height();
        var height = parseInt((bodyHeight - element.height()) / 2);
        var scrollTop = $(document).scrollTop();
        var top = 0;
        if(height < 0){
          //$(document).height() 当视口高度小于文档高度时，它等于$(body).height(), 否则他会等于视口高度
          var height2 = $(document).height() - element.height() - scrollTop;
          if(height2 < 0){
            top = $(document).height() - element.height();
          } else{
            top = $('body').height() < element.height() ? parseInt(($('body').height() - element.height()) / 2) : scrollTop
          }
        } else{
          top = height + $(document).scrollTop();
        }
        $('.bg').show();
        element.css('top',top).show();
      });
    },
    closePop:function(){
      return this.each(function(){
        $(this).add('.bg').hide();
      });
    }
  });
})(jQuery);
