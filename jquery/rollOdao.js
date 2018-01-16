(function($) {
	$.fn.extend({
		rollOdao: function(o) {
			var defaults = {
				speed: 50, //滚动速度
				dir: "top",
				width: 0
			};
			o = $.extend(defaults, o);
			return this.each(function() {
				var _speed = o.speed;
				var _rollchild = $(this).children();
				var _rollele = _rollchild.parent();
				var _rollheight = _rollchild.height();
				var _rollwidth = 0;
				if (o.width !== 0) {
					_rollchild.width(o.width * 2);
					_rollwidth = o.width;
				} else {
					_rollwidth = _rollchild.width();
				}
				if (_rollheight > _rollele.height()) {
					_rollchild.html(_rollchild.html() + _rollchild.html());
				}
				if (_rollwidth > _rollele.width()) {
					_rollchild.html(_rollchild.html() + _rollchild.html());
				}

				function rollgo() {
					if (o.dir === 'top') {
						if (_rollele.scrollTop() >= _rollheight) {
							_rollele.scrollTop(0);
						} else {
							_rollele.scrollTop(_rollele.scrollTop() + 1);
						}
					} else {
						if (_rollele.scrollLeft() >= _rollwidth) {
							_rollele.scrollLeft(0);
						} else {
							_rollele.scrollLeft(_rollele.scrollLeft() + 1);
						}
					}
				}
				var sliding = setInterval(rollgo, _speed);
				_rollele.hover(function() {
					clearInterval(sliding);
				}, function() {
					sliding = setInterval(rollgo, _speed);
				});
			})
		}
	});
})(jQuery);
