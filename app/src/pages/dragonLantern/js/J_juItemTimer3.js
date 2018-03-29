KISSY.add("my/init", function(t, e, n, i, o, a, r, c, u, s) {
    var d, l = t.DOM, f = t.Event, p = function() {
        var p = "//dskip.ju.taobao.com"
          , m = "//trade.ju.taobao.com";
        -1 !== window._ju_config.domain.indexOf("daily") && (p = "//dskip.ju.daily.taobao.net",
        m = "//trade.ju.daily.taobao.net");
        var h = {
            buySubmit: m + "/trade/json/buy_item_action.htm",
            buyCheckCode: m + "/trade/json/buy_check_code.htm",
            buyCheckCodeQues: m + "/trade/json/buy_question.htm",
            validateCheckCode: p + "/json/validate_check_code.htm",
            dealRecordList: m + "/trade/json/deal_recordList.htm",
            qcReport: p + "/detail/json/qc.htm"
        };
        this.init = function() {
            var t = this;
            t.loadData(),
            t.renderDynamic(),
            t.buySubmit(),
            window.JU.juMaxLazyLoad(function() {
                t.mobileQrCode(),
                t.showItemTip(),
                t.showPromiseCon(),
                t.detailTab(),
                t.subBuyButtons(),
                t.renderAddToCart(),
                a.init(),
                t.webwwInit(),
                t.showLifeRelate(),
                t.adjustDetailHotelIframe(),
                t.adjustDetailMap(),
                t.timeoutRecomm(),
                s.init(".J_ItemShare")
            }, 2e3)
        }
        ,
        this.loadData = function() {
            new e({
                diff: 200,
                placeholder: "//gtd.alicdn.com/tps/i2/T1RyBdFndXXXbogjYy-500-300.png"
            })
        }
        ,
        this.renderDynamic = function() {
            window.JU_DETAIL_DYNAMIC && i.init()
        }
        ,
        this.detailTab = function() {
            function n() {
                y = t.get(".J_DetailTab"),
                g = t.query("li", y),
                _ = t.query(".J_detailCon"),
                t.each(g, function(e, n) {
                    C[n] = T,
                    f.on(e, "click", function(e) {
                        e.preventDefault(),
                        i(n),
                        b(t.one(this)),
                        r(".J_TabFixHolder", 2)
                    })
                })
            }
            function i(t) {
                o(t),
                a(t)
            }
            function o(t) {
                l.hide(_),
                l.show(_[t]),
                l.removeClass(g, "current"),
                l.addClass(g[t], "current")
            }
            function a(t) {
                C[t](g[t])
            }
            function r(t, e) {
                if (t) {
                    var n = l.offset(t).top - l.scrollTop();
                    l.scrollTop(window, l.scrollTop() + n + e)
                }
            }
            function c(t, e) {
                C[t] = e
            }
            function s() {
                var n = ".J_JuDetailBox"
                  , i = t.one(n);
                if (i) {
                    var o = i.attr("data-url");
                    o && t.getScript(o, function() {
                        if ("undefined" != typeof desc && "" != desc) {
                            var o = t.one("#J_hotelTransision");
                            if (o) {
                                var a = desc.indexOf("<i></i>");
                                -1 !== a && (desc = desc.substr(a + "<i></i>".length))
                            }
                            var r = /<img([^>]*?)src=["']([^>]*?)["']([^>]*?)>/gi
                              , c = /(background|background-image)=["']([^>]*?)["']/gi
                              , u = /(http|https)\:/i
                              , s = /\/\/img0[1-4]\.taobaocdn\.com/i
                              , d = /\.(gif|jpg|png)_((\d+)x(\d+))?(Q\d+)?\.jpg/i
                              , l = /_\.webp/i
                              , f = desc.replace(r, function(t, e, n, i) {
                                return t && -1 === t.indexOf("data-ks-lazyload") ? (n = n.replace(l, ""),
                                n && u.test(n) && (n = n.replace(u, "")),
                                n && s.test(n) && (n = n.replace(s, "//img.alicdn.com"),
                                d.test(n) || (n += "_q90.jpg")),
                                "<img " + e + 'data-ks-lazyload="' + n + '"' + i + ">") : void 0
                            });
                            f = f.replace(c, function(t, e, n) {
                                return t ? (n && u.test(n) && (n = n.replace(u, "")),
                                n && s.test(n) && (n = n.replace(s, "//img.alicdn.com"),
                                d.test(n) || (n += "_q90.jpg")),
                                'background="' + n + '"') : void 0
                            }),
                            t.UA.ie || (f = f.replace(/classid=\"clsid\:d27cdb6e-ae6d-11cf-96b8-444553540000\"/gi, "")),
                            i.html(f);
                            try {
                                var p = i.all("param[name='movie']");
                                p && p.each(function(e, n) {
                                    var i = t.one(e).attr("value");
                                    if (i && t.one(e).parent()) {
                                        var o = t.one(e).parent().attr("width")
                                          , a = t.one(e).parent().attr("height")
                                          , r = t.DOM.create("<embed />", {
                                            src: i,
                                            type: "application/x-shockwave-flash",
                                            width: o,
                                            height: a,
                                            pluginspage: "http://www.macromedia.com/go/getflashplayer"
                                        });
                                        t.DOM.outerHTML(t.DOM.parent(e), r.outerHTML)
                                    }
                                })
                            } catch (m) {}
                            new e(n,{
                                diff: 500,
                                placeholder: "//gtd.alicdn.com/tps/i2/T1RyBdFndXXXbogjYy-500-300.png"
                            })
                        }
                    })
                }
            }
            function d() {
                t.use("my/mods/detaileval", function(e, n) {
                    n.showNum();
                    var i = t.all(g).index(t.one(".J_TabEval"));
                    -1 !== i && c(i, function(t) {
                        k[i] || (k[i] = !0,
                        n.showTags(),
                        n.showList())
                    })
                })
            }
            function p() {
                function e() {
                    var e = l.get(".J_DealRecord");
                    if (e) {
                        var n = w(e)
                          , i = {
                            itemId: n.itemid,
                            frontPrice: n.frontprice,
                            currentPrice: n.currentprice,
                            activityPrice: n.activityprice,
                            juId: n.juid,
                            shortName: n.shortname,
                            tgType: n.tgtype,
                            _input_charset: "utf-8"
                        };
                        t.io.jsonp(h.dealRecordList, i, function(t) {
                            e.innerHTML = t
                        })
                    }
                }
                var n = t.all(g).index(t.one(".J_TabDeal"));
                -1 !== n && c(n, function(t) {
                    k[n] || (k[n] = !0,
                    e())
                })
            }
            function m() {
                function e() {
                    var e = l.get(".J_QcReportDiv");
                    if (e) {
                        var i = w(e)
                          , o = {
                            itemId: i.itemid,
                            juId: i.juid,
                            _input_charset: "utf-8"
                        };
                        t.io.jsonp(h.qcReport, o, function(t) {
                            e.innerHTML = t,
                            n()
                        })
                    }
                }
                function n() {
                    function e(t) {
                        r--,
                        n(t),
                        0 >= r && n(i)
                    }
                    function n(t) {
                        t && 1 == t.nodeType && (t.style.display = "none")
                    }
                    var i = l.get("#J_QcReport");
                    if (i) {
                        var o = i.getElementsByTagName("img")
                          , a = o.length
                          , r = a;
                        t.each(o, function(n) {
                            n.onerror = function() {
                                e(this)
                            }
                            ,
                            t.UA.ie && !n.complete && e(n)
                        })
                    }
                }
                var i = t.all(g).index(t.one(".J_TabQc"));
                -1 !== i && c(i, function(t) {
                    k[i] || (k[i] = !0,
                    e())
                })
            }
            function v() {
                function e() {
                    var e = l.get(".J_TryReport")
                      , n = t.one("#J_TryReportIframe");
                    if (e && n) {
                        var i = w(e).itemid
                          , o = "//www.taobao.com/go/act/try/widget-report.php?id=" + i + "&report_num=3&w=700&h=370&view_from=juhusuan&desc_length=120&mark_num=4&color=dc442f";
                        -1 !== window._ju_config.domain.indexOf("daily") && (o += "&host=daily"),
                        n.attr("src", o)
                    }
                }
                var n = t.all(g).index(t.one(".J_TabTry"));
                -1 !== n && c(n, function(t) {
                    k[n] || (k[n] = !0,
                    e())
                })
            }
            function b(e) {
                var n = ""
                  , i = e.html();
                -1 != i.indexOf("宝贝详情") ? n = "detail" : -1 != i.indexOf("历史评价") ? n = "eval" : -1 != i.indexOf("当前成交") ? n = "deal" : -1 != i.indexOf("质检报告") ? n = "qc" : -1 != i.indexOf("试用报告") && (n = "try");
                var o = {
                    juid: t.all("#juId").val(),
                    type: n,
                    state: window.dynamicData && window.dynamicData.status
                };
                u.sendStat("jhs.6.3", o)
            }
            function w(t) {
                var e = {}
                  , n = /^data-[a-z_\-\d]*$/i;
                if (t && t.dataSet)
                    return t.dataSet;
                for (attr in t.attributes)
                    try {
                        if (n.test(t.attributes[attr].name)) {
                            var i = t.attributes[attr].name.substr(5).toLowerCase()
                              , o = t.attributes[attr].value;
                            e[i] = o
                        }
                    } catch (a) {}
                return e
            }
            var y = null
              , g = null
              , _ = null
              , T = function() {}
              , C = {}
              , k = {};
            n(),
            s(),
            d(),
            p(),
            m(),
            v()
        }
        ,
        this.renderAddToCart = function() {
            var e = t.one(".J_CartPluginTrigger");
            e && t.juReady(function(n) {
                t.one("#_tb_token_") || e.after('<input type="hidden" id="J_TokenField" value="' + n.tbToken + '" />'),
                e.css("display", "inline-block"),
                t.use("tbc/add-to-cart/1.3.3/", function(t, e) {
                    e.init(null, {
                        preventAll: !0
                    })
                })
            })
        }
        ,
        this.webwwInit = function() {
            -1 !== window._ju_config.domain.indexOf("daily") ? t.getScript("//g-assets.daily.taobao.net/aliww/web.ww/scripts/webww.js", {
                charset: "utf-8"
            }) : t.getScript("//g.alicdn.com/aliww/web.ww/scripts/webww.js", {
                charset: "utf-8"
            })
        }
        ,
        this.showPromiseCon = function() {
            var e = t.one(".J_PromiseCon");
            e && e.show()
        }
        ,
        this.showLifeRelate = function() {
            JU_DETAIL_DYNAMIC && "false" == JU_DETAIL_DYNAMIC.isEnableLifeRelateInfo && t.use("my/mods/liferelate", function(t, e) {
                e.init()
            })
        }
        ,
        this.adjustDetailHotelIframe = function() {
            var e = t.one("#J_hotelOtherItems")
              , n = t.unparam(location.search.replace("?", "")).from
              , i = n ? "&from=" + n : "";
            e && e.attr("src", e.attr("data-src") + i);
            var o = t.one("#J_hotelTransision");
            o && o.attr("src", o.attr("data-src"))
        }
        ,
        this.adjustDetailMap = function() {
            function e(e) {
                t.UA.ie ? i() : s.onload = e
            }
            function n(e) {
                try {
                    context = s.contentWindow.document,
                    d = t.get(".map-wrap", context),
                    l = t.get(".map-des", context)
                } catch (n) {}
                return d && l && !p ? (e(),
                void (p = !0)) : void i()
            }
            function i() {
                f = setTimeout(function() {
                    n(a)
                }, 1e3)
            }
            function o() {
                context = s.contentWindow.document,
                d = t.get(".map-wrap", context),
                l = t.get(".map-des", context);
                var e = parseInt(t.get("#relateStoreCount", context).value);
                return e > 0
            }
            function a() {
                o() && (d.style.width = "688px",
                l.style.width = "262px",
                s.frameBorder = "0",
                s.style.width = "688px",
                s.style.border = "none",
                s.style.overflow = "hidden",
                t.DOM.addClass(s, "visible"))
            }
            function r() {
                -1 != window.location.href.indexOf("taobao.net") ? document.domain = "taobao.net" : document.domain = "taobao.com"
            }
            function c() {
                var e = t.one(u)
                  , n = e.attr("data-itemid")
                  , i = "//map.taobao.com/item/index.htm?itemid=" + n;
                -1 !== window._ju_config.domain.indexOf("daily") && (i = "//map.daily.taobao.net/item/index.htm?itemid=" + n),
                e.attr("src", i)
            }
            var u = "#taobaoMapIframe"
              , s = t.get(u)
              , d = null
              , l = null
              , f = null;
            if (s) {
                var p = !1;
                c(),
                r(),
                e(function() {
                    n(a)
                });
                try {
                    a()
                } catch (m) {}
            }
        }
        ,
        this.mobileQrCode = function() {
            var e = l.get("#J_MbClientQrCode")
              , i = l.get(".J_JuMbQrCode")
              , o = l.get(".J_qrcode_big")
              , a = t.one(".J_qrcode");
            e && i && t.use("gallery/qrcode/1.0/", function(t, r) {
                if (new r(i,{
                    text: e.value,
                    width: 28,
                    height: 28,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: r.CorrectLevel.H
                }),
                t.one(i).attr("title", ""),
                o && (new r(o,{
                    text: e.value,
                    width: 100,
                    height: 100,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: r.CorrectLevel.H
                }),
                t.one(o).attr("title", ""),
                a)) {
                    var c = "true" == a.attr("data-unfold") ? !0 : !1;
                    console.log(a.attr("data-unfold")),
                    c && a.addClass("hover"),
                    a.on("mouseenter", function(t) {
                        a.addClass("hover"),
                        n.log("pcdetail", "qrcode", "show", -1)
                    }),
                    a.on("mouseleave", function(t) {
                        a.removeClass("hover")
                    })
                }
            })
        }
        ,
        this.timeoutRecomm = function() {
            t.one(".J_TimeoutRecomm") && t.use("my/mods/jurecommend", function(t, e) {
                e.init()
            })
        }
        ,
        this.showItemTip = function() {
            if (t.UA.ie && !(t.UA.ie > 7)) {
                var e = t.one(".J_MultiCity");
                e && (e.on("mouseenter", function() {
                    e.show()
                }),
                e.on("mouseleave", function() {
                    e.hide()
                }))
            }
        }
        ,
        this.subBuyButtons = function() {
            var e = ".J_BuyButtonSub";
            t.all(e).on("click", function(t) {
                t.halt(),
                f.fire(".J_BuySubmit", "click", {
                    posi: "sub"
                }),
                f.fire(".J_JuSMSRemind", "click", {
                    posi: "sub"
                })
            })
        }
        ,
        this.buyCaptcha = function(e) {
            function n() {
                return +new Date
            }
            function i() {
                return P + "_ts=" + n()
            }
            function o(t) {
                function e() {
                    var e = document.createElement("INPUT");
                    e.setAttribute("type", "hidden"),
                    e.setAttribute("name", "checkcode"),
                    e.setAttribute("id", "checkcode"),
                    e.setAttribute("value", t),
                    Y.appendChild(e)
                }
                return Y && Y.elements.checkcode ? void (Y.elements.checkcode.value = t) : void e()
            }
            function a(t, e) {
                function n() {
                    var n = document.createElement("INPUT");
                    if (n.setAttribute("type", "hidden"),
                    n.setAttribute("name", "answer"),
                    n.setAttribute("id", "answer"),
                    n.setAttribute("value", t),
                    Y.appendChild(n),
                    e) {
                        var i = document.createElement("INPUT");
                        i.setAttribute("type", "hidden"),
                        i.setAttribute("name", "encrpt"),
                        i.setAttribute("id", "encrpt"),
                        i.setAttribute("value", e),
                        Y.appendChild(i)
                    }
                }
                return Y && Y.elements.answer ? (Y.elements.answer.value = t,
                void (Y.elements.encrpt && e && (Y.elements.encrpt.value = e))) : void n()
            }
            function r() {
                function t() {
                    var t = document.createElement("INPUT");
                    t.setAttribute("type", "hidden"),
                    t.setAttribute("name", "sessionToken"),
                    t.setAttribute("id", "sessionToken"),
                    t.setAttribute("value", e),
                    Y.appendChild(t)
                }
                var e = F;
                if (e)
                    return Y && Y.elements.sessionToken ? void (Y.elements.sessionToken.value = e) : void t()
            }
            function u(t) {
                L = t,
                M = L.popup;
                var e = l.get(".btn-refresh", M);
                m(M),
                j(),
                f.on(e, "click", function(t) {
                    t.halt(),
                    s()
                })
            }
            function s() {
                "ques" != U && (clearTimeout(H),
                H = setTimeout(function() {
                    B.src = i()
                }, R))
            }
            function p() {
                var t = l.get(".questionForm", M);
                if ("ques" == U) {
                    var e = l.get(".questionAnswer", t).value
                      , n = l.get(".questionEncrpt", t) ? l.get(".questionEncrpt", t).value : "";
                    a(e, n)
                } else {
                    var e = l.get(".questionCheckcode", t).value;
                    o(e),
                    r()
                }
                O()
            }
            function m(t) {
                var e = "";
                if (E = l.get(".cc", t),
                B = l.get("img", E),
                B && B.src) {
                    if (e = B.src,
                    ccApiPrefixs = e.match(N),
                    ccApiPrefixs || (ccApiPrefixs = e.match(Q)),
                    !ccApiPrefixs)
                        return;
                    P = ccApiPrefixs[1]
                }
            }
            function v() {
                var t = l.get(".dt-error-tips", M);
                l.show(t),
                s()
            }
            function b() {
                L && L.hide()
            }
            function w(e, n) {
                var i, o, a;
                if ("string" == typeof e) {
                    e = e.replace(/\\"/g, "'"),
                    e = e.replace(/\r|\n|\\|\t/g, "");
                    try {
                        i = KISSY.JSON.parse(e)
                    } catch (r) {}
                } else
                    i = e;
                if (t.isBoolean(i))
                    return void (i ? (L.hide(),
                    O()) : (v(),
                    s()));
                switch (o = i && i.type || "BUSY") {
                case "HAS_CHECKCODE":
                    a = i.data.content,
                    F = i.data.sessionToken || "",
                    u(k(a, p));
                    break;
                case "HAS_QUESTION":
                    a = i.data.content,
                    F = i.data.sessionToken || "",
                    u(k(a, p));
                    break;
                case "NO_CHECKCODE":
                    O();
                    break;
                case "NO_QUESTION":
                    O();
                    break;
                case "ERROR":
                    T(i.data);
                    break;
                case "BUSY":
                    C();
                    break;
                default:
                    C()
                }
            }
            function y() {
                d = {
                    closeCCPopup: b,
                    showErrorMessage: v
                }
            }
            function g() {
                r(),
                new t.io({
                    url: D,
                    form: Y || document.createElement("form"),
                    dataType: "jsonp",
                    success: function(t) {
                        w(t)
                    },
                    error: function() {
                        C()
                    }
                })
            }
            function _() {
                r(),
                new t.io({
                    url: q,
                    form: Y || document.createElement("form"),
                    dataType: "jsonp",
                    success: function(t) {
                        w(t)
                    },
                    error: function() {
                        C()
                    }
                })
            }
            function T(t) {
                var e = t.content || "系统错误"
                  , n = '<p class="error-content cry">' + e + "</p>"
                  , i = new c({
                    width: 394,
                    content: n,
                    title: "提示",
                    type: "pop-ju",
                    keepShow: !0,
                    buttons: [{
                        text: "确定",
                        func: function() {
                            this.hide()
                        }
                    }],
                    autoShow: !1,
                    useAnim: !0,
                    onHide: function() {}
                });
                i.show()
            }
            function C() {
                var e = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧…</p><p class="busy"></p>'
                  , n = new c({
                    iframeShim: t.UA.ie > 0 ? !0 : !1,
                    width: 394,
                    content: e,
                    title: "小提示",
                    type: "pop-ju",
                    keepShow: !0,
                    buttons: [{
                        text: "继续团购",
                        func: function() {}
                    }],
                    autoShow: !1,
                    useAnim: !0,
                    onHide: function() {}
                });
                n.show();
                var i = n.popup.getElementsByTagName("button")[0]
                  , o = 1e3 * (Math.floor(6 * Math.random()) + 3);
                l.addClass(i, "unavil"),
                f.detach(i, "click"),
                setTimeout(function() {
                    var t = n.popup.getElementsByTagName("p")
                      , e = l.query(".btn-close", n.popup)[0];
                    t[0].innerHTML = "OK，你可以继续团购了。",
                    l.css(t[1], "display", "none"),
                    l.removeClass(i, "unavil"),
                    l.css(e, "display", "block"),
                    f.on(i, "click", function() {
                        n.hide(),
                        location.reload()
                    })
                }, o)
            }
            function k(e, n) {
                var i = new c({
                    iframeShim: t.UA.ie > 0 ? !0 : !1,
                    width: 475,
                    content: e,
                    title: "请输入验证码",
                    type: "pop-captcha",
                    buttons: [{
                        text: "确定",
                        func: function() {
                            n(),
                            A()
                        }
                    }],
                    autoShow: !1,
                    useAnim: !1,
                    onHide: function() {
                        A()
                    }
                });
                i.show();
                try {
                    var o = KISSY.one(i.popup).one(".term") && KISSY.one(i.popup).one(".term").one("input")[0];
                    o.focus()
                } catch (a) {}
                return i
            }
            function A() {
                f.detach(document, "keydown", J)
            }
            function j() {
                f.on(document, "keydown", J)
            }
            function J(t) {
                t && t.keyCode && "13" == t.keyCode && (t.halt(),
                p())
            }
            function x(e) {
                t.isFunction(e) && (O = e);
                var n = S();
                return Y && n ? "code" == n ? void g() : "ques" == n ? void _() : void 0 : void O()
            }
            function S() {
                Y.getAttribute("data-ccb");
                return Y.getAttribute("data-ccb") && "1" == Y.getAttribute("data-ccb") ? "code" : Y.getAttribute("data-ques") && "1" == Y.getAttribute("data-ques") ? (U = "ques",
                "ques") : void 0
            }
            function I(t) {
                y(),
                x(t)
            }
            var D = h.buyCheckCode
              , O = (h.validateCheckCode,
            function() {}
            )
              , q = h.buyCheckCodeQues
              , U = "code"
              , L = null
              , M = null
              , E = null
              , B = null
              , R = 200
              , H = null
              , N = /(\/\/(.*?)\?sessionID=(.*?)&)/
              , P = ""
              , Q = /(\/\/(.*?)\?identity=(.*?)&sessionid=(.*?)&)/;
            if (t.one(".J_BuySubForm")) {
                var Y = l.get(".J_BuySubForm")
                  , F = "";
                return {
                    handle: I
                }
            }
        }(KISSY),
        this.buySubmit = function() {
            function e() {
                var e = window.ua;
                if (window.UA_Opt && (UA_Opt.Token = (new Date).getTime() + ":" + Math.random(),
                UA_Opt.reload()),
                i.hasClass("avil")) {
                    var n = t.one(".J_statusBanner")
                      , r = n.attr("data-miaosha");
                    if (r) {
                        var c = n.attr("data-miaoshaurl");
                        if (!c)
                            return;
                        return void (document.location.href = c)
                    }
                    var u = h.buySubmit + "?" + t.io.serialize(a[0]) + "&ua=" + (encodeURIComponent(e) || "");
                    document.referrer && (u += "&root_refer=" + document.referrer.split("?")[0]),
                    new t.io({
                        url: u,
                        dataType: "jsonp",
                        success: function(t) {
                            o.init(t, d)
                        },
                        error: function() {
                            o.init(null, d)
                        }
                    })
                }
            }
            var n = this
              , i = t.one(".J_mainBox")
              , a = t.one(".J_BuySubForm");
            i && a && a.delegate("click", ".J_BuySubmit", function(t) {
                var i = l.get("#J_DetailDynamic");
                if (!i || "true" != i.value) {
                    t.halt();
                    var o = a[0].itemId && a[0].itemId.value || ""
                      , c = a[0].id && a[0].id.value || ""
                      , s = "cantuan"
                      , d = t.posi ? t.posi : "main"
                      , f = {
                        itemid: o,
                        juid: c,
                        type: s,
                        posi: d
                    };
                    if (u.sendStat("jhs.6.1", f),
                    a && "itemUrl"in a && a.itemUrl) {
                        var p = a.itemUrl.value;
                        return void (window.location.href = p)
                    }
                    var m = !0;
                    r(function() {
                        m && (m = !1,
                        n.hasGroup(function() {
                            n.buyCaptcha.handle(e)
                        }))
                    })
                }
            })
        }
        ,
        this.hasGroup = function(e) {
            function n() {
                var e = []
                  , n = t.query("li", o);
                return t.each(n, function(n) {
                    e.push(t.trim(n.innerHTML))
                }),
                e
            }
            function i() {
                var n = "<p class='despair'>该团购不在 <em>" + r + "</em>销售中哦，仍然购买么？</p>"
                  , i = new c({
                    iframeShim: t.UA.ie > 0 ? !0 : !1,
                    width: 400,
                    content: n,
                    title: "小提示",
                    type: "pop-nogroup",
                    buttons: [{
                        text: "取消",
                        func: function() {
                            this.hide()
                        }
                    }, {
                        text: "继续购买",
                        func: function() {
                            this.hide(),
                            e && e()
                        }
                    }],
                    autoShow: !1,
                    useAnim: !0,
                    onHide: function() {}
                });
                i.show()
            }
            var o = t.one("#J_JuDataCityList")
              , a = t.one("#J_JuNav");
            if (!o || !a)
                return void (e && e());
            var r = t.trim(a.attr("data-ck"))
              , u = t.trim(a.attr("data-national"))
              , s = n();
            "true" == u || -1 != t.indexOf(r, s) || "" == r ? e && e() : i()
        }
        ,
        this.init()
    };
    return {
        init: function() {
            new p
        }
    }
}, {
    requires: ["jbc/lazyload", "jbc/julog", "./apps/dynamic", "./apps/buy", "./apps/float", "jbc/julogin", "./apps/popup", "./apps/helper", "./apps/share", "core"]
});
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
    function f(t) {
        var n = e.one(P);
        if (n) {
            var a = e.one(A)
              , i = "";
            switch (n.removeClass("avil").removeClass("notbegin").removeClass("blank").removeClass("chance").removeClass("soldout"),
            a && a.removeClass("avil").removeClass("notbegin").removeClass("blank").removeClass("chance").removeClass("unavil"),
            t) {
            case "notbegin":
                i = '<button type="button" class="buyaction J_JuSMSRemind"><span><i>&#xe63c;</i>开团提醒</span></button>';
                break;
            case "pretobuy":
                t = "notbegin",
                i = '<span class="infotext J_Infotext">准备开抢...</span>';
                break;
            case "timeout":
                i = '<span class="infotext J_Infotext">已结束...</span>';
                break;
            case "soldout":
                i = '<span class="infotext J_Infotext">卖光了...</span>';
                break;
            case "avil":
                i = '<button type="submit" class="buyaction J_BuySubmit"><span>马上抢</span></button>';
                break;
            case "chance":
                i = '<span class="infotext J_Infotext J_RefreshBtn"><span class="refresh">&#xe63b;</span>还有机会...</span>',
                e.one(".J_ItemSold") && e.one(".J_ItemSold").hide();
                break;
            case 1:
                t = "avil",
                i = '<button type="submit" class="buyaction J_BuySubmit"><span>马上抢</span></button>';
                break;
            case 2:
                t = "avil",
                i = '<button type="submit" class="buyaction J_BuySubmit"><span>兑 换</span></button>';
                break;
            case 3:
                t = "avil",
                i = '<button type="submit" class="buyaction J_BuySubmit"><span>马上订</span></button>';
                break;
            case 4:
                t = "avil",
                i = '<button type="submit" class="buyaction J_BuySubmit"><span>付定金</span></button>'
            }
            "avil" == t && e.one("#actPrice") && e.one("#actPrice").val() && (e.all(".J_statusBanner .J_actPrice").html(e.one("#actPrice").val()),
            e.all(".J_DetailTab .J_actPrice").html(e.one("#actPrice").val())),
            n.addClass(t),
            dynamicData.status = t,
            a && a.addClass(t),
            e.one(L) && e.one(L).replaceWith(i)
        }
    }
    function b() {
        var t = e.one(".J_BuySubForm");
        if (t) {
            var n = !0
              , a = window.JU_DETAIL_DYNAMIC;
            t.delegate("click", ".J_RefreshBtn", function(t) {
                t.halt(),
                n && (n = !1,
                e.Anim(I.get(".J_RefreshBtn span"), {
                    transform: "rotate(360deg)"
                }, 1, "easeNone", function() {
                    n = !0,
                    e.one(".J_RefreshBtn span").css({
                        transform: "rotate(0deg)"
                    })
                }).run(),
                e.IO({
                    type: "get",
                    url: a.apiChanceRefreshInfo,
                    data: {
                        item_id: a.item_id,
                        id: a.id
                    },
                    success: function(t) {
                        if (dynamicData.status = t.status,
                        "avil" === t.status || "soldout" === t.status || "timeout" === t.status) {
                            f(t.status);
                            var a = e.one(".J_BuyBtnTip");
                            a && a.hide(),
                            n = !0
                        } else {
                            var i = e.one(".J_BuyBtnTip .J_Num");
                            i && i.text(t.nopayOrderCount)
                        }
                    },
                    error: function() {},
                    dataType: "jsonp"
                }))
            })
        }
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
        function a(e) {
            var t = Number(Number(e.startFee) / 100).toFixed(2)
              , n = Number(Number(e.discountCash) / 100).toFixed(2)
              , a = "满" + t + "元";
            return e.hasDiscountCash && (a += "，减" + n + "元"),
            e.directCalMJMY && e.hasFreePostage && (a += "，免邮"),
            e.hasDiscountCash && (e.hasPresentPoint || e.hasSendGift || !e.directCalMJMY && e.hasFreePostage || e.hasSendBonus || e.hasSendLottery || e.hasExtra) && (a += "，减后满" + t + "元"),
            e.hasPresentPoint && (a += "，送" + e.presentPoint + "积分"),
            e.hasSendGift && (a += "，送“" + e.giftName + "”"),
            !e.directCalMJMY && e.hasFreePostage && (a += "，免邮"),
            e.hasSendBonus && (a += "，送" + e.shopBonusDesc),
            e.hasSendLottery && (a += "，送" + e.lotteryCount + "注彩票"),
            e.hasExtra && (a += "，可换购特价商品"),
            a
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
KISSY.add("my/mods/quan", function(t, e, a, i, n, o) {
    function l(t) {
        t.all(".J_GetYouhui")[0] && s()
    }
    function s(t) {
        r()
    }
    function r() {
        g.on(y, "click", function(t) {
            t.halt(),
            j = t.target.getAttribute("data-activityid"),
            c()
        })
    }
    function c() {
        var e = !0;
        a(function() {
            e && (e = !1,
            t.io({
                type: "get",
                url: b,
                dataType: "jsonp",
                timeout: 5,
                data: {
                    itemId: k,
                    juId: w,
                    activityId: j
                },
                success: function(t) {
                    u(t)
                },
                error: function(t) {
                    var e = {
                        type: "ERROR",
                        data: {
                            msg: "亲，领取失败啦。"
                        }
                    };
                    u(e)
                }
            }))
        })
    }
    function d() {
        var e = ".J_AddToJuCollectByQuan"
          , a = t.one(e);
        a && t.Event.on(e, "click", function(e) {
            e.halt();
            var a = e.currentTarget;
            t.use("my/mods/collect", function(t, e) {
                e.addItem(a)
            })
        })
    }
    function u(e) {
        var a = e.type
          , o = "smile"
          , l = ""
          , s = t.one("#juId").val();
        if (-1 !== n.getDomain().indexOf("daily.taobao.net"))
            var r = '<a class="tlinkview" href="//taoquan.' + n.getDomain() + '/framework/got_bonus.htm?nekot=1373874510881" target="_blank">查看我的商品优惠券</a>';
        else
            var r = '<a class="tlinkview" href="//ecrm.' + n.getDomain() + '/mallcoupon/got_bonus.htm?nekot=1373874510881" target="_blank">查看我的商品优惠券</a>';
        r += '<a class="tlinkview quan-jucollect J_AddToJuCollectByQuan" data-id="' + s + '" href="#"><span class="jucollect"></span>加入聚收藏</a>',
        "OK" == a ? l = '<div class="error-content smile" style="line-height:2em"><h3>恭喜您领取成功！</h3>            <p>有效日期：' + e.data.startTime + "- " + e.data.endTime + "            <br />使用条件：单笔订单中 指定商品 金额满" + e.data.startFee + "元</p><p>" + r + "</p></div>" : "ERROR" == a && (l = e.data.msg || "系统错误",
        l = '<p class="error-content laugh">' + l + "<br />" + r + "</p>",
        o = "cry");
        var c = new i({
            width: 450,
            content: l,
            title: "领取优惠券",
            type: o,
            buttons: [{
                text: "关闭",
                func: function() {
                    this.hide()
                }
            }],
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        c.show(),
        d(),
        "ERROR" == a && "-1003" == e.code && (t.one(y).text("领光了"),
        t.one(y).addClass("disabled"),
        t.Event.detach(y))
    }
    function f(a) {
        var i = a.length;
        t.each(a, function(t, e) {
            t.priceLength = t.price.length
        });
        var n = []
          , o = '{{#each list as it}}            <div class="detail-coupon coupon-mobileorder {{#if !it.hasButton}}J_quanQrcode{{/if}}">                <div class="quan">                    {{#if it.version && it.version == "2.0"}}                        <strong>{{it.keyProm}}</strong>                    {{#else}}                        <strong class="w{{it.priceLength}}">{{it.price}}<em>元</em></strong>                    {{/if}}                    <div class="desc">                        {{#if stat == "big"}}                        <h3>{{it.big.descFir}}</h3>                        <span class="type">{{it.big.descSec}}</span>                        {{#else}}                        <h3>{{it.small.mainTitle}}</h3>                        <span class="type">{{it.small.subTile}}</span>                        {{/if}}                    </div>                </div>                <div class="anc">                    {{#if stat == "big"}}                    <h3>活动规则</h3>                    <ul>                        <li>{{it.big.ruleLineSec}}</li>                        <li>{{it.big.ruleLineFir}}</li>                    </ul>                    {{/if}}                </div>                {{#if it.hasButton}}                {{#if it.version && it.version == "2.0"}}                <a href="{{it.button.link}}" target="_blank" class="getquan">                {{#else}}                <a href="javascript:;" class="J_GetYouhui getquan" data-activityid="{{it.button.link}}">                {{/if}}                    {{#if stat == "small"}}                    {{it.button.smallText}}>                    {{#else}}                    {{it.button.bigText}}<span>&#xe615;</span>                    {{/if}}                </a>                {{#else}}                <a href="javascript:;" class="getquan">                    {{#if stat == "big" || stat == "mid"}}                        {{#if it.type == 3 || it.type == 4}}                            扫码参与                        {{#else}}                            扫码下单                        {{/if}}                    {{/if}}                    <div class="qrcode">                        <div class="qrcode_sm J_quanQrCodeS" data-link="{{it.link}}"></div>                        <div class="qrcode_big J_quanQrCodeBig">                            <div class="qrcode_ewm">                            </div>                            <h3 class="qrcode_msg">{{it.small.content}}</h3>                        </div>                        <s class="triangle"></s>                    </div>                </a>                {{/if}}            </div>{{/each}}';
        if (1 == i)
            var s = e(o).render({
                list: a,
                stat: "big"
            });
        else if (2 == i) {
            var s = e(o).render({
                list: a,
                stat: "mid"
            });
            J.addClass("detail-coupon-list")
        } else if (3 == i) {
            var s = e(o).render({
                list: a,
                stat: "small"
            });
            J.addClass("detail-coupon-list detail-coupon-lists")
        } else {
            n = a.slice(3),
            a.length = 3;
            var s = e(o).render({
                list: a,
                stat: "small"
            });
            s += '<div class="detail-coupon-more J_detail-coupon-more">                    展开更多<span>&#xe634;</span>                    </div>',
            J.addClass("detail-coupon-list detail-coupon-lists")
        }
        J.html(s).show(),
        n[0] && g.on(".J_detail-coupon-more", "click", function(a) {
            t.all(this).hide(),
            J.append(e(o).render({
                list: n,
                stat: "small"
            })),
            p(J),
            l(J)
        }),
        p(J),
        l(J)
    }
    function p(e) {
        var a = e.all(".J_quanQrCodeS");
        a.each(function(e, a) {
            if (!e.attr("data-stats")) {
                e.attr("data-stats", "true");
                var i = e.attr("data-link");
                new o(e[0],{
                    text: i,
                    width: 36,
                    height: 36,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: o.CorrectLevel.H
                }),
                e.attr("title", ""),
                e.next().hasClass("qrcode_big") && (t.one(".qrcode_ewm", e.parent()).attr("title", ""),
                new o(t.one(".qrcode_ewm", e.parent())[0],{
                    text: i,
                    width: 140,
                    height: 140,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: o.CorrectLevel.H
                }))
            }
        }),
        t.all(".J_detail-coupon-wrap").delegate("mouseenter", ".J_quanQrcode", function(e) {
            t.all(e.target).closest(".J_quanQrcode").addClass("hover")
        }),
        t.all(".J_detail-coupon-wrap").delegate("mouseleave", ".J_quanQrcode", function(e) {
            t.all(e.target).closest(".J_quanQrcode").removeClass("hover")
        })
    }
    function v() {
        w = m.get("#juId") && m.get("#juId").value,
        k = m.get("#itemId") && m.get("#itemId").value,
        w && k && t.io({
            type: "get",
            url: _ + "/detail/json/get_marketingActivity.json",
            dataType: "jsonp",
            timeout: 5,
            data: {
                juId: w
            },
            success: function(t) {
                t && t[0] && f(t)
            },
            error: function(t) {
                J.hide()
            }
        })
    }
    var m = t.DOM
      , g = t.Event
      , h = -1 !== window._ju_config.domain.indexOf("daily") ? "//dskip.ju.daily.taobao.net" : "//dskip.ju.taobao.com"
      , _ = -1 !== window._ju_config.domain.indexOf("daily") ? "//detail.ju.daily.taobao.net" : "//detail.ju.taobao.com"
      , b = h + "/promotion/json/apply_item_coupon.htm"
      , y = ".J_GetYouhui"
      , q = ".J_detail-coupon-wrap"
      , w = ""
      , k = ""
      , j = ""
      , J = t.all(q);
    return {
        init: v
    }
}, {
    requires: ["template", "jbc/julogin", "../apps/popup", "../apps/helper", "gallery/qrcode/1.0/", "core"]
});
KISSY.add("my/apps/popup", function(t) {
    var e = t.Event
      , i = t.DOM
      , s = function(t, e) {
        var i = Array.prototype.slice.call(arguments);
        return "function" == typeof t ? t.apply(e || this, i.slice(2)) : void 0
    }
      , o = ['<div class="ju-popup-mask"></div>', '<div class="ju-popup">', '<div class="hd">', "<h3>{{title}}</h3>", "</div>", '<div class="bd">{{content}}</div>', '<div class="ft">', '<div class="buttons"></div>', '<a href="#" title="关闭此窗口" class="btn-close">&times;</a>', "</div>", "</div>"].join("")
      , n = {
        title: "",
        type: "",
        content: "",
        useAnim: !1,
        autoShow: !0,
        wrapId: "",
        width: 350,
        hideMask: !1,
        focus: 0,
        adaptive: !1,
        hideHd: !1,
        hideFt: !1,
        keepShow: !1,
        buttons: [{
            style: "",
            text: "确定",
            func: function() {
                this.hide()
            }
        }]
    }
      , c = function(e, i) {
        this.context = i || document.body,
        this.config = t.merge(n, e || {}),
        this.init()
    };
    return c.prototype = {
        init: function() {
            var s = document.createElement("div")
              , n = this.config;
            "" !== n.wrapId && (s.id = n.wrapId),
            i.css(s, "display", "none"),
            t.isString(n.content) ? s.innerHTML = t.Template(o).render(n) : (s.innerHTML = t.Template(o).render(t.merge(n, {
                content: ""
            })),
            i.query(".bd", s)[0].appendChild(n.content)),
            n.hideMask && i.addClass(s, "ju-popup-hidemask"),
            i.addClass(s, "ju-popup-wrapper");
            var c = i.query(".ju-popup", s)[0];
            n.width && i.css(c, "width", n.width + "px"),
            n.type && i.addClass(c, n.type);
            var d = i.query(".buttons", c)[0]
              , p = 0
              , a = n.buttons
              , l = a.length;
            if (l)
                for (; l > p; p++) {
                    var h = document.createElement("button");
                    a[p].style && i.addClass(h, a[p].style),
                    h.innerHTML = "<span>" + a[p].text + "</span>",
                    e.on(h, "click", a[p].func, this),
                    d.appendChild(h)
                }
            else
                i.css(d, "display", "none");
            var r = i.query(".btn-close", c)[0];
            if (r && (n.keepShow && i.css(r, "display", "none"),
            e.on(r, "click", function(t) {
                t.halt(),
                this.hide()
            }, this, !0)),
            n.keepShow || e.on(document, "keypress", function(t) {
                27 == t.keyCode && this.hide()
            }, this, !0),
            6 == t.UA.ie || n.iframeShim) {
                var u = document.documentElement
                  , m = u.scrollTop || document.body.scrollTop
                  , y = u.scrollLeft || document.body.scrollLeft;
                i.css(s, "overflow", "hidden"),
                i.css(s, "position", "absolute"),
                i.css(s, "z-index", "999999"),
                i.css(s, "top", m + "px"),
                i.css(s, "left", y + "px");
                var f = document.createElement("iframe");
                f.setAttribute("frameborder", "0"),
                f.setAttribute("scrolling", "no"),
                f.src = "about:blank",
                f.style.cssText = "filter:alpha(opacity=0); position:absolute; top: 0px; left: 0px; z-index: -1;",
                i.css(f, "width", (u.clientWidth || document.body.clientWidth) - 20 + "px"),
                i.css(f, "height", (u.clientHeight || document.body.clientHeight) + "px"),
                i.css(s, "height", (u.clientHeight || document.body.clientHeight) + "px"),
                s.appendChild(f);
                var v, b = i.query(".ju-popup-mask", s)[0], w = function(e) {
                    var o = function() {
                        b && (i.css(b, "width", document.body.clientWidth + "px"),
                        i.css(b, "height", document.body.clientWidth + "px"));
                        var t = u.scrollTop || document.body.scrollTop
                          , e = u.scrollLeft || document.body.scrollLeft
                          , o = u.scrollHeight || document.body.scrollHeight;
                        t + (u.clientHeight || document.body.clientHeight) > o || (i.css(s, "top", t + "px"),
                        i.css(s, "left", e + "px"),
                        i.css(s, "zoom", "1.2"),
                        i.css(s, "zoom", ""))
                    };
                    v && v.cancel(),
                    v = t.later(o, 10)
                };
                e.on(window, "scroll", w, this),
                e.on(window, "resize", w, this),
                w()
            }
            if (this.context.appendChild(s),
            this.wrapper = s,
            this.popup = c,
            n.hideHd) {
                var g = i.query(".hd", c)[0];
                g && (i.css(g, "display", "none"),
                i.addClass(c, "no-hd"))
            }
            if (n.hideFt) {
                var x = i.query(".ft", c)[0];
                x && i.css(x, "display", "none")
            }
            n.autoShow && this.show()
        },
        adaptive: function() {
            var t = document.body.clientHeight
              , e = this.popup.offsetHeight
              , s = .7 * t;
            e > s && i.css(this.popup, "top", "10%")
        },
        show: function() {
            var e = this.config;
            e.onShow && s(e.onShow, this),
            i.css(this.wrapper, "display", ""),
            e.useAnim && (i.css(this.popup, "opacity", "0"),
            this.anim = new t.Anim(this.popup,{
                opacity: 1
            },.5,"easeNone",function() {}
            ),
            this.anim.run()),
            e.adaptive && this.adaptive()
        },
        hide: function() {
            var t = this.config;
            t.useAnim && this.animate && this.animate.stop(),
            i.css(this.wrapper, "display", "none"),
            t.onHide && s(t.onHide, this)
        },
        destroy: function() {}
    },
    c
}, {
    requires: ["core"]
});
KISSY.add("my/apps/helper", function(S, Template, Popup) {
    var DOM = (S.UA.ie ? S.UA.ie < 8 : !1, S.DOM) , doc = (S.Event, document)
      , Helper = {}
      , config = {
        apiLightww: "//amos.im.alisoft.com/mullidstatus.aw",
        apiToken: "comment:/json/token.htm"
    }
      , apiServers = {
        i: "//i.ju.{{serverHost}}",
        ju: "//ju.{{serverHost}}",
        skip: "//skip.ju.{{serverHost}}",
        portal: "//jianghu.{{serverHost}}",
        assets: "//{{cdnHost}}/apps/juassets",
        app: "//app.jianghu.{{serverHost}}",
        comment: "//comment.jianghu.{{serverHost}}",
        poke: "//poke.jianghu.{{serverHost}}",
        share: "//share.jianghu.{{serverHost}}",
        blog: "//blog.jianghu.{{serverHost}}",
        checkCode: "//comment.jianghu.{{serverHost}}/json/get_comment_check_code.htm",
        feedCheckCode: "//jianghu.{{serverHost}}/json/get_feed_comment_check_code.htm",
        fee: "//fee.ju.{{serverHost}}",
        item: "//item.ju.{{serverHost}}",
        seller: "//seller.ju.{{serverHost}}"
    }
      , pickDocumentDomain = function(e, t) {
        t = t || location.hostname,
        e = e || 2;
        for (var n = t.split("."), r = []; n.length > 0 && e > 0; )
            r.unshift(n.pop()),
            e--;
        return r.join(".")
    }
      , serverHost = (location.hostname,
    "taobao.com")
      , cdnHost = "assets.alicdn.com";
    "taobao.net" === pickDocumentDomain(2) ? (serverHost = "daily.taobao.net",
    cdnHost = "assets.daily.taobao.net") : "taobao.com" === pickDocumentDomain(2) && (serverHost = "taobao.com",
    cdnHost = "assets.alicdn.com");
    for (var p in apiServers)
        "string" == typeof apiServers[p] && (apiServers[p] = Template(apiServers[p]).render({
            serverHost: serverHost,
            cdnHost: cdnHost
        }));
    return apiServers.serverHost = serverHost,
    apiServers.cdnHost = cdnHost,
    S.mix(Helper, {
        test: function() {},
        checkLogin: function() {
            var e = DOM.get("#isLoginForJu");
            if (e)
                return "1" == e.value || "true" == e.value ? !0 : !1;
            var t = function(e) {
                var t = doc.cookie.match("(?:^|;)\\s*" + e + "=([^;]*)");
                return t && t[1] ? decodeURIComponent(t[1]) : ""
            };
            if (-1 == location.href.indexOf("taobao"))
                return !0;
            var n = t("_nk_")
              , r = t("_l_g_") && n;
            return !!r
        },
        checkAndShowLogin: function(e) {
            var t = this;
            if (t.checkLogin())
                return !0;
            e = e || {};
            var n = null;
            if (e.callback)
                n = e.callback;
            else if (e.autoCallback && arguments.callee.caller)
                try {
                    for (var r, o = arguments.callee.caller, a = o.arguments || [], i = e.callbackScope || {}, s = [], c = 0; c < a.length; ++c)
                        r = a[c],
                        S.isObject(r) && r.srcElement && (r = S.merge({}, r)),
                        s.push(r);
                    n = o ? function() {
                        try {
                            o && o.apply(i, s)
                        } catch (e) {}
                    }
                    : null
                } catch (u) {
                    n = null
                }
            if (window.UserCheck && window.UserCheck.init) {
                try {
                    document.domain = pickDocumentDomain(2)
                } catch (u) {}
                window.UserCheck.init({
                    width: 410,
                    height: 270,
                    isLogin: !0,
                    callback: function() {
                        n && n()
                    }
                })
            } else
                location.href = t.buildURI(t.getApiURI("portal:/admin/login.htm"), "redirect_url=" + encodeURIComponent(location.href));
            return !1
        },
        getApiURI: function(e, t, n) {
            if ("//" !== e.substr(0, 2) && "http://" !== e.substr(0, 7) && "https://" !== e.substr(0, 8) && e.indexOf(":") > 0) {
                var r = e.indexOf(":")
                  , o = apiServers[e.substr(0, e.indexOf(":"))] || "";
                "" !== o && (e = o + e.substr(r + 1))
            }
            if (t || (e = Helper.addStamp(e)),
            !n) {
                var a = DOM.get("#Jianghu_tb_token");
                if (a)
                    for (var i = a.getElementsByTagName("INPUT"), s = 0; s < i.length; s++)
                        e = Helper.buildURI(e, [i[s].name, encodeURIComponent(i[s].value)].join("="))
            }
            var c = TB.common.formatMessage(e, {
                serverHost: serverHost,
                cdnHost: cdnHost
            });
            return c
        },
        getServerURI: function(e) {
            return apiServers[e]
        },
        getDomain: function() {
            return serverHost
        },
        getHostDomain: function() {
            return location.protocol + "//" + location.host
        },
        getAssetsServer: function() {
            return window._ju_config && window._ju_config.assetsHost ? window._ju_config.assetsHost + "/apps/juassets" : apiServers.assets
        },
        addStamp: function(e) {
            return Helper.buildURI(e, "t=" + (new Date).getTime())
        },
        buildURI: function() {
            var e = Array.prototype.slice.call(arguments);
            if (e.length < 2)
                return e[0] || "";
            var t = e.shift();
            return t += t.indexOf("?") > 0 ? "&" : "?",
            t + e.join("&").replace(/&+/g, "&")
        },
        setToken: function(e, t) {
            setToken(e),
            t()
        },
        getToken: function(e) {
            this.setToken = function(t) {
                setToken(t),
                e && e()
            }
            ,
            S.getScript(Helper.buildURI(Helper.getApiURI(config.apiToken), "callback=Helper.setToken"), {
                charset: "gbk"
            })
        },
        cutStr: function(e, t) {
            if (t && t > 0) {
                var n = e.replace(/[^\x00-\xFF]/g, "ÿÿ");
                n.length > t && (e = e.substr(0, t - (n.substr(0, t).match(/[\xFF]/g) || []).length / 2),
                e += "...")
            }
            return e
        },
        formatMessage: function(e, t, n) {
            var r = /\{([\w-]+)?\}/g;
            return function(e, t, n) {
                return e.replace(r, function(e, r) {
                    return n ? n(t[r], r) : t[r]
                })
            }
        }(),
        createClick: function(e) {
            if (e = DOM.get(e))
                if (document.createEvent) {
                    var t = document.createEvent("MouseEvents");
                    t.initEvent("click", !0, !0),
                    e.dispatchEvent(t)
                } else
                    e.click()
        },
        messageBox: function(e, t) {
            var n = 1 == e ? 394 : 570
              , r = new Popup({
                width: n,
                content: t,
                title: "温馨提示:",
                type: "",
                buttons: [],
                autoShow: !1,
                useAnim: !0
            });
            return r.show(),
            r
        },
        addFavorite: function(e, t) {
            if (document.all)
                window.external.addFavorite(e, t);
            else {
                if (!window.sidebar)
                    return;
                window.sidebar.addPanel(t, e, "")
            }
        },
        getQuery: function(e) {
            for (var t = location.search.substring(1, location.search.length), n = t.split("&"), r = 0; r < n.length; r++) {
                var o = n[r].split("=");
                if (o[0] == e) {
                    var a = o[1];
                    break
                }
            }
            return a
        },
        getRadioValue: function(e, t) {
            t = t ? t : document;
            var n;
            if (n = DOM.filter("input", function(n) {
                return DOM.contains(t, n) && DOM.attr(n, "name") == e
            }),
            n.length > 0) {
                var r;
                for (r = 0; r < n.length; r++)
                    if (n[r].checked)
                        return n[r].value
            }
            return null
        },
        timeFormat: function(e, t) {
            var n = {
                "M+": e.getMonth() + 1,
                "d+": e.getDate(),
                "h+": e.getHours(),
                "m+": e.getMinutes(),
                "s+": e.getSeconds(),
                "q+": Math.floor((e.getMonth() + 3) / 3),
                S: e.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var r in n)
                new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
            return t
        },
        decimalDiv: function(arg1, arg2) {
            var r1, r2, t1 = 0, t2 = 0;
            try {
                t1 = arg1.toString().split(".")[1].length
            } catch (e) {}
            try {
                t2 = arg2.toString().split(".")[1].length
            } catch (e) {}
            with (Math)
                return r1 = Number(arg1.toString().replace(".", "")),
                r2 = Number(arg2.toString().replace(".", "")),
                r1 / r2 * pow(10, t2 - t1)
        },
        fireEvent: function(e, t, n) {
            var r;
            if (document.createEventObject) {
                var o = document.createEventObject();
                return r = e.fireEvent("on" + t, o),
                S.isFunction(n) && n.call(e),
                r
            }
            var o = document.createEvent("HTMLEvents");
            return o.initEvent(t, !0, !0),
            r = !e.dispatchEvent(o),
            S.isFunction(n) && n.call(e),
            r
        },
        recordClick: function(e, t) {
            var n = {
                cantuanitem: "jhs.1.1.1",
                cantuanlife: "jhs.1.1.2",
                jumpitem: "jhs.1.2.1",
                jumplife: "jhs.1.2.2",
                popupitem: "jhs.1.3.1",
                popuplife: "jhs.1.3.2",
                cantuanitemtj: "jhs.1.1.3",
                jumpitemtj: "jhs.1.2.3",
                popupitemtj: "jhs.1.3.3"
            }
              , r = -1 != location.pathname.indexOf("life") ? "life" : "item"
              , o = e + r;
            if (t = t || "",
            DOM.get("#keyword_abtest_token") && "true" == DOM.get("#keyword_abtest_token").value && (o += "tj"),
            n[o]) {
                var a = KISSY.one("#bucketId")
                  , i = a ? a.val() : ""
                  , s = new Image
                  , c = "_img_" + Math.random();
                window[c] = s,
                s.onload = s.onerror = function() {
                    window[c] = null
                }
                ,
                s.src = "//go.mmstat.com/" + n[o] + "?jhsitemid=" + t + "&bucketid=" + i,
                s = null
            }
        },
        sendStat: function(e, t) {
            if (e) {
                if (t = t || [],
                window.dynamicData && window.dynamicData.bucketId)
                    t.bucketid = window.dynamicData.bucketId;
                else {
                    var n = S.one("#bucketId")
                      , r = n ? n.val() : "";
                    t.bucketid = r
                }
                var o = S.param(t)
                  , a = new Image
                  , i = "_img_" + Math.random();
                window[i] = a,
                a.onload = a.onerror = function() {
                    window[i] = null
                }
                ,
                a.src = "//go.mmstat.com/" + e + "?" + o,
                a = null
            }
        }
    }),
    Helper
}, {
    requires: ["template", "./popup", "core"]
});
KISSY.add("my/apps/pic", function(a, e, t) {
    function l(e) {
        var t = a.one(e);
        a.all(".thumbnails li").removeClass("current"),
        t.addClass("current");
        var l = t.children("img")
          , r = a.one(".normal-pic .J_video")
          , n = a.one(".normal-pic .J_zoom")
          , o = a.one(".normal-pic .biz-wrap");
        if (l.attr("data-big"))
            target = n,
            r && r.addClass("hidden"),
            target.css({
                "background-image": "url(" + l.attr("data-normal") + ")"
            }),
            o && (l.attr("data-primary") ? o.css("display", "block") : o.css("display", "none"));
        else if (l.attr("data-video") && (target = r,
        n.addClass("hidden"),
        target.children("img").attr("src", l.attr("data-normal")),
        o && o.css("display", "none"),
        !(a.one(".normal-pic embed") && a.one(".normal-pic embed").attr("src") == l.attr("data-video") || (target.attr("data-video", l.attr("data-video")),
        target.children(".play").removeClass("hidden"),
        i)))) {
            var s = target.attr("data-video");
            target.children("img").addClass("hidden"),
            target.children(".play").addClass("hidden"),
            target.append('<embed quality="high" loop="0" width="100%" height="100%" allowscriptaccess="never" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="//get.adobe.com/cn/flashplayer/" flashVars="autoplay=false" src="' + s + '" />'),
            i = 1
        }
        target.removeClass("hidden")
    }
    function r() {
        a.all(".thumbnails li").on("mouseover", function() {
            var a = this;
            n && (clearTimeout(n),
            n = null),
            n = setTimeout(function() {
                l(a)
            }, 100)
        }).on("mouseout", function() {
            n && (clearTimeout(n),
            n = null)
        })
    }
    var i = (a.DOM,
    a.Event,
    0)
      , n = (['<object id="taohuaplayer" width="100%" height="100%" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">', '<param value="{{videoSrc}}" quality="high" width="100%" height="100%" allowScriptAccess="always" allowFullscreen="true" type="application/x-shockwave-flash" name="movie">', '<param value="autoplay=true" name="flashVars">', '<param value="transparent" name="wmode">', '<param value="high" name="quality">', '<param value="always" name="allowScriptAccess">', '<param value="true" name="allowFullScreen">', "</object>"].join(""),
    null);
    return {
        init: r
    }
}, {
    requires: ["core"]
});
KISSY.add("my/apps/timer", function(t, e) {
    var i = (t.DOM,
    t.Event,
    3e5)
      , n = '<p class="min"><span class="t{{minute0}}"></span><span class="t{{minute1}}"></span></p><span class="label">:</span><p class="sec"><span class="t{{second0}}"></span><span class="t{{second1}}"></span></p>'
      , r = '<p class="hour">{{hours}}</p><span class="label">:</span><p class="min">{{minutes}}</p><span class="label">:</span><p class="sec">{{seconds}}</p>'
      , s = function() {
        var s = function(e) {
            var i = {
                timeEnd: 0,
                timeCurrent: 0,
                timeLeft: 0,
                container: null,
                callback: null,
                template: null
            }
              , n = this;
            this.config = t.merge(i, e || {}),
            this._leftTime = 0,
            this._container = null,
            this._timeHandler = null,
            this._timeOffset = 0,
            this._domBox = null,
            n._init()
        };
        s.prototype = {
            _init: function() {
                if (this._valider()) {
                    var t = this._divider();
                    "1" == this.config.style ? this._display1(t) : this._display(t),
                    this._counter()
                }
            },
            _counter: function() {
                var t = this
                  , e = +new Date;
                this._timeHandler = setInterval(function() {
                    var i = +new Date;
                    if (t._leftTime -= i - e,
                    e = i,
                    t._leftTime < 0)
                        return void t.onOver();
                    var n = t._divider();
                    "1" == t.config.style ? t._display1(n) : t._display(n)
                }, 100)
            },
            _valider: function() {
                if (this._container = t.get(this.config.container),
                this._container && (this.config.timeLeft || this.config.timeEnd)) {
                    if (!this.config.timeCurrent) {
                        var e = new Date;
                        this.config.timeCurrent = e.getTime()
                    }
                    if (this._leftTime = this.config.timeLeft || this.config.timeEnd - this.config.timeCurrent,
                    this._leftTime <= 0) {
                        this._leftTime = 0;
                        var i = this._divider();
                        return "1" == this.config.style ? this._display1(i) : this._display(i),
                        void this.onOver()
                    }
                    return !0
                }
            },
            _divider: function() {
                var t, e, i, n, r, s, a = parseInt(this._leftTime / 1e3);
                return t = Math.floor(a / 3600),
                e = Math.floor(a / 60 % 60),
                i = Math.floor(a % 60),
                s = Math.floor(this._leftTime % 1e3 / 100),
                n = Math.floor(t / 24),
                r = t % 24,
                {
                    hours: t,
                    minutes: e,
                    seconds: i,
                    days: n,
                    hours24: r,
                    msecs: s
                }
            },
            _display: function(t) {
                var i = this.config.template || r
                  , n = e(i).render(t);
                this._container.innerHTML = n
            },
            _display1: function(e) {
                var i = this._divStr(e.hours)
                  , r = this._divStr(e.minutes)
                  , s = this._divStr(e.seconds)
                  , a = {};
                a.hour0 = i.charAt(0),
                a.hour1 = i.charAt(1),
                a.minute0 = r.charAt(0),
                a.minute1 = r.charAt(1),
                a.second0 = s.charAt(0),
                a.second1 = s.charAt(1);
                var c = t.Template(n).render(a);
                this._container.innerHTML = c
            },
            _replaceHtml: function(t, e) {
                var i = KISSY.get(t)
                  , n = i.cloneNode(!1);
                return n.innerHTML = e,
                i.parentNode.replaceChild(n, i),
                n
            },
            _divStr: function(t) {
                var e = "0" + t;
                return e = e.substr(e.length - 2, 2)
            },
            onOver: function() {
                try {
                    clearInterval(this._timeHandler)
                } catch (t) {}
                var e = this.config.callback;
                e && this._leftTime <= 0 ? e && e.call(this, this._container) : this._leftTime = 0
            },
            calibrate: function(t) {
                return this._leftTime <= 0 ? !1 : (this._timeOffset ? this._leftTime = this._timeOffset - t : this._timeOffset = t + this._leftTime,
                !0)
            }
        };
        var a = {
            _checkerRunner: null,
            _checkerOn: 0,
            _serverDate: 0,
            init: function() {
                if (!this._checkerOn) {
                    var t = this;
                    this._checkerRunner = setInterval(function() {
                        var e, i, n = t._getXMLHttpRequest();
                        n.onreadystatechange = function() {
                            4 == n.readyState && (e = new Date(n.getResponseHeader("date")),
                            i = e.getTime(),
                            t._calibrater(i))
                        }
                        ,
                        n.open("HEAD", "/sync.htm?" + Math.random()),
                        n.send(null)
                    }, i),
                    t._checkerOn = 1
                }
            },
            _getXMLHttpRequest: function() {
                try {
                    if (window.XMLHttpRequest)
                        return new XMLHttpRequest;
                    if (window.ActiveXObject)
                        return new ActiveXObject("MSXML2.XmlHttp")
                } catch (t) {}
            },
            _calibrater: function(e) {
                if (this._serverDate != e) {
                    var i = 0;
                    t.each(c, function(t) {
                        i = i || t._leftTime > 0,
                        t.calibrate(e)
                    }),
                    this._serverDate = e,
                    i || this._clearChecker()
                }
            },
            _clearChecker: function() {
                try {
                    clearInterval(this._checkerRunner)
                } catch (t) {}
                this._checkerOn = 0
            }
        }
          , c = [];
        return {
            create: function(t) {
                a.init();
                var e = new s(t);
                return c.push(e),
                e
            },
            remove: function(e) {
                t.inArray(e, c) && e.onOver()
            }
        }
    }();
    return s
}, {
    requires: ["template", "core"]
});
KISSY.add("my/apps/remind", function(e, n, i, t, s) {
    var o = e.DOM
      , a = e.Event
      , r = "//dskip.ju.taobao.com"
      , p = e.one("#J_remindAppTpl") ? e.one("#J_remindAppTpl").html() : "";
    p && (p = '<div class="appbox">' + p + "</div>"),
    -1 !== window._ju_config.domain.indexOf("daily") && (r = "//dskip.ju.daily.taobao.net");
    var c = r + "/json/message_remind.htm"
      , d = r + "/json/remind_action.htm"
      , u = t.getServerURI("i") + "/json/share/share_result.htm?_input_charset=utf-8"
      , l = 0
      , m = {
        FORM_OK: p + '<div class="cont">                <p class="rhd">亲，你喜欢哪种方式提醒你呢？统统免费哦！<br/>你可以在聚收藏找到我哦</p>                <div class="remind-form J_RemindPopForm">                    <form>                    <div class="form-li J_RemindWW">                        <div class="terms">                            <label><input type="checkbox" name="" {{#if ww!= 0 }} checked {{/if}} value="1" /></label>                            <span>阿里旺旺/旺信：<em>{{nick}}</em></span>                        </div>                    </div>                    <div class="form-li J_RemindPhone">                        <div class="terms">                            <label><input class="chk-phone" type="checkbox" {{#if sms!= 0 }} checked {{/if}} name="" value="1" /></label>                            <span>手机短信: </span>                            <span class="userPhone"><input name="userPhone" type="text" value="{{phone}}" disabled="disabled"/></span>                        </div>                    </div>                    <div class="form-li J_RemindValid" style="display:none">                          <div class="terms">                                <span>验证码: </span>                                <span><input name="checkcode" class="sms-valid" type="text" value="" /></span>                                <span><img class="valid-img" width="71" height="20" src="{{checkCodeUrl}}&_ts=" /></span>                                <span>看不清? </span>                                <span><a href="#" class="J_ValidFresh">换一张</a></span>                          </div>                    </div>                    <div class="form-li J_RemindClient">                        <div class="terms" style="width:220px;display:inline-block">                            <label><input class="chk-client" type="checkbox" name="" value="1" checked disabled /></label>                            <span style="width:180px">聚划算手机客户端 </span>                        </div>                    </div>                    <div class="msg attention"><p class="cont" style="display:none"></p></div>                    <input type="hidden" class="J_RemindType" name="remindType" value="-1" />                    <input type="hidden" class="J_RemindSessionId" name="sessionId" value="{{sessionId}}" />                    </form>                </div>            </div>',
        REMINDED: '<div class="cont">                      <p class="rhd">亲，你已对该商品设置了开团提醒！</p>                      <div class="remind-info">                      {{#if nick}}<p>阿里旺旺/旺信提醒: {{nick}}</p>{{/if}}                      {{#if phone}}<p>手机短信提醒: {{phone}}</p>{{/if}}                      {{#if laiwang}}<p>来往: {{laiwang}}</p>{{/if}}                      {{#if weibo}}<p>新浪微博: {{weibo}}</p>{{/if}}</div>                      <p class="r-tip">聚划算将在开团前通过{{normalTips}}通知你团购消息。</p>                      </div>',
        REMINDED_APP: '<div class="cont">                      <p class="rhd">亲，你已对该商品设置了开团提醒！</p>                      <div class="remind-info">                      <p>聚划算无线客户端: 消息提醒</p>                      </div>                      <p class="r-tip">聚划算将在开团前通过<span style="color:red;">{{normalTips}}</span>提醒您！</p>                      </div>',
        REMIND_OK: '<div class="cont success">                  <p class="rhd">操作成功！<br/>聚划算将在开团前通过<em>{{normalTips}}、桌面助手</em>通知你<br/>需桌面助手通知，请<a href="//download.taobaocdn.com/juhuasuan/jassistant_setup.exe" data-spm-protocol="i" target="_blank">下载安装</a></p>                  <p style="overflow:hidden;margin:0px 50px;">                      <span style="float:left;margin:15px 10px auto auto">您还可以扫描预下单</span>                      <div style="float:left;width:66px;height:66px;" class="J_MbQrCodeRemindSuccess"></div></p>                  </div>'
    }
      , h = {
        REMINDED_APP: {
            normalTips: "聚划算客户端"
        },
        REMINDED_WW: {
            nick: "",
            phone: "<em>未设置</em>",
            source: "0",
            normalTips: "阿里旺旺/旺信"
        },
        REMINDED_SMS: {
            nick: "<em>未设置</em>",
            phone: "",
            source: "0",
            normalTips: "免费短信"
        },
        REMINDED_SMS_AND_WW: {
            nick: "",
            phone: "",
            source: "0",
            normalTips: "阿里旺旺/旺信或免费短信"
        },
        WW_SUCCESSFULLY: {
            nick: "",
            phone: "",
            source: "0",
            normalTips: "阿里旺旺/旺信"
        },
        SMS_SUCCESSFULLY: {
            nick: "",
            phone: "",
            source: "0",
            normalTips: "免费短信"
        },
        SMS_AND_WW_SUCCESSFULLY: {
            nick: "",
            phone: "",
            source: "0",
            normalTips: "阿里旺旺/旺信与免费短信"
        },
        OK: {
            nick: "",
            phone: "",
            source: "0",
            sessionId: "",
            checkCodeUrl: "",
            ww: 0,
            sms: 0
        }
    }
      , f = function(n) {
        var i = this;
        i.type = "sms",
        i.result = "",
        i.pop = null,
        i.config = {
            manual: !1,
            container: "document",
            trigger_cls: null,
            checkState: !0,
            source: "0",
            area: null,
            form: null,
            addData: {},
            popup: null
        },
        i.config = e.merge(i.config, n),
        i.validResult = !0,
        i.init = function() {
            e.one(i.config.container) && e.one(i.config.trigger_cls) && i.bind(i.config.container)
        }
        ,
        i.config.manual || i.init()
    };
    return f.prototype = {
        bind: function(n) {
            var i = this;
            e.one(n).delegate("click", i.config.trigger_cls, function(e) {
                if (i.config.checkState) {
                    var n = o.get(".J_mainBox");
                    if (!o.hasClass(n, "notbegin"))
                        return
                }
                e.halt(),
                i.getRemind(),
                i.recordClick(e)
            })
        },
        getRemind: function() {
            var i = this
              , t = !0;
            n(function() {
                if (t) {
                    t = !1,
                    i.theForm = i.config.form || o.get(".J_BuySubForm", o.get(".J_mainBox"));
                    var n = {};
                    e.each(o.query("input", i.theForm), function(e) {
                        n[e.name] = e.value
                    }),
                    e.io({
                        url: c,
                        data: n,
                        success: function(e) {
                            i.dealResponse(e)
                        },
                        dataType: "jsonp"
                    })
                }
            })
        },
        recordClick: function(e) {
            var n = this;
            if (n.theForm) {
                var i = this.theForm.itemId && this.theForm.itemId.value || ""
                  , s = this.theForm.id && this.theForm.id.value || ""
                  , o = "tixing"
                  , a = e.posi ? e.posi : "main"
                  , r = {
                    itemid: i,
                    juid: s,
                    type: o,
                    posi: a
                };
                t.sendStat("jhs.6.1", r)
            }
        },
        hideCurrentPopup: function() {
            this.config.popup ? this.config.popup.hide() : "object" == typeof this["popup" + l] && this["popup" + l].hide()
        },
        checkForm: function() {
            function e() {
                var e = o.get(".J_RemindPhone", a.domPopup).getElementsByTagName("input")[1].value
                  , n = o.get(".J_RemindType", a.domPopup).value
                  , i = "1" == n || "1,2" == n;
                return i && !p.test(e) ? "手机号码格式错误" : !0
            }
            function n() {
                var e = o.get(".J_RemindType", a.domPopup);
                return "-1" == e.value ? "亲，旺旺和手机必须选一个哦！" : !0
            }
            for (var i, t = [e, n], s = t.length, a = this, r = !0, p = /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/; s--; )
                if (i = t[s](),
                i !== !0) {
                    r = !1,
                    this.showErrorMessage(i);
                    break
                }
            return r
        },
        sendOrderShareRequest: function() {
            function n() {
                return e.trim(s.userPhone)
            }
            function i() {
                return e.trim(s.itemId)
            }
            function t() {
                return e.get(".chk-phone", this.popupForm).checked
            }
            var s = {};
            e.each(o.query("input", this.popupForm), function(e) {
                s[e.name] = e.value
            }),
            n() && i() && t() && e.io({
                url: u,
                data: {
                    action: "/share/ShareAction",
                    event_submit_do_remind_early_order: "true",
                    itemId: i(),
                    phone: n()
                },
                success: function(e) {},
                dataType: "jsonp"
            })
        },
        dealResponse: function(n, i) {
            var t = this;
            if ("OK" == n.type)
                return t.result = "OK",
                void this.showRemind(n, "FORM_OK", "设置免费开团提醒", "pop-remind-formok", function(e, n) {
                    t.renderRemindPopup(e, n)
                });
            if (!t.config.manual || i)
                return "ERROR" == n.type ? (this.hideCurrentPopup(),
                void this.normalMsg(n.data.content, "error")) : "REMINDED_WW" == n.type || "REMINDED_SMS" == n.type || "REMINDED_SMS_AND_WW" == n.type ? (this.hideCurrentPopup(),
                void this.showRemind(n, "REMINDED", "查看开团提醒设置")) : "REMINDED_APP" == n.type ? (this.hideCurrentPopup(),
                void this.showRemind(n, "REMINDED_APP", "查看开团提醒设置")) : "WW_SUCCESSFULLY" == n.type || "SMS_SUCCESSFULLY" == n.type || "SMS_AND_WW_SUCCESSFULLY" == n.type ? (t.config.manual || this.hideCurrentPopup(),
                e.use("jbc/jufav", function(e, i) {
                    if (n.data.isNewCollect && "false" == n.data.isNewCollect)
                        i && i.addData(null, null, !1, ".J_JuSMSRemind i", 0, 0);
                    else {
                        window.JU_DETAIL_DYNAMIC ? JU_DETAIL_DYNAMIC.id : 0;
                        i && i.addData(null, null, !0, ".J_JuSMSRemind i", 0, 0)
                    }
                }),
                void (t.result = "SUCCESS")) : void ("CHECKCODE_ERROR" == n.type ? (this.showErrorMessage("验证码错误！"),
                this.refreshCCcode()) : this.systemBusy())
        },
        getNormalizedData: function(n) {
            if (!e.isPlainObject(n))
                return void this.systemBusy();
            var i = {
                nick: n.nick,
                phone: n.phone,
                source: n.source,
                sessionId: n.sessionId,
                checkCodeUrl: n.checkCode
            };
            return n.setType && (n.setType.ww && (i.ww = 1),
            n.setType.sms && (i.sms = 1)),
            i
        },
        showErrorMessage: function(e) {
            var n = o.get(".attention", this.domPopup).getElementsByTagName("P")[0];
            n && "1" == n.nodeType && (o.show(n),
            n.innerHTML = e),
            setTimeout(function() {
                o.hide(n)
            }, 2500)
        },
        setRemindType: function(e, n) {
            var i = o.get(".J_RemindType", this.domPopup)
              , t = e.checked
              , s = n.checked;
            t && !s ? i.value = "2" : !t && s ? i.value = "1" : t && s ? i.value = "1,2" : t || s || (i.value = "-1")
        },
        toggleCCArea: function(e) {
            var n = o.get(".J_RemindValid", this.domPopup);
            o[e ? "show" : "hide"](n)
        },
        refreshCCcode: function() {
            var e = /(\/\/(.*?)\?(.*?)&sessionid=(.*?)&)/
              , n = o.get(".valid-img", this.domPopup)
              , i = n.src.match(e)[1];
            n.src = i + "&_ts=" + +new Date
        },
        mergeForm: function() {
            for (var e = this.theForm.elements, n = 0, i = e.length; i > n; n++)
                if ("hidden" === e[n].type) {
                    var t = e[n].outerHTML;
                    this.popupForm.appendChild(o.create(t))
                }
        },
        renderRemindPopup: function(e, n) {
            var i = this.domPopup = e.popup || e
              , t = o.get(".J_ValidFresh", i)
              , s = o.get(".J_RemindWW", i).getElementsByTagName("input")[0]
              , r = o.get(".J_RemindPhone", i).getElementsByTagName("input")[0]
              , p = o.get(".J_RemindPhone", i).getElementsByTagName("input")[1]
              , c = o.get(".ok", this.domPopup)
              , d = this;
            this.popupForm = o.get("form", i),
            this["popup" + ++l] = e,
            s && a.on(s, "click", function(e) {
                d.setRemindType(this, r)
            }),
            r && a.on(r, "click", function(e) {
                var i = this.checked;
                d.setRemindType(s, this),
                1 != n.sms && d.toggleCCArea(i),
                p.disabled = !i
            }),
            r && a.on(p, "valuechange", function() {
                if (this.value != n.phone) {
                    var e = r.checked;
                    d.toggleCCArea(e)
                } else
                    d.toggleCCArea(0)
            }),
            t && a.on(t, "click", function(e) {
                e.preventDefault(),
                d.refreshCCcode()
            }),
            c && a.on(c, "click", function(e) {
                d.setRemind()
            }),
            this.setRemindType(s, r),
            this.mergeForm()
        },
        renderTemplate: function(n, i, t) {
            function s() {
                var s = e.Template(n).render(i);
                t(s)
            }
            e.use("template", function() {
                s()
            })
        },
        _shadowMerge: function(e, n) {
            for (var i in e)
                !e[i] && n[i] && (e[i] = n[i]);
            return e
        },
        showRemind: function(n, i, t, s, o) {
            var a = n.type
              , r = n.data
              , p = h[a]
              , c = m[i || a]
              , d = this
              , u = !("OK" != a);
            if (!a || !r || !p)
                return void this.systemBusy();
            var r = this._shadowMerge(p, this.getNormalizedData(r));
            r.source = this.config.source,
            this.renderTemplate(c, r, function(n) {
                var i = null;
                d.config.manual ? (d.config.area.innerHTML = n,
                i = d.config.area) : i = d.normalMsg(n, "", !0, t, u, s),
                e.isFunction(o) && o(i, r)
            })
        },
        setRemind: function(n) {
            var i = this;
            if (this.checkForm()) {
                var t = {};
                e.each(o.query("input", this.popupForm), function(e) {
                    t[e.name] = e.value
                }),
                t = e.merge(t, i.config.addData),
                e.io(s({
                    url: d,
                    data: t,
                    success: function(e) {
                        i.dealResponse(e, 1)
                    },
                    dataType: "jsonp",
                    crossDomain: !0,
                    cache: !1
                }, {
                    style: "taobao"
                }))
            }
        },
        normalMsg: function(n, t, s, o, a, r) {
            n = s ? n : '<div class="cont ' + t + '"><p class="rhd">' + n + "</p></div>";
            var p = this
              , c = "小提示";
            p.pop && p.pop.hide();
            var d = new i({
                iframeShim: e.UA.ie > 0 ? !0 : !1,
                width: 420,
                content: n,
                title: o || c,
                type: "pop-remind " + (r ? r : ""),
                buttons: [{
                    text: "确定",
                    style: "ok",
                    func: function() {
                        a || this.hide()
                    }
                }],
                autoShow: !1,
                useAnim: !0,
                onHide: function() {}
            });
            return d.show(),
            d
        },
        systemBusy: function() {
            var n = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧… </p><p class="busy"></p>'
              , t = new i({
                width: 394,
                content: n,
                title: "小提示",
                type: "pop-remind",
                keepShow: !0,
                buttons: [{
                    text: "继续团购",
                    style: "ok",
                    func: function() {}
                }],
                autoShow: !1,
                useAnim: !0,
                onHide: function() {}
            });
            t.show();
            var s = t.popup.getElementsByTagName("button")[0]
              , r = 1e3 * (Math.floor(6 * Math.random()) + 3);
            e.one(s).addClass("unavil"),
            a.detach(s, "click"),
            setTimeout(function() {
                var n = t.popup.getElementsByTagName("p")
                  , i = o.query(".btn-close", t.popup)[0];
                n[0].innerHTML = "OK，你可以继续操作了。",
                e.one(n[1]).css("display", "none"),
                e.one(s).removeClass("unavil"),
                e.one(i).css("display", "block"),
                a.on(s, "click", function() {
                    t.hide(),
                    location.reload()
                })
            }, r)
        }
    },
    {
        init: function(e) {
            new f(e)
        }
    }
}, {
    requires: ["jbc/julogin", "./popup", "./helper", "sd/data_sufei/sufei", "core"]
});
KISSY.add("my/apps/buy", function(e, t, a, n, s, i) {
    var r, o = e.Event, c = e.DOM, l = 0, p = "//trade.ju.taobao.com";
    -1 !== window._ju_config.domain.indexOf("daily") && (p = "//trade.ju.daily.taobao.net");
    var u = this
      , d = {
        systmeBusy: "系统繁忙: 人太多了, 休息一下, 等等吧… ",
        xiaoEr: "小二？你可不能买, 发扬小二精神吧, 把有限的商品让给无限的用户吧：） ",
        rate: "此宝贝规定买家信用在 {{rate}}心 以上, 你不能购买。",
        bought: "抱歉，你已经购买过这个宝贝了, 同一宝贝在当前团购活动中，只能购买一件。",
        limited: "抱歉，你今天在聚划算已经购买过{{num}}件宝贝了, 一天最多只能购买{{num}}件。 ",
        itemLimited: "抱歉，这件商品你已经购买了{{num}}件, 不能再参团了。这件商品每人最多可购买{{num}}件哦。 ",
        timeout: "抱歉，这个宝贝的团购结束了, 下回请早哦。 ",
        chance: "还有人未付款, {{ctime}}分钟内将陆续取消不付款订单, 也许你还有机会团到哦, 再等等吧。",
        soldOff: "抱歉，这个宝贝卖完了, 下回请早哦。",
        noAlipay: '抱歉，您没有注册支付宝帐号，无法购买，请先<a href="//lab.alipay.com/user/reg/index.htm" target="_blank">注册支付宝帐号</a>。',
        newOrder: ['<div class="order">', "<p>请务必在<strong>15分钟内</strong>下单, 并在下单后 <strong>{{checkTime}}分钟内</strong>完成支付, 否则您的订单将自动关闭。 </p>", '<p class="error-content smile">你的下单时间还有:  </p>', '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">', '<p class="hour"><span class="t0"></span><span class="t0"></span></p>', '<span class="label hour">时</span>', '<p class="min"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">分</span>', '<p class="sec"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">秒</span></div>', '{{#if hasSellerInfo}}<p class="popup-seller-info">{{seller}}商家是聚划算的高级认证商家，信誉良好，实力雄厚。您本次购买该商家的商品后，将{{receivingTime}}。</p>{{/if}}', '<p class="popup-seller-info remind">付款提醒: 拍下后（立刻购买或加入购物车结算参团）请及时付款以确保团购成功，付款遇到资金等问题也可“找人代付”。</p>', "</div>"].join(""),
        orderTimeout: ["<p>下单倒计时已经过期, </p><p>如果你还没有下单, 请重新选择聚划算团购宝贝。</p>", '<p class="error-content cry">时间已经到了! </p>', '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">', '<p class="hour"><span class="t0"></span><span class="t0"></span></p>', '<span class="label hour">时</span>', '<p class="min"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">分</span>', '<p class="sec"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">秒</span></div>'].join(""),
        ordered: ['<div class="order"><p>你已下单, 但未付款, 请在<strong>{{timeStr}}</strong>前付款, 否则你将失去购买到此宝贝的机会。</p>', '<p class="error-content smile">你的付款时间还有:  </p>', '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">', '<p class="hour"><span class="t0"></span><span class="t0"></span></p>', '<span class="label hour">时</span>', '<p class="min"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">分</span>', '<p class="sec"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">秒</span></div></div>'].join(""),
        nobankcard: ['<div class="title"><img src="//gtd.alicdn.com/tps/i4/T1HFx5Xk0uXXXXXXXX-189-25.png" /></div>', '<div><span class="icon"></span>', '<p class="error-content poor" style="height:auto;margin:15px 0;padding:5px 0 5px 70px;line-height:2em;">你尚未开通{{card}}快捷支付  (含卡通)服务, 请开通后继续参团。<br />只需两步, 开通成功后即可专享优惠价格!</p></div>', '<div style="text-align:center"><a href="{{cardurl}}" target="_blank" class="j-lngbtn">立即开通<b></b></a>', '<a class="j-lngbtn j-greenbtn" style="margin-left:10px;" href="/tg/today_items.htm" >更多团购<b></b></a></div>', '<a class="btn-close" title="关闭此窗口" href="#">×</a>'].join(""),
        WHITELIST_OK: '<div class="tips"><p>{{tipCount}}</p></div>',
        WHITELIST_FAIL: "很遗憾，您不能参加该商品的团购。<br />{{msg}}",
        ANSWER_FAIL: "很遗憾, 回答错误!",
        DD_NOTPOLLUSER: ["很遗憾，你不能参与此折上折抢购，只有在我想团中给此商品投过票的人才能参与。", '<p class="tip">你可以正式开团时用聚划算价购买。</p>'].join(""),
        DD_GRABOVER: ["很遗憾，你来晚了，折上折机会已经被抢光了。", '<p class="tip">你可以正式开团时用聚划算价购买，购买后将获得<em>5张选票奖励</em>。</p>'].join(""),
        DD_SUCCESS: ['<div class="dd-order">', "<p>恭喜你抢到了折上折购买机会！可以用折上折价<strong>&yen;{{price}}</strong> 购买，并将获得<strong>{{poll}}张选票奖励</strong>。</p>", '<p class="tip"><strong class="label">提示</strong>：请务必在10分钟内下单, 并在下单后30分钟内完成支付, 否则您的折上折机会将被取消。</p>', '<p class="time-tit">你的下单时间还有:  </p>', '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">', '<p class="hour"><span class="t0"></span><span class="t0"></span></p>', '<span class="label hour">时</span>', '<p class="min"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">分</span>', '<p class="sec"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">秒</span></div></div>'].join(""),
        ddOrderTimeout: ["<p>下单倒计时已经过期, </p><p>如果你还没有下单, 请重新选择聚划算团购宝贝。</p>", '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">', '<p class="min"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">分</span>', '<p class="sec"><span class="t0"></span><span class="t0"></span></p>', '<span class="label">秒</span></div>'].join(""),
        DD_HASGRABITEM: "亲，你已经享用了一次折上折价购买机会。如果还想购买，你可以在正式开团时用聚划算价购买。",
        TMALL_POINT_NOT_ENOUGH: "亲，你的天猫积分还不够哦！先买点低价折扣商品赚积分吧！",
        NOT_ENOUGH_99: "参拍此宝贝需要9.9大聚惠活动当天支付金额达到250元！快去再买点儿吧！",
        MOBILE_ACT_5S: ['<div class="m5s">', '<div class="qrcode J_qrcode_5s"></div>', '<div class="con">', "<p>该宝贝为聚划算客户端专场秒杀商品", "请用<strong>聚划算客户端</strong>扫码参与秒杀</p>", '<div class="info">如未安装请先扫码安装</div>', "</div>", "</div>"].join("")
    };
    return this.config = {},
    this.init = function(e) {
        if (!e)
            return void this.systemBusy();
        switch (e.type) {
        case "BUSY":
            this.systemBusy();
            break;
        case "HONOR_BUSY":
            this.normalMsg(e.data.msg, "smile", e);
            break;
        case "XIAOER":
            this.normalMsg(d.xiaoEr, "laugh");
            break;
        case "XINSHOUFA_NOT_PASS":
            this.normalMsg('<a class="XSFLINK" href="' + e.data.url + '" style="color:#2953a6" target="_blank">' + e.data.msg + "</a>", "smile");
            break;
        case "BOUGHT":
            this.normalMsg(d.bought, "smile");
            break;
        case "RATE":
            var a = t(d.rate).render({
                rate: e.data.rate
            });
            this.normalMsg(a, "cry");
            break;
        case "LIMITED":
            var a = t(d.limited).render({
                num: e.data.limit
            });
            this.normalMsg(a, "smile");
            break;
        case "ITEMLIMITED":
            var a = t(d.itemLimited).render({
                num: e.data.limit
            });
            this.normalMsg(a, "smile");
            break;
        case "TIMEOUT":
            this.normalMsg(d.timeout, "cry");
            break;
        case "CHANCE":
            var a = t(d.chance).render({
                ctime: e.data.msg
            });
            this.normalMsg(a, "smile");
            break;
        case "SOLDOFF":
            this.normalMsg(d.soldOff, "cry");
            break;
        case "NOALIPAY":
            this.normalMsg(d.noAlipay, "cry");
            break;
        case "NEWORDER":
            var n = e.data;
            this.newOrder(n.url, n.checktime, null, n.seller, n.receivingTime, n.ishow);
            break;
        case "ORDERED":
            this.ordered(e.data.ordertime, e.data.currtime, e.data.url);
            break;
        case "OK_REDIRECT":
            this.redirectTo(e.data.url);
            break;
        case "NOBANKCARD":
            this.noBankCard(e.data);
            break;
        case "WHITELIST_OK":
            this.newOrder(e.data.url, e.data.checktime, "whitelist");
            break;
        case "WHITELIST_FAIL":
            var a = t(d.WHITELIST_FAIL).render({
                msg: e.data.msg
            });
            this.normalMsg(a, "cry", "回馈团购");
            break;
        case "ANSWER_FAIL":
            var a = t(d.ANSWER_FAIL);
            this.normalMsg(a, "cry");
            break;
        case "NOT_ENOUGHT_HONOR":
            this.medalHandle.notEnoughMedal(e.data);
            break;
        case "NOT_ENOUGHT_HONOR_NUM":
            this.medalHandle.notEnoughMedalNum(e.data);
            break;
        case "ERROR":
            this.normalMsg(e.data.msg, "cry", "提示");
            break;
        case "ASSOCIATION_TG":
            this.buyAssociate(e.data.masterItemId);
            break;
        case "BUY_CHECKCODE_ERROR":
            this.captchaHandler.errorHandle();
            break;
        case "BUY_QUESTION_ERROR":
            this.captchaHandler.errorHandle();
            break;
        case "VIP":
            var s = e.data.limit || 1;
            this.buyLimit(s);
            break;
        case "ITEM_NOT_BEGIN":
            this.normalMsg(e.data.msg, "cry", "提示");
            break;
        case "DD_NOTPOLLUSER":
            this.normalMsg(d.DD_NOTPOLLUSER, "cry");
            break;
        case "DD_GRABOVER":
            this.normalMsg(d.DD_GRABOVER, "cry");
            break;
        case "DD_HASGRABITEM":
            this.normalMsg(d.DD_HASGRABITEM, "smile");
            break;
        case "DD_SUCCESS":
            this.newDDOrder(e.data);
            break;
        case "ANNIVERSARY":
            this.anniversaryMsg();
            break;
        case "JUHUI":
            this.couponHandler();
            break;
        case "AB":
            this.buyRelevance(e.data);
            break;
        case "JUHUI_PAID_NOT_ENOUGH":
            this.normalMsg(d.NOT_ENOUGH_99, "smile");
            break;
        case "NOTLOGIN":
            this.reLoginAndSubmit();
            break;
        case "TMALL_POINT_NOT_ENOUGH":
            this.normalMsg(d.TMALL_POINT_NOT_ENOUGH, "smile");
            break;
        case "5S":
            this.mobileAct5s(d.MOBILE_ACT_5S);
            break;
        default:
            this.systemBusy()
        }
    }
    ,
    this.reLoginAndSubmit = function() {
        e.get("#isLoginForJu") && (e.get("#isLoginForJu").value = "0");
        var t = !0;
        a(function() {
            t && (t = !1,
            e.one(".J_BuySubmit").fire("click"))
        })
    }
    ,
    this.buyRelevance = function(t) {
        var a = t.message ? t.message : "//act.ju.taobao.com/go/act/ju-love.php"
          , s = '<div class="error-content sad"><p>亲，请先购买下面指定商品，才能购买此商品哦！</p><p class=""> <a target="_blank" href="' + a + '">点击查看指定商品</a></p></div>'
          , i = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 420,
            content: s,
            title: "小提示",
            type: "pop-back",
            buttons: [{
                text: "关闭",
                func: function() {
                    this.hide()
                }
            }],
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        i.show()
    }
    ,
    this.couponHandler = function() {
        var t = '<div class="error-content sad"><p>亲，该商品只有今天9点后在整点聚参团过的用户才能拍哦！</p></div>'
          , a = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 400,
            content: t,
            title: "小提示",
            type: "pop-back",
            buttons: [{
                text: "确定",
                func: function() {
                    this.hide()
                }
            }],
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        a.show()
    }
    ,
    this.anniversaryMsg = function() {
        var t = "//www.taobao.com/go/act/sale/taobaoten.php"
          , a = '<div class="error-content sad"><p>对不起，你还没有领取淘宝十周年勋章。</p></div>'
          , s = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 400,
            content: a,
            title: "专享团提示",
            type: "pop-back",
            buttons: [{
                text: "马上去领",
                func: function() {
                    window.location.href = t
                }
            }, {
                text: "返回",
                func: function() {
                    this.hide()
                }
            }],
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        s.show()
    }
    ,
    this.captchaHandler = function() {
        function t(t) {
            for (handler in u)
                !function(a) {
                    var n = u[a];
                    if (a && e.isFunction(n) && "-1" != e.indexOf(a, s)) {
                        var i = n;
                        u[a] = function() {
                            var e = [].slice.call(arguments);
                            t(),
                            i.apply(u, e)
                        }
                    }
                }(handler)
        }
        function a() {
            r.closeCCPopup()
        }
        function n() {
            t(a)
        }
        var s = ["normalMsg", "newOrder", "buyAssociate", "ordered", "noBankCard"];
        return {
            init: n,
            errorHandle: function() {
                r.showErrorMessage()
            }
        }
    }(),
    this.buyLimit = function(e) {
        var t = {
            1: "该商品仅限vip会员购买",
            2: "该商品仅限<a class='vip v1'></a>级及以上会员购买",
            3: "该商品仅限<a class='vip v2'></a>级及以上会员购买",
            4: "该商品仅限<a class='vip v3'></a>级及以上会员购买",
            5: "该商品仅限<a class='vip v4'></a>级及以上会员购买",
            6: "该商品仅限<a class='vip v5'></a>级及以上会员购买",
            7: "该商品仅限<a class='vip v6'></a>级会员购买"
        }[e];
        this.normalMsg(t, "cry")
    }
    ,
    this.buyAssociate = function(t) {
        function a(e) {}
        function s() {}
        function i(t) {
            var t = t.replace(/\r|\n|\\|\t/g, "")
              , a = null;
            try {
                a = e.JSON.parse(t)
            } catch (n) {}
            return a
        }
        function r(t) {
            var a = new n({
                iframeShim: e.UA.ie > 0 ? !0 : !1,
                width: 570,
                content: t,
                title: "提示",
                type: "pop-associate",
                buttons: [{
                    text: "关闭",
                    func: function() {
                        this.hide()
                    }
                }],
                autoShow: !1,
                useAnim: !0,
                onHide: function() {}
            });
            return a.show(),
            a
        }
        function o(t) {
            var n = i(t)
              , o = n.type
              , c = n.data.content;
            o && "OK" == o ? e.trim(c) && a(r(c)) : s()
        }
        function c() {
            return document.getElementsByName("_tb_token_")[0].value
        }
        function l(t) {
            e.io({
                type: "GET",
                url: t,
                data: {
                    _tb_token_: c(),
                    _input_charset: "utf-8"
                },
                success: function(e) {
                    o(e)
                },
                error: function() {
                    s()
                }
            })
        }
        var u = p + "/trade/json/buy_item_association.htm";
        !function(e) {
            var t = u + "?masterItemId=" + e;
            l(t)
        }(t)
    }
    ,
    this.normalMsg = function(t, a, s) {
        var t = '<p class="error-content ' + a + '">' + t + "</p>"
          , i = s || "小提示"
          , r = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 394,
            content: t,
            title: i,
            type: "pop-ju",
            buttons: [{
                text: "确定",
                func: function() {
                    this.hide()
                }
            }],
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        r.show(),
        e.Event.on(".XSFLINK", "click", function() {
            r.hide()
        })
    }
    ,
    this.medalHandle = function() {
        function t(e, t, a) {
            return e.replace(/#\{(.*?)\}/g, function(e, n) {
                return a ? t : t[n] || ""
            })
        }
        function a(t) {
            var a = u.createElement("SPAN");
            return a.className = "md",
            e.each(t, function(e) {
                a.appendChild(i(e))
            }),
            a.outerHTML || (new XMLSerializer).serializeToString(a)
        }
        function i(e) {
            var t = u.createElement("A")
              , a = u.createElement("IMG");
            return a.setAttribute("src", e.honorImgUrl),
            a.setAttribute("alt", e.honorName),
            a.style.width = "24px",
            a.style.height = "24px",
            t.setAttribute("target", "_blank"),
            t.setAttribute("href", s.getServerURI("i") + "/honor/honor.htm?honorRule=" + e.honorRule),
            t.setAttribute("title", e.honorName),
            t.appendChild(a),
            t
        }
        function o(t) {
            return r.closeCCPopup(),
            new n({
                iframeShim: e.UA.ie > 0 ? !0 : !1,
                width: 400,
                content: t,
                title: "提示",
                hideHd: !1,
                hideFt: !1,
                type: "pop-medal-buy",
                autoShow: !1,
                useAnim: !0,
                buttons: [{
                    text: "查看更多活动",
                    func: function() {
                        window.open(p),
                        this.hide()
                    }
                }, {
                    text: "确定",
                    func: function() {
                        this.hide()
                    }
                }],
                onHide: function() {}
            })
        }
        function c(e) {
            var n = a(e.lackHonorList)
              , s = t(d.lackMedal, {
                medalList: n,
                channelType: e.channelType
            })
              , i = o(s);
            i.show()
        }
        function l(e) {
            var a = t(d.lackSum, e)
              , n = o(a);
            n.show()
        }
        var p = (KISSY,
        s.getServerURI("i") + "/activity/activity.htm")
          , u = document
          , d = {
            lackMedal: ['<div class="md-detail">', "<p>很遗憾，你不能享受勋章活动专享价，你还<br/>缺少：", "#{medalList}</p>", '<p class="md-tips state#{channelType}">你可以以普通聚划算价购买</p></div>'].join(""),
            lackSum: ['<div class="md-detail">', "<p>很遗憾，你不能享受勋章活动专享价，你还<br/>缺少：", '<em class="J_MedalSum">#{lackHonorNum}</em>枚勋章。</p>', '<p class="md-tips state#{channelType}">你可以以普通聚划算价购买</p></div>'].join("")
        };
        return {
            notEnoughMedal: c,
            notEnoughMedalNum: l
        }
    }(),
    this.noBankCard = function(a) {
        var s = t(d.nobankcard).render({
            card: a.card,
            cardurl: a.cardurl
        })
          , i = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 485,
            content: s,
            title: "小提示",
            hideHd: !0,
            hideFt: !0,
            type: "pop-ju",
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        i.show()
    }
    ,
    this.redirectTo = function(e) {
        var t = KISSY.all("meta").filter(function(e) {
            return "spm-id" == e.name
        }).attr("content") || "";
        t += ".12315.1024",
        window.location.href = e + "&spm=" + t
    }
    ,
    this.systemBusy = function() {
        var t = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧… </p><p class="busy"></p>'
          , a = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 394,
            content: t,
            title: "小提示",
            type: "pop-ju",
            keepShow: !0,
            buttons: [{
                text: "继续团购",
                func: function() {}
            }],
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        a.show();
        var s = a.popup.getElementsByTagName("button")[0]
          , i = 1e3 * (Math.floor(6 * Math.random()) + 3);
        c.addClass(s, "unavil"),
        o.detach(s, "click"),
        setTimeout(function() {
            var e = a.popup.getElementsByTagName("p")
              , t = c.query(".btn-close", a.popup)[0];
            e[0].innerHTML = "OK，你可以继续团购了。",
            c.css(e[1], "display", "none"),
            c.removeClass(s, "unavil"),
            c.css(t, "display", "block"),
            o.on(s, "click", function() {
                a.hide(),
                location.reload()
            })
        }, i)
    }
    ,
    this.newOrder = function(t, a, r, p, u, m) {
        function h(t) {
            function a() {
                l++;
                var t = e.DOM.create('<span class="remind"><input id="orderRemind' + l + '" type="checkbox"/><label for="orderRemind' + l + '">我知道了，不再提示</label></span>');
                c.appendChild(t),
                n()
            }
            function n() {
                var t = e.get("input", c);
                o.on(t, "click", function(e) {
                    var t = !!this.checked;
                    i(t)
                })
            }
            function i(t) {
                e.IO.jsonp(p, {
                    key: "step",
                    value: t ? "0" : "1"
                }, function(e) {})
            }
            function r(t) {
                c = e.get(".buttons", t.popup),
                a()
            }
            var c = null
              , p = s.getServerURI("i") + "/json/my/set_user_config_action.htm";
            r(t)
        }
        var f = KISSY.all("meta").filter(function(e) {
            return "spm-id" == e.name
        }).attr("content") || "";
        if (f += ".12315.1024",
        m && "false" == m)
            return void (window.location.href = t + "&spm=" + f);
        var v = new Date
          , b = v.getMinutes()
          , g = this;
        v.setMinutes(b + 15);
        var T, y = (v.getHours() + ":" + v.getMinutes(),
        {
            checkTime: a
        }), w = "小提示";
        p && u ? (y.seller = p,
        y.receivingTime = u,
        y.hasSellerInfo = !0) : y.hasSellerInfo = !1,
        T = KISSY.Template(d.newOrder).render(y),
        "whitelist" == r && (T = this.getWhiteListTip() + T,
        w = "回馈团购");
        var S = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 570,
            content: T,
            title: w,
            type: "pop-ju",
            buttons: [{
                style: "check order",
                text: "",
                func: function() {
                    this.hide(),
                    window.open(t + "&spm=" + f),
                    g.recordClick("jump", t)
                }
            }],
            autoShow: !1,
            adaptive: !0,
            useAnim: !0,
            onHide: function() {}
        });
        h(S),
        S.show(),
        d.orderTimeout = KISSY.Template(d.orderTimeout);
        var k = d.orderTimeout.render({})
          , _ = "<button><span>确定</span></button>"
          , O = c.query(".J_juItemTimer", S.popup)[0];
        i.create({
            timeEnd: 0,
            style: "1",
            timeCurrent: 0,
            timeLeft: 9e5,
            container: O,
            callback: function() {
                var e = c.query(".order", S.popup)[0];
                e.innerHTML = k;
                var t = c.query(".buttons", S.popup)[0];
                t.innerHTML = _;
                var a = t.getElementsByTagName("BUTTON")[0];
                o.on(a, "click", function() {
                    S.hide()
                })
            }
        }),
        g.recordClick("popup", t)
    }
    ,
    this.newDDOrder = function(a) {
        var s = a.url
          , r = this
          , l = t(d.DD_SUCCESS, {
            price: a.price,
            url: a.url,
            poll: a.poll
        })
          , p = "提示"
          , u = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 410,
            content: l,
            title: p,
            type: "pop-ju",
            buttons: [{
                style: "check order",
                text: "",
                func: function() {
                    this.hide(),
                    window.open(s),
                    r.recordClick("jump", s)
                }
            }],
            autoShow: !1,
            adaptive: !0,
            useAnim: !0,
            onHide: function() {}
        });
        u.show();
        var m = t(d.ddOrderTimeout)
          , h = "<button><span>确定</span></button>"
          , f = c.query(".J_juItemTimer", u.popup)[0];
        i.create({
            timeEnd: 0,
            style: "1",
            timeCurrent: 0,
            timeLeft: 6e5,
            container: f,
            callback: function() {
                var e = c.query(".dd-order", u.popup)[0];
                e.innerHTML = m;
                var t = c.query(".buttons", u.popup)[0];
                t.innerHTML = h;
                var a = t.getElementsByTagName("BUTTON")[0];
                o.on(a, "click", function() {
                    u.hide()
                })
            }
        }),
        r.recordClick("popup", s)
    }
    ,
    this.recordClick = function(e, t) {
        var a = t.match(/\/\/(.*?)id=(\d+?)&/)
          , n = a && a[2];
        n && s.recordClick(e, n)
    }
    ,
    this.ordered = function(a, s, r) {
        var l = 0;
        a ? (s || (s = (new Date).getTime()),
        l = a - s) : l = 9e5;
        var p = new Date;
        p.setTime(a);
        var u = p.getMinutes() + "";
        1 == u.length && (u = "0" + u);
        var m = p.getHours() + ":" + u
          , h = t(d.ordered).render({
            timeStr: m
        })
          , f = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 570,
            content: h,
            title: "小提示",
            type: "pop-ju",
            buttons: [{
                style: "check",
                text: "",
                func: function() {
                    this.hide(),
                    window.open(r)
                }
            }],
            autoShow: !1,
            adaptive: !0,
            useAnim: !0,
            onHide: function() {}
        });
        if (f.show(),
        0 > l) {
            var v = c.query(".buttons", f.popup)[0]
              , b = v.getElementsByTagName("BUTTON")[0];
            c.addClass(b, "unvil"),
            o.detach(b, "click")
        }
        var g = c.query(".J_juItemTimer", f.popup)[0];
        i.create({
            timeEnd: 0,
            timeCurrent: 0,
            style: "1",
            timeLeft: l,
            container: g,
            callback: function() {
                var e = c.query(".buttons", f.popup)[0]
                  , t = e.getElementsByTagName("BUTTON")[0];
                c.addClass(t, "unvil"),
                o.detach(t, "click")
            }
        })
    }
    ,
    this.exception = function() {
        var t = '<p class="error-content cry"></p><p class="busy"></p>'
          , a = new n({
            iframeShim: e.UA.ie > 0 ? !0 : !1,
            width: 394,
            content: t,
            title: "系统异常",
            type: "pop-ju",
            buttons: [{
                text: "确定",
                func: function() {
                    this.hide()
                }
            }],
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        a.show()
    }
    ,
    this.whitelist = function() {}
    ,
    this.getWhiteListTip = function() {
        var t = e.DOM.get(".J_TipTask");
        return t ? t.innerHTML : ""
    }
    ,
    this.mobileAct5s = function(t) {
        var a = new n({
            width: 464,
            content: t,
            title: "请用聚划算客户端购买",
            type: "pop-ju",
            keepShow: !0,
            buttons: [{
                text: "确定",
                func: function() {
                    this.hide(),
                    e.all(".ju-popup-wrapper").remove()
                }
            }],
            autoShow: !1,
            useAnim: !0,
            onHide: function() {}
        });
        a.show(),
        e.use("gallery/qrcode/1.0/", function(e, t) {
            new t(e.get(".J_qrcode_5s"),{
                text: e.one("#J_MbClientQrCode").val(),
                width: 85,
                height: 85,
                colorDark: "#000",
                colorLight: "#fff",
                correctLevel: t.CorrectLevel.H
            })
        })
    }
    ,
    {
        init: function(e, t) {
            r = t,
            u.captchaHandler.init(),
            u.init(e)
        }
    }
}, {
    requires: ["template", "jbc/julogin", "./popup", "./helper", "./timer", "core"]
});
KISSY.add("my/apps/float", function(e) {
    function o() {
        var o = e.one(".J_DetailTab")
          , i = o.parent(".detail-detail")
          , n = o.children(".extra")
          , t = i.offset().top
          , l = i.height()
          , s = e.one(window).scrollTop()
          , a = e.one(".J_sellerInfoTit")
          , r = o.one(".J_Fixseller");
        !r && a && (o.append('<div class="J_Fixseller fixseller">' + a.html() + "</div>"),
        r = o.one(".J_Fixseller")),
        s > t && t + l > s ? (o.addClass("fixToTop"),
        n.removeClass("hidden"),
        r.show()) : (o.removeClass("fixToTop"),
        n.addClass("hidden"),
        r.hide())
    }
    function i() {
        var o = e.one(".J_RightRecommend");
        if (o) {
            var i = o.parent(".J_RecommendWrap");
            if (i) {
                var n = i.offset().top
                  , t = o.height()
                  , l = e.one(window).scrollTop()
                  , s = e.one("#detail-left")
                  , a = e.one("#detail-right");
                if (s && a && (l + 60 >= n && s.height() + 60 < a.height() ? o.addClass("fixToTop") : o.removeClass("fixToTop"),
                e.one("#ju-footer"))) {
                    var r = e.one("#ju-footer").offset().top;
                    l + 60 + t >= r - 20 ? o.css("top", r - 20 - l - t) : o.css("top", 60)
                }
            }
        }
    }
    return {
        init: function() {
            o(),
            i(),
            e.one(window).on("scroll", function() {
                o(),
                i()
            })
        }
    }
}, {
    requires: ["core"]
});
KISSY.add("my/apps/share", function(t, n) {
    function a() {
        var a = {
            juid: t.all("#juId").val(),
            type: "share",
            state: window.dynamicData && window.dynamicData.status
        };
        n.sendStat("jhs.6.2", a)
    }
    return {
        init: function(n) {
            t.one(n) && t.one(n).on("click", function(e) {
                e.halt(),
                t.use("tbc/share/2.0.0/", function(t, a) {
                    a.init({
                        type: "item",
                        key: t.one(n).attr("data-itemid"),
                        client_id: "182163"
                    })
                }),
                a()
            })
        }
    }
}, {
    requires: ["./helper", "core"]
});
