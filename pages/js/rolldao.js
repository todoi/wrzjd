
;(function($){
	$.fn.extend({        
		rollOdao:function(o){ 
			var defaults = {
				speed: 50,   //滚动速度
				dir: "top",
				width:0				
            };

			o = $.extend(defaults, o);      
			return this.each(function(){
				var _speed = o.speed; 
				var _rollchild = $(this).children(); //ul  
				var _rollele = _rollchild.parent(); //div
				var _rollheight = _rollchild.height(); //ul 的高度
				var _rollwidth = 0; //原始的宽度为0
				if( o.width != 0){
					_rollchild.width(o.width*2);
					_rollwidth =  o.width;
				}else{
					_rollwidth=_rollchild.width(); // ul的宽度
				}
				if(_rollheight>_rollele.height()){ //ul 的高度 大于 div 的高度
					_rollchild.html(_rollchild.html()+_rollchild.html());
				}
				
				
				function rollgo(){ 					
					if(o.dir == 'top'){
						if(_rollele.scrollTop() >= _rollheight){ 
							_rollele.scrollTop(0); 
						}else{
							 _rollele.scrollTop(_rollele.scrollTop()+1); 
						} 
					} else{
						if(_rollele.scrollLeft() >= _rollwidth){ 
							_rollele.scrollLeft(0); 
						}else{
							 _rollele.scrollLeft(_rollele.scrollLeft()+1); 
						} 
					}
							
					
				} 
				var sliding=setInterval(rollgo,_speed);
			  _rollele.hover(function() {
					clearInterval(sliding); 
				},function(){ 
					sliding=setInterval(rollgo,_speed); 
				}); 
			})
		}       
	});  
})(jQuery); 

//会有一个bug,因为 ul设置的宽度为 li.width()*3*2 = 1680, div的宽度为 1072; 所以scroll 的宽度只为608 宽度
//只要将ul 的宽度是div 的2倍多。