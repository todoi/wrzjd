KISSY.add("my/apps/dynamic", function(e, t, n, a, i, o, s, r) {
    function c() {
        M = window.JU_DETAIL_DYNAMIC,
        e.IO(r({
            type: "get",
            url: M.apiItemDynamicInfo,
            data: {
                item_id: M.item_id,
                id: M.id
            },
            success: function(e) {
                "true" == e.success ? (dynamicData = e.data,
                dynamicData.status = "",
                u(e.data)) : S()
            },
            error: function() {
                S()
            },
            dataType: "jsonp",
            crossDomain: !0,
            cache: !1
        }, {
            style: "taobao"
        })),
        (!e.UA.ie || e.UA.ie > 8) && e.IO({
            url: "https://delivery.taobao.com/detail/itemDetail.do",
            dataType: "jsonp",
            data: {
                itemId: M.item_id
            },
            success: function(e) {
                if (e.success) {
                    var t = '<div class="cainiao-service" data-spm="cainiao"><a href="https://rule.tmall.com/tdetail-2729.htm" target="_blank"><img src="{{serviceIcon}}" width="120"/><span class="txt">{{serviceText}}</span></a></div>';
                    t = t.replace("{{serviceIcon}}", e.serviceDetail.serviceIcon),
                    t = t.replace("{{serviceText}}", e.serviceDetail.serviceText),
                    k(j).after(t)
                }
            }
        })
    }
    function u(t) {
        l(t),
        t.realDetailUrl && e.all(".normal-pic .piclink").attr("href", t.realDetailUrl),
        a.init(),
        d(t.time),
        m(t),
        p(t),
        s.init({
            container: ".J_BuySubForm",
            trigger_cls: ".J_JuSMSRemind"
        }),
        b(),
        y(t),
        _(),
        h(t.buyTip),
        v(t),
        D(t),
        J(t),
        window.JU.juMaxLazyLoad(function() {
            T(t.userCity),
            x(t),
            g(),
            C(t)
        }, 2e3)
    }
    function l(t) {
        var n = t.itemSoldDesc
          , a = e.one(".J_ItemSold");
        a && n && ("true" == t.isHot && (n = '<span class="icon-fire">&#xe607;</span>' + n),
        a.html(n));
        var i = e.one(".J_statusBanner .soldnum em");
        i && t.soldCount && i.text(t.soldCount)
    }
    function d(t) {
        function n(e, t) {
            var n = new Date(Number(e))
              , a = +new Date;
            return n - a > 60 * t * 60 * 1e3
        }
        if (t) {
            var a = e.one(".J_juItemTimer");
            if (a) {
                if (+M.onlineStartTime > +t)
                    var s = "notbegin"
                      , r = M.onlineStartTime;
                else
                    var s = "avil"
                      , r = M.onlineEndTime;
                var c = "notbegin" == s ? "距开团还有:" : "还剩:";
                if ("notbegin" == s && n(r, 1)) {
                    var u = o.timeFormat(new Date(parseInt(r)), "M月d日h:mm");
                    a.css("zoom", "0"),
                    a.html("<p>" + u + " 开抢</p>"),
                    a.before('<div class="icon-time">&#xe62a;</div>')
                } else
                    "avil" == s && n(r, 72) ? a.html("<span>数量有限，赶快下单吧！</span>") : (a.before('<div class="icon-time">&#xe62a;</div>'),
                    i.create({
                        timeEnd: r,
                        timeCurrent: t,
                        timeLeft: 0,
                        container: a,
                        style: "simple",
                        template: c + ' {{#if days}}<span class="day">{{days}}</span>天{{/if}}<span class="hour">{{hours24}}</span>小时<span class="min">{{minutes}}</span>分<span class="sec">{{seconds}}.{{msecs}}</span>秒',
                        callback: function(e) {
                            if (e) {
                                var t = I.get(".J_mainBox")
                                  , n = (I.get(".J_statusBanner", t),
                                I.get(".J_juItemTimer", t));
                                I.hasClass(t, "notbegin") ? (f("avil"),
                                n.innerHTML = '<p class="begin">团购已经开始!</p>') : (I.hasClass(t, "avil") || I.hasClass(t, "chance") || I.hasClass(t, "soldout")) && f("timeout")
                            }
                        }
                    }))
            }
        }
    }
    function m(t) {
        var n = M.onlineStartTime
          , a = t.time
          , i = M.onlineEndTime;
        return n && a && i ? void (+n > +a ? f("true" == t.showRemindBtn ? "notbegin" : "pretobuy") : a > i ? f("timeout") : "0" == M.isLock ? f("soldout") : "1" == M.isLock && f(t.stock > 0 ? t.buyText : "chance")) : void e.log("参数不全")
    }
    function p(e) {
        k(".wanfabar-jdd") && e.juDuoDuoPrice && (k(".J_jddPrice").html(e.juDuoDuoPrice),
        k(".J_jddNum").html(e.juDuoDuoTotalNum),
        k(".wanfabar-jdd").show())
    }
    function v(t) {
        function n(e, t, n) {
            if (e && t) {
                n = n || "";
                var a = e.indexOf("?") + 1
                  , i = e.slice(0, a)
                  , o = e.slice(a)
                  , s = KISSY.unparam(o);
                s[t] = n;
                var r = [];
                for (var c in s)
                    r.push(c + "=" + s[c]);
                return i + r.join("&")
            }
        }
        if (t.userCity) {
            var a = ".J_cityLink"
              , i = "#J_JuNav";
            e.all(a).each(function(a) {
                var i = e.one(a).attr("href")
                  , o = e.one(a).attr("data-temp")
                  , s = n(i, "ck", t.userCityGBK);
                e.one(a).attr("href", s),
                o && e.one(a).html(o.replace("{{userCity}}", t.userCity))
            }),
            e.all(i).attr("data-ck", t.userCity)
        }
    }
    function h(t) {
        var n = e.one(".J_BuyBtnTip");
        n && (t && "" != e.trim(t) ? (n.removeClass("hidden"),
        n.html(t).show()) : n.remove())
    }
    function _() {
        var t = ".J_AddToJuCollect"
          , n = e.one(t);
        window.addToCollectionStatus = !0,
        n && e.Event.on(t, "click", function(t) {
            if (window.addToCollectionStatus) {
                window.addToCollectionStatus = !1,
                t.halt();
                var n = t.currentTarget;
                e.use("my/mods/collect", function(e, t) {
                    t.addItem(n)
                })
            }
        })
    }
    function y(t) {
        t.isLogin && e.one(E) && e.one(E).val(t.isLogin),
        t.sessionId && e.one(N) && e.one(N).val(t.sessionId),
        t._tb_token_ && e.all("input[name='_tb_token_']").val(t._tb_token_)
    }
    function J(t) {
        if (e.one(".J_TabDeal")) {
            var n = e.one(".J_TabDeal").one("strong");
            +t.soldCount ? n && n.html(t.soldCount) : n && n.hide()
        }
        M.onlineStartTime <= t.time && e.all(".J_TabDeal").removeClass("hidden")
    }
    function g() {
        function t(t) {
            var n = "";
            return e.each(t, function(t) {
                n += '<div class="item">',
                n += '<h3 class="orange-btn">' + t.title + "</h3>",
                n += '<div class="cont">',
                e.each(t.promLevels, function(e) {
                    n += "<p>" + e.title + "</p>"
                }),
                n += "</div>",
                n += "</div>"
            }),
            n += "</div>"
        }
        function n() {
            var e = c.getAttribute("data-seller-id")
              , t = c.getAttribute("data-item-id");
            return {
                user_id: e,
                item_id: t
            }
        }
        function i(t) {
            var n = "";
            return e.each(t, function(e) {
                n += "<p>" + a(e) + "</p>"
            }),
            n
        }
        if (!(M.onlineEndTime < dynamicData.time || "0" == M.isLock)) {
            var s = JU_DETAIL_DYNAMIC.shopType;
            if (1 === s) {
                var r = ("taobao.com" == o.getDomain() ? "//dskip.ju.taobao.com/" : "//dskip.ju.daily.taobao.net/") + "promotion/json/get_shop_promotion.do"
                  , c = e.get(".J_BonusBox");
                if (!c)
                    return;
                e.IO.jsonp(r, {
                    ju_id: JU_DETAIL_DYNAMIC.id
                }, function(n) {
                    n.success && n.model && n.model.length > 0 && (c.innerHTML = t(n.model),
                    e.DOM.show(c),
                    e.one(".sub-box") && e.one(".sub-box").show())
                })
            }
            if (2 === s) {
                var r = ("taobao.com" == o.getDomain() ? "//ots.alicdn.com/" : "//tbskip.daily.taobao.net/") + "json/jhsPromotion.htm?mjs=1"
                  , c = e.get(".J_MjsCont", ".J_BonusBox");
                if (!c)
                    return;
                e.IO.jsonp(r, n(), function(t) {
                    if (t.result && t.data && t.data.length > 0) {
                        c.innerHTML = i(t.data);
                        var n = e.get(".J_BonusBox");
                        e.DOM.show(n),
                        e.one(".sub-box") && e.one(".sub-box").show()
                    }
                })
            }
        }
    }
    function C(t) {
        if (t.alipayExscBonus) {
            var n = e.one(t.alipayExscBonus);
            e.DOM.append(n, e.one(".sub-box")),
            n.show(),
            e.one(".sub-box").show()
        }
    }
    function D(t) {
        t.crazySalesNotJu ? e.all(".normal-pic").addClass("disabled") : e.all(".normal-pic").removeClass("disabled")
    }
    function T(t) {
        e.use("my/mods/recommend", function(e, n) {
            n.init(t)
        })
    }
    function x(e) {
        n && n.init(e)
    }
    function S() {
        B(function(e) {
            d(e),
            w(e)
        })
    }
    function w(t) {
        var n = M.onlineStartTime
          , a = M.onlineEndTime;
        return n && t && a ? void f(n > t ? "notbegin" : t > a ? "timeout" : "avil") : void e.log("dynamic参数不全")
    }
    function B(e) {
        function t() {
            try {
                if (window.XMLHttpRequest)
                    return new XMLHttpRequest;
                if (window.ActiveXObject)
                    return new ActiveXObject("MSXML2.XmlHttp")
            } catch (e) {}
        }
        var n, a, i = t();
        i.onreadystatechange = function() {
            4 == i.readyState && (n = new Date(i.getResponseHeader("date")),
            a = n.getTime(),
            e && e(a))
        }
        ,
        i.open("HEAD", "/sync.htm?" + Math.random()),
        i.send(null)
    }
    var I = e.DOM
      , k = (e.Event,
    e.all)
      , M = null
      , j = ".J_statusBanner"
      , L = ".J_BuySubmit, .J_JuSMSRemind, .J_Infotext"
      , P = ".J_mainBox"
      , A = ".J_DetailTab"
      , E = "#isLoginForJu"
      , N = "#sessionIdForJu";
    return window.dynamicData = {},
    {
        init: c
    }
}, {
    requires: ["jbc/lazyload", "my/mods/quan", "./pic", "./timer", "./helper", "./remind", "sd/data_sufei/sufei", "core"]
});


