/**
 * Generate by node-kpc
 */
KISSY.add('moqie/pages/index', function (S, Lazy) {
    var $ = S.all;
    return function (clipBox) {
        clipBox = $(clipBox);
        var mods = [
                'countdown',
                'juitem',
                'jubrand',
                'slide',
                'video',
                'tmallitem',
                'image'
            ];
        var realModsPath = [];
        S.each(mods, function (mod) {
            if (S.one('.' + mod, clipBox)) {
                realModsPath.push('moqie/pages/' + mod + '/index');
            }
        });
        if (realModsPath.length) {
            S.use(realModsPath.join(','), function () {
                var args = arguments;
                for (var i = 1, len = args.length; i < len; i++) {
                    new args[i](clipBox);
                }
            });
        }
    };
}, { requires: ['core'] });/**
 * Generate by node-kpc
 */
KISSY.add('moqie/pages/moqie.tpl', function (S, require, exports, module) {
    module.exports = function (_, _method) {
        _method = _method || {};
        _method.__throw = function (e) {
            throw e;
        };
        _method.stringify = function (json) {
            return JSON.stringify(json);
        };
        _method.__escapehtml = {
            escapehash: {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '"': '&quot;',
                '\'': '&#x27;',
                '/': '&#x2f;'
            },
            escapereplace: function (k) {
                return _method.__escapehtml.escapehash[k];
            },
            escaping: function (s) {
                return typeof s != 'string' ? s : s.replace(/[&<>"]/gim, this.escapereplace);
            },
            detection: function (d) {
                return typeof d == 'undefined' ? '' : d;
            }
        };
        var _ = _ || {};
        var _out = '';
        _out += '';
        var content = _.content;
        var area = _.area;
        var index = _.index;
        var height = _.height;
        var id = _.id;
        var subitem = _.subitem;
        var _iswebp = _._iswebp;
        var div = _.div;
        var imgs = _.imgs;
        var left = _.left;
        var img = _.img;
        var lazy = _.lazy;
        var lazyload = _.lazyload;
        var ks = _.ks;
        var areas = _.areas;
        var a = _.a;
        var spm = _.spm;
        var click = _.click;
        var jhs = _.jhs;
        var json = _.json;
        var stringify = _.stringify;
        var i = _.i;
        var type = _.type;
        _out += '<!--\n\n-->\n';
        if (content && content.imgSrc) {
            _out += '\n<div class="clip-content">\n    <div class="clip-imgs" style="margin-left: -';
            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgWidth / 2));
            _out += 'px;width: ';
            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgWidth));
            _out += 'px;height: ';
            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgHeight));
            _out += 'px;">\n        ';
            ~function () {
                for (var i0 in content.imgSplits) {
                    if (content.imgSplits.hasOwnProperty(i0)) {
                        var height = content.imgSplits[i0];
                        var index = i0;
                        _out += '\n        <img class="mui-lazy h2-lazyload" ';
                        if (index == 0) {
                            _out += 'src';
                        } else {
                            _out += 'data-ks-lazyload';
                        }
                        _out += '="';
                        _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgSrc));
                        _out += '@';
                        _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgUnitHeight));
                        _out += 'y-';
                        _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(index));
                        _out += 'ic_';
                        _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgQuality));
                        _out += 'Q.';
                        if (content.imgSuffix) {
                            _out += '';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgSuffix));
                            _out += '';
                        } else {
                            _out += 'jpg';
                        }
                        _out += '';
                        if (_iswebp) {
                            _out += '_.webp';
                        }
                        _out += '"\n             width="';
                        _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgWidth));
                        _out += '"\n             height="';
                        _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(height));
                        _out += '"/>\n        ';
                    }
                }
            }();
            _out += '\n    </div>\n    <div class="clip-areas" style="margin-left: -';
            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgWidth / 2));
            _out += 'px;width: ';
            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgWidth));
            _out += 'px;height: ';
            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(content.imgHeight));
            _out += 'px;">\n        ';
            ~function () {
                for (var i1 in content.areas) {
                    if (content.areas.hasOwnProperty(i1)) {
                        var area = content.areas[i1];
                        var id = i1;
                        _out += '\n        ';
                        if ((area.type == 'link' || area.type == 'julink') && area.data.href) {
                            _out += '\n        <a class="clip-area ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.type));
                            _out += '" href="';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.data.href));
                            _out += '" target="_blank" style="width: ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.width));
                            _out += 'px; height: ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.height));
                            _out += 'px; top: ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.top));
                            _out += 'px; left: ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.left));
                            _out += 'px;">\n            ';
                            if (area.data.bgImg) {
                                _out += '\n            <img src="';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.data.bgImg));
                                _out += '';
                                if (_iswebp) {
                                    _out += '_.webp';
                                }
                                _out += '" width="100%" height="100%"/>\n            ';
                            }
                            _out += '\n        </a>\n        ';
                        } else if (area.type == 'anchor' && area.data.href) {
                            _out += '\n            ';
                            if (area.data.href.charAt(0) == '#') {
                                _out += '\n            <a class="clip-area ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.type));
                                _out += '" href="';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.data.href));
                                _out += '" target="_self" data-spm-click="gostr=/jhs;locaid=';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(id));
                                _out += '" style="width: ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.width));
                                _out += 'px; height: ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.height));
                                _out += 'px; top: ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.top));
                                _out += 'px; left: ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.left));
                                _out += 'px;"></a>\n            ';
                            } else {
                                _out += '\n            <div id="';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.data.href));
                                _out += '" class="clip-area ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.type));
                                _out += '" style="width: ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.width));
                                _out += 'px; height: ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.height));
                                _out += 'px; top: ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.top));
                                _out += 'px; left: ';
                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.left));
                                _out += 'px;"></div>\n            ';
                            }
                            _out += '\n        ';
                        } else {
                            _out += '\n        <div id="';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.id));
                            _out += '" class="clip-area ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.type));
                            _out += '" data-json=\'';
                            _out += _method.__escapehtml.detection(_method.stringify.call({}, area.data));
                            _out += '\' style="width: ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.width));
                            _out += 'px; height: ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.height));
                            _out += 'px; top: ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.top));
                            _out += 'px; left: ';
                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(area.left));
                            _out += 'px;">\n            ';
                            if (area.subAreas) {
                                _out += '\n                ';
                                ~function () {
                                    for (var i2 in area.subAreas) {
                                        if (area.subAreas.hasOwnProperty(i2)) {
                                            var subitem = area.subAreas[i2];
                                            var i = i2;
                                            _out += '\n                <div class="sub-area ';
                                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(subitem.type));
                                            _out += '"\n                     data-json=\'';
                                            _out += _method.__escapehtml.detection(_method.stringify.call({}, subitem));
                                            _out += '\'\n                     ';
                                            if (subitem.data.src) {
                                                _out += 'data-type="src"';
                                            }
                                            _out += '\n                    ';
                                            if (subitem.data.text) {
                                                _out += 'data-type="text"';
                                            }
                                            _out += '\n                    style="';
                                            if (subitem.width != 'auto') {
                                                _out += 'width: ';
                                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(subitem.width));
                                                _out += 'px;';
                                            }
                                            _out += ' ';
                                            if (subitem.height != 'auto') {
                                                _out += 'height: ';
                                                _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(subitem.height));
                                                _out += 'px;';
                                            }
                                            _out += 'top: ';
                                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(subitem.top));
                                            _out += 'px; left: ';
                                            _out += _method.__escapehtml.escaping(_method.__escapehtml.detection(subitem.left));
                                            _out += 'px;">\n                </div>\n                ';
                                        }
                                    }
                                }();
                                _out += '\n            ';
                            }
                            _out += '\n        </div>\n        ';
                        }
                        _out += '\n        ';
                    }
                }
            }();
            _out += '\n    </div>\n</div>\n';
        }
        _out += '';
        return _out.replace(/[\r\n]\s+[\r\n]/g, '\r\n');
    };
});
