;(function($){	
	$.fn.extend({        
		openPop:function(){
			return this.each(function(){
				$('.bg').height($(document).height());	
				var element =  $(this);
				var bodyHeight = $(window).height() > $('body').height() ?  $('body').height():$(window).height();
				var height = parseInt((bodyHeight-element.height())/2);
				var scrollTop = $(document).scrollTop();
				var top = 0;				
				if(height<0){
					var height2=$(document).height()-element.height()-scrollTop;
					if(height2<0){
						top = $(document).height()-element.height();
					} else{
						top = scrollTop;
					}		
				} else{
					top = height+$(document).scrollTop();
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