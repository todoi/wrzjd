/**
 * Generate by node-kpc
 */
KISSY.add('moqie/pages/countdown/index', function (S, Cd, Countdown) {
    var $ = S.all;
    return function (box) {
        $('.countdown', box).each(function (el) {
            var json = S.JSON.parse(el.attr('data-json'));
            var leftTime = 0;
            var startTime = json['startTime'];
            var endTime = json['endTime'];
            var type = json['type'];
            var label = '';
            var slabel = '';
            var nowTime = S.now();
            if (startTime > nowTime) {
                leftTime = startTime - nowTime;
                label = '\u79bb\u5f00\u59cb\u5269\uff1a';
                slabel = '\u8ddd\u5f00\u62a2:';
            } else if (endTime > nowTime) {
                leftTime = endTime - nowTime;
                label = '\u79bb\u7ed3\u675f\u5269\uff1a';
                slabel = '\u8ddd\u7ed3\u675f:';
            }
            el.hide();
            if (leftTime > 0) {
                if (type == 1) {
                    var tpl = leftTime > 24 * 60 * 60 * 1000 ? '${d}\u5929${h}\u65f6${m}\u5206${s}\u79d2' : '${h}\u65f6${m}\u5206${s}\u79d2';
                    el.css({
                        width: 'auto',
                        height: 'auto',
                        fontSize: json['fontSize'] || '14',
                        color: json['textColor'] || '#ED4651',
                        textAlign: 'center',
                        background: 'rgba(255,255,255,.5)',
                        padding: '4px 15px'
                    }).html(label + tpl);
                    S.later(function () {
                        el.all('s').css({
                            textDecoration: 'none',
                            padding: '0 3px',
                            fontWeight: 'bold'
                        });
                    }, 0);
                    var cd = new Cd();
                    var simpleTime = cd.add(el, leftTime);
                    simpleTime.addTrigger(0, function (myCount) {
                        myCount.stop = 1;
                        el.hide();
                    });
                    cd.init();
                    el.show();
                } else if (type == 2) {
                    el.css({
                        fontSize: json['fontSize'] || '14',
                        color: json['textColor'] || '#ED4651',
                        fontWeight: 'blod',
                        textAlign: 'center'
                    }).html(slabel + '<span class="clock">${h}:${m}:${s}</span>');
                    console.log(Countdown);
                    var countdown = new Countdown({
                            el: el,
                            leftTime: leftTime / 1000
                        });
                    console.log(countdown);
                } else {
                    var tpl = leftTime > 24 * 60 * 60 * 1000 ? '${d}\u5929${h}\u65f6${m}\u5206${s}\u79d2' : '${h}\u65f6${m}\u5206${s}\u79d2';
                    el.css({
                        width: 'auto',
                        height: 'auto',
                        fontSize: json['fontSize'] || '14',
                        color: json['textColor'] || '#ED4651',
                        textAlign: 'center',
                        background: 'rgba(255,255,255,.5)',
                        padding: '4px 15px'
                    }).html(label + tpl);
                    S.later(function () {
                        el.all('s').css({
                            textDecoration: 'none',
                            padding: '0 3px',
                            fontWeight: 'bold'
                        });
                    }, 0);
                    var cd = new Cd();
                    var simpleTime = cd.add(el, leftTime);
                    simpleTime.addTrigger(0, function (myCount) {
                        myCount.stop = 1;
                        el.hide();
                    });
                    cd.init();
                    el.show();
                }
            }
        });
    };
}, {
    requires: [
        'gallery/simpleCountDown/1.0.1/',
        'kg/countdown/2.0.1/index',
        './index.css',
        'core'
    ]
});/**
 * Generate by node-kpc
 */
KISSY.add('moqie/pages/juitem/index', function (S, Tpl) {
    var url = '//ju.taobao.com/json/tg/ajaxGetItemsV2.json?includeForecast=true';
    var $ = S.all;
    function renderSoldcount(box, data) {
        var text = '';
        var soldCount = data.remind.soldCount;
        var remindNum = data.remind.remindNum;
        var status = data.baseinfo.itemStatus;
        if (status == 'blank') {
            if (remindNum > 0) {
                text = '<b>' + remindNum + '</b> \u4eba\u60f3\u4e70';
            } else {
                text = '\u5373\u5c06\u5f00\u56e2';
            }
        } else if (status == 'avil') {
            if (soldCount > 0) {
                text = '<b>' + soldCount + '</b> \u4ef6\u5df2\u552e';
            } else {
                text = '\u8d76\u5feb\u4e0b\u5355';
            }
        } else if (status == 'timeout' || status == 'soldout') {
            if (soldCount > 0) {
                text = '<b>' + soldCount + '</b> \u4ef6\u5df2\u552e';
            } else {
                text = '\u62a2\u5149\u5566';
            }
        }
        box.css({
            fontSize: box.attr('data-size') || 14,
            textAlign: 'left',
            width: '200',
            color: box.attr('data-color') || '#FA2960'
        });
        box.html(text);
        return false;
    }
    function renderSoldoutMask(box, data) {
        var status = data.baseinfo.itemStatus;
        if (status == 'timeout' || status == 'soldout') {
            box.css({
                background: 'url(//gtms01.alicdn.com/tps/i1/TB19yiFGFXXXXatXFXXR8rl3FXX-192-192.png_100x100.jpg) no-repeat 0 0',
                width: 100,
                height: 100
            });
        }
        return false;
    }
    function renderButton(box, item) {
        var obj = {
                itemStatus: item.baseinfo.itemStatus,
                soldRatio: item.baseinfo.soldRatio,
                textColor: box.attr('data-color'),
                preRemindTime: item.baseinfo.preRemindTime,
                itemUrl: '//detail.tmall.com/item.htm?id=' + item.baseinfo.itemId + '&umpChannel=qianggou&u_channel=qianggou',
                fontSize: box.attr('data-size') || 12
            };
        box.append(Tpl(obj));
    }
    function renderItemLink(box, data, salesSite) {
        var itemUrl = data.baseinfo.itemUrl;
        if (salesSite == '2') {
            itemUrl = 'https://detail.tmall.com/item.htm?id=' + data.baseinfo.itemId + '&umpChannel=qianggou&u_channel=qianggou';
        }
        var itemLinkEl = $('<a>').css({
                width: box.width(),
                height: box.height(),
                display: 'block',
                background: 'url(data:image/gif;charset=utf-8;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)'
            }).attr({
                href: itemUrl,
                target: '_blank'
            }).appendTo(box);
        box.css({ 'z-index': 3 });
        return itemLinkEl;
    }
    function render(d, salesSite) {
        S.each(d.itemList, function (item) {
            var boxs = $('[data-itemid="' + item.baseinfo.itemId + '"]');
            boxs.each(function (box) {
                if (box.attr('data-init') != 1) {
                    box.attr('data-init', 1);
                    var type = box.attr('data-type');
                    if (type == '0') {
                        renderSoldcount(box, item);
                    } else if (type == '1') {
                        renderSoldoutMask(box, item);
                    } else if (type == '2') {
                        renderItemLink(box, item, salesSite);
                    } else if (type == '3') {
                        renderButton(box, item);
                    }
                }
            });
        });
    }
    function idSplits(ids, len) {
        var idSplits;
        if (ids.length < len) {
            idSplits = [ids];
        } else {
            idSplits = new Array(Math.ceil(ids.length / len));
            S.each(ids, function (juId, i) {
                var index = Math.floor(i / len);
                if (idSplits[index]) {
                    idSplits[index].push(juId);
                } else {
                    idSplits[index] = [];
                }
            });
        }
        return idSplits;
    }
    function getRequest(ids, salesSite) {
        var splits = idSplits(ids, 70);
        var data = {
                'stype': 'ids',
                'salesSite': salesSite
            };
        S.each(splits, function (idsArr) {
            data['itemIds'] = idsArr.join(',');
            S.IO({
                url: url,
                dataType: 'jsonp',
                data: data,
                scriptCharset: 'utf-8',
                success: function (d) {
                    render(d, salesSite);
                }
            });
        });
    }
    return function (box) {
        var itemIdsMap = {};
        $('.juitem', box).each(function (itemEl) {
            var json = S.JSON.parse(itemEl.attr('data-json'));
            var salesSite = json.salesSite || '1';
            if (itemIdsMap[salesSite]) {
                itemIdsMap[salesSite].push(json.itemId);
            } else {
                itemIdsMap[salesSite] = [json.itemId];
            }
            itemEl.attr('data-itemid', json.itemId);
            itemEl.attr('data-type', json.type);
            itemEl.attr('data-color', json.textColor);
            itemEl.attr('data-size', json.fontSize);
        });
        S.each(itemIdsMap, function (ids, salesSite) {
            getRequest(ids, salesSite);
        });
    };
}, {
    requires: [
        './index.tpl',
        'core'
    ]
});
