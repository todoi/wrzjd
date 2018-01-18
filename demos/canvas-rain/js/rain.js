var misc = {
    setTitle: function(a) {
        $("title:first").text(WEBTITLE + a),
        clearTimeout(window.stTitleFlash),
        clearInterval(window.noticeFlag),
        setTimeout(misc.titleFlash, 16)
    },
    titleFlash: function() {
        var a = $("title:first")
          , b = a.text()
          , c = 0
          , d = 0
          , e = function() {
            /my\.php\?mod\=notify/.test(location.href) || !notify_sum_num && !private_pm_count || (window.noticeFlag = setInterval(function() {
                a.text((c ? "【　　　】" : "【新提醒】") + b),
                c = c ? 0 : 1,
                d++,
                d > 6 && (c = d = 0,
                clearInterval(window.noticeFlag),
                window.stTitleFlash = setTimeout(e, 3e3))
            }, 500))
        };
        e()
    },
    clearTitleFlash: function() {
        if (!notify_sum_num && !private_pm_count) {
            clearInterval(window.noticeFlag);
            var a = $("title:first");
            a.text(a.text().replace(/【.*】/, ""))
        }
    },
    isUndefined: function(a) {
        return "undefined" == typeof a ? !0 : !1
    },
    empty: function(a) {
        return "" == a.val() && !a.val().length
    },
    htmlspecialchars: function(a) {
        return a = a.replace(/&/g, "&amp;"),
        a = a.replace(/\</g, "&lt;"),
        a = a.replace(/\>/g, "&gt;"),
        a = a.replace(/\'/g, "&#039;"),
        a = a.replace(/\"/g, "&quot;")
    },
    unhtmlspecialchars: function(a) {
        return a = a.replace(/\&amp\;/g, "&"),
        a = a.replace(/\&lt\;/g, "<"),
        a = a.replace(/\&gt\;/g, ">"),
        a = a.replace(/\&#039\;/g, "'"),
        a = a.replace(/\&quot\;/g, '"')
    },
    getStrLength: function(a, b, c) {
        b || (b = 1),
        c || (c = .5);
        var d = 0
          , e = 0
          , f = 0;
        return 1 == b && .5 == c ? (d = Math.abs(a.replace(/[\x00-\xff]*/g, "").length),
        e = Math.abs(Math.ceil(a.replace(/[^\x00-\xff]*/g, "").length / 2)),
        f = d + e + "") : f = 2 == b && 1 == c ? Math.abs(a.replace(/[^\x00-\xff]/g, "**").length) : 3 == b && 1 == c ? Math.abs(a.replace(/[^\x00-\xff]/g, "***").length) : a.length,
        f
    },
    urlencode: function(a) {
        return encodeURIComponent(a)
    },
    urldecode: function(a) {
        return decodeURIComponent(a)
    },
    betweenLength: function(a, b, c, d) {
        var e = "string" == typeof a ? a : a.val()
          , f = d ? misc.getStrLength(e, 2, 1) : misc.getStrLength(e, 1, 1);
        return f >= b && c >= f
    },
    betweenEquis: function(a, b) {
        var c = "string" == typeof a ? a : a.val()
          , d = "string" == typeof b ? b : b.val();
        return c === d
    },
    bedFormat: function(a, b) {
        var c = "string" == typeof a ? a : a.val();
        return !b.test(c)
    },
    isNumber: function(a) {
        return !isNaN(a)
    },
    maxWidth: function() {
        return Math.max(document.documentElement.clientWidth, document.body.offsetWidth)
    },
    maxHeight: function() {
        return Math.max(document.documentElement.clientHeight, document.body.offsetHeight)
    },
    maxViewWidth: function() {
        return $(window).width()
    },
    maxViewHeight: function() {
        return $(window).height()
    },
    random: function(a, b) {
        return parseInt(Math.random() * (b - a + 1) + a)
    },
    timestamp: function() {
        return Date.parse(new Date) / 1e3
    },
    timestamp_ms: function() {
        return Date.parse(new Date)
    },
    convertSize: function(a) {
        var b, c, d;
        return a ? (b = ["b", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"],
        c = Math.floor(Math.log(a) / Math.log(1024)),
        d = c > 1 ? 2 : 0,
        (a / Math.pow(1024, Math.floor(c))).toFixed(d) + b[c]) : "0 Bytes"
    },
    getVideoSwf: function(a, b) {
        var c, d, e, f, g, h, i, j, k;
        try {
            if (c = null,
            !a)
                return !1;
            switch (c = a.match(/http:\/\/(.*?)?\.(.*?)?\.com\/(.*)/),
            d = c[2],
            e = c[1],
            f = ".swf".indexOf(c[3]) > 0,
            g = c[3].substr(0, 1),
            h = "",
            d) {
            case "youku":
                "player" == e ? h = a : "v" == e ? (i = a.match(/http:\/\/v\.youku\.com\/v_show\/id_(.*)?\.html/),
                h = "http://static.youku.com/v/swf/qplayer.swf?VideoIDS=" + i[1].replace("/", "") + (b ? "&isAutoPlay=true" : "")) : h = a;
                break;
            case "tudou":
                f ? h = a : (g = "p" == g ? "v" : g,
                i = a.match(/http:\/\/www.tudou\.com\/(.*)?\/(.*)?/),
                str_arr = i[1].split("/"),
                j = str_arr.length,
                k = "",
                1 == j ? k = i[2].split(".")[0] : 2 == j ? k = str_arr[1] : 3 == $count && (k = str_arr[2]),
                h = "http://www.tudou.com/" + g + "/" + k + (b ? "&autoPlay=true" : "") + "/v.swf");
                break;
            case "qq":
                f ? h = a : (i = a.match(/vid\=(\w*)/),
                h = "http://static.video.qq.com/TPout.swf?vid=" + i[1] + (b ? "&auto=1" : ""));
                break;
            case "letv":
                f ? h = a : (i = a.match(/(\d*)\.html/),
                h = "http://www.letv.com/player/swfPlayer.swf?id=" + i[1] + (b ? "&autoplay=1" : "&autoplay=0"));
                break;
            case "ku6":
                f ? h = a : (i = a.match(/show\/(.*)\.{1}/),
                h = "http://player.ku6.com/refer/" + i[1] + "/v.swf" + (b ? "&auto=1" : ""));
                break;
            case "yinyuetai":
                f ? h = a : (i = a.match(/video\/(\d*)/),
                h = "http://player.yinyuetai.com/video/player/" + i[1] + "/" + (b ? "a" : "v") + "_0.swf");
                break;
            case "ifeng":
                f ? h = a : (i = a.match(/([\w-]*)(\.shtml|)$/),
                h = "http://v.ifeng.com/include/exterior.swf?guid=" + i[1] + (b ? "&AutoPlay=true" : ""));
                break;
            default:
                h = ""
            }
        } catch (l) {
            h = a
        }
        return h
    },
    loadjs: function(a, b) {
        var c, d;
        (a.indexOf(".w3cfuns.") > 0 || a.indexOf("res/") > 0) && (a = a.replace(".js", js_loadmin + ".js")),
        1 == $("script[src*=" + a.replace(/\:/g, "\\:").replace(/\//g, "\\/").replace(/\./g, "\\.") + "]").length ? b && b() : (c = document.createElement("script"),
        d = $(c),
        c.type = "text/javascript",
        c.src = a.replace(/\\:/, ":") + (a.indexOf("?") >= 0 ? "&" : "?") + VERHASH,
        document.body.appendChild(c),
        c.onload = c.onreadystatechange = function() {
            var a = d.data("isload");
            this.readyState && "loaded" != this.readyState && "complete" != this.readyState || a || (d.data("isload", !0),
            b && b())
        }
        )
    },
    loadcss: function(a, b) {
        var d, c = a.split("/");
        "plugin" == c[0] || "common" == c[0] ? a = CSSPATH.replace("styles", "styles/" + c[0]) : "global" == c[0] && (a = CSSPATH),
        a = a + STYLEID + "_" + c[1],
        1 == $("link[href*=" + a.replace(/\//g, "\\/").replace(/\./g, "\\.") + "]").length ? b && b() : (d = document.createElement("link"),
        d.type = "text/css",
        d.rel = "stylesheet",
        d.href = a.replace(/\\:/, ":") + "?" + VERHASH,
        $("head").append(d),
        d.onload = d.onreadystatechange = function() {
            (!this.readyState || "loaded" == this.readyState || "complete" == this.readyState) && b && b()
        }
        )
    },
    fromRequest: function(a, b, c, d, e) {
        var g, h, i, f = $("<form></form>");
        f.attr({
            "class": "hidden",
            action: a,
            method: (c ? c : "get").toUpperCase(),
            target: d ? d : "_blank"
        }),
        e ? ($("html").data("init")(),
        f.append('<input name="formhash" value="' + formHash + '"/>'),
        e = "_" + formHash) : e = "",
        g = "",
        h = "";
        for (i in b)
            "object" == typeof b[i] ? (g = b[i]["nohash"] ? i : i + e,
            h = b[i]["val"]) : (g = i + e,
            h = b[i]),
            f.append('<input name="' + g + '" value="' + h + '"/>');
        $("body").append(f),
        f.submit()
    },
    refresh_seccode: function(a) {
        a.attr("src", "misc.php?mod=seccode&update=" + misc.random(1, 999999999) + "&idhash=" + a.data("hash"))
    },
    geetest: function(a, b) {
        var c = $("[data-geetest=true]")
          , d = null
          , f = null
          , g = null;
        return c.length > 0 && (f = function(d) {
            misc.loadjs(d.script.replace(/\//, "/"), function() {
                var e = function(b) {
                    b.appendTo(c),
                    b.onReady(function() {
                        c.find(".gt_slider div").attr("style", "font-size:14px!important; font-family:arial,verdana,Microsoft YaHei,Tahoma,Simsun,sans-serif!important;"),
                        c.find(".gt_guide_tip:first").text("请向右拖动滑块，完成验证。")
                    }),
                    b.onStatusChange(function() {
                        c.find(".gt_info_tip .gt_info_text span").attr("style", "font-family:arial,verdana,Microsoft YaHei,Tahoma,Simsun,sans-serif!important")
                    }),
                    b.onSuccess(function() {
                        var c = b.getValidate();
                        !!c && !!a && a([b, [c.geetest_challenge, c.geetest_validate, c.geetest_seccode]])
                    })
                };
                window.initGeetest ? initGeetest({
                    gt: d.gt,
                    challenge: d.challenge,
                    product: b ? b : "float",
                    offline: !d.success
                }, e) : (g = new window.Geetest({
                    gt: d.gt,
                    challenge: d.challenge,
                    product: b ? b : "float",
                    offline: !d.success
                }),
                e(g))
            })
        }
        ,
        d = {
            mod: "common",
            inc: "validate",
            "do": "geetest",
            ajaxsub: !0,
            formhash: formHash,
            randoms: Math.random()
        },
        $.ajax({
            type: "POST",
            cache: !1,
            url: "ajax.php",
            dataType: "json",
            data: $.param(d),
            success: function(a) {
                f(a)
            }
        }),
        window.gt_custom_ajax = function(b, c) {
            var e, f, g, h;
            b && ("function" == typeof c ? (e = [c(".geetest_challenge"), c(".geetest_validate"), c(".geetest_seccode")],
            f = e[0].value,
            g = e[1].value,
            h = e[2].value) : (e = $("#" + c + " input"),
            f = e.eq(0).val(),
            g = e.eq(1).val(),
            h = e.eq(2).val()),
            !!a && a([f, g, h]))
        }
        ),
        !1
    },
    support_css3: function(a) {
        var c, b = ["webkit", "Moz", "ms", "o"], d = [], e = document.documentElement.style, f = function(a) {
            return a.replace(/-(\w)/g, function(a, b) {
                return b.toUpperCase()
            })
        };
        for (c in b)
            d.push(f(b[c] + "-" + a));
        d.push(f(a));
        for (c in d)
            if (d[c]in e)
                return !0;
        return !1
    },
    setCopy: function(a, b, c, d) {
        a.hide();
        var e = this;
        e.loadjs(RESJSPATH + "plugin/clipboard/ZeroClipboard.js", function() {
            a.mouseover(function() {
                a.data("stylehover") ? a.data("styledefault") || a.data("styledefault", a.css(["color", "border-color", "background-color"])) : a.data("stylehover", a.css(["color", "border-color", "background-color"]))
            }),
            a.data("text", a.html()),
            setTimeout(function() {
                a.fadeIn(),
                ZeroClipboard.config({
                    moviePath: RESSWFPATH + "clipboard/ZeroClipboard.swf"
                });
                var e = new ZeroClipboard(a);
                e.on("load", function() {
                    e.on({
                        mouseOver: function() {
                            a.css(a.data("stylehover")),
                            d && d("over")
                        },
                        mouseOut: function() {
                            a.removeAttr("style"),
                            d && d("out")
                        },
                        mouseDown: function() {
                            e.setText(b)
                        },
                        complete: function() {
                            a.html(c),
                            setTimeout(function() {
                                a.html(a.data("text")).blur()
                            }, 1500)
                        }
                    })
                }),
                e.on("noflash wrongflash", function() {
                    misc.support_flash(),
                    ZeroClipboard.destroy()
                })
            }, 3e3)
        })
    },
    induction_position: function(a, b) {
        var c = a.width()
          , d = a.height()
          , e = 0
          , f = {}
          , g = (b.pageX - a.offset().left - c / 2) * (c > d ? d / c : 1)
          , h = (b.pageY - a.offset().top - d / 2) * (d > c ? c / d : 1);
        switch (e = Math.round((Math.atan2(h, g) * (180 / Math.PI) + 180) / 90 + 3) % 4) {
        case 0:
            f.left = 0,
            f.top = "-100%";
            break;
        case 1:
            f.left = "100%",
            f.top = 0;
            break;
        case 2:
            f.left = 0,
            f.top = "100%";
            break;
        case 3:
            f.left = "-100%",
            f.top = 0
        }
        return f
    },
    share: function(a, b, c, d, e, f) {
        var g, h, i, j;
        f = f ? f : location.href,
        g = (e ? e : "") + b + " 感兴趣，就猛戳：" + f + " (分享来自 @前端网W3Cfuns - WEB前端开发工程师专业网站，一站式服务平台)",
        b += " (分享来自 @前端网W3Cfuns - 前端开发工程师互动平台)",
        h = 510,
        i = 495,
        j = new StringBuffer,
        c && c.length > 0 && c.each(function(a, b) {
            j.append(encodeURIComponent(b.src))
        }),
        "sina_weibo" == a ? url = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(g) + (j.array.length ? "&pic=" + j.array[0] : "") : "tencent_weibo" == a ? url = "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + encodeURIComponent(g) + (j.array.length ? "&pic=" + j.toString("|") : "") : "qq_firend" == a ? (h = 750,
        i = 600,
        url = "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(f) + "&title=" + encodeURIComponent(b) + (d ? "&summary=" + d : "") + (j.array.length ? "&pic=" + j.toString("|", !0) : "")) : "qqzone" == a && (h = 600,
        i = 450,
        url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(f) + "&title=" + encodeURIComponent(b) + (d ? "&summary=" + d : "") + (j.array.length ? "&pic=" + j.toString("|", !0) : "")),
        ("sina_weibo" == a || "tencent_weibo" == a || "qq_firend" == a || "qqzone" == a) && misc.win_popup(url, "分享", h, i, !0)
    },
    support_flash: function(a) {
        ISMOBILE || localStorage.supportFlashTipNo || showDialog("text", "重要提示", a ? "无法加载Flash，可能没有正确安装 Adobe Flash Player，是否去官网下载并安装？" : "此页面需要Flash的支持，您的系统或浏览器没有安装 Adobe Flash Player 组件，是否去官网下载并安装？", {
            key: "support_flash",
            button1style: "btn-default",
            button2style: "btn-primary",
            modal: !0
        }, "不再提示", function() {
            localStorage.supportFlashTipNo = !0
        }, "立即安装", function() {
            window.open("http://www.adobe.com/go/getflash"),
            showDialog("info", "重要提示", "如果FlashPlayer已安装完毕，请点击下方刷新按钮即可，若是刷新后无效，一般重启浏览器即可。", {
                modal: !0
            }, "刷新", function() {
                location.reload(!0)
            })
        }, [{
            text: "暂不安装",
            style: "btn-danger",
            fn: function() {
                closeDialog("support_flash")
            }
        }])
    },
    launchFullscreen: function(a) {
        a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : window.open(a.src)
    },
    placeholder: function(a) {
        !(a instanceof jQuery) && (a = $(a)),
        BROWSER.ie <= 9 && $(function() {
            try {
                a.placeholder()
            } catch (b) {}
        })
    },
    win_popup: function(a, b, c, d, e) {
        var h, f = 0, g = 0;
        return c > 0 && d > 0 && (f = (screen.width - c) / 2,
        g = (screen.height - d) / 2,
        e && (e += ", left=" + f + ", top=" + g + ", width=" + c + ", height=" + d + "toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no",
        e = e.replace(/^,/, ""))),
        h = window.open(a, b, e),
        h.focus(),
        h
    },
    win_close: function() {
        try {
            BROWSER.ie && (window.opener = null),
            window.open("", "_self", ""),
            window.close()
        } catch (a) {
            try {
                window.opener = null,
                window.open("", "_self"),
                window.close()
            } catch (a) {
                window.close()
            }
        }
    }
}
!function(a) {
    a(function() {
        var b = function(b, c) {
            function m(a, b, c, d) {
                this.speed = b,
                this.xPos = c,
                this.yPos = d,
                this.opacity = -.03 + a / 10,
                this.counter = 0
            }
            function n(a, b, c, d, f, g) {
                e.moveTo(a.xPos + a.counter * i * b, a.yPos + a.counter),
                e.bezierCurveTo(a.xPos + a.counter * i * b + c * b, a.yPos + a.counter + d, a.xPos + a.counter * i * b + f * b, a.yPos + a.counter + g, a.xPos + a.counter * i * b, a.yPos + a.counter)
            }
            function o() {
                for (var a = 0; h > a; a++) {
                    var b = Math.round(Math.random() * f * i + f);
                    "right" == c ? b *= -1 : "left" != c && (b = Math.round(Math.random() * f * i + 1));
                    var d = -1 * Math.round(Math.random() * g * 2 + 50)
                      , e = 5 + 5 * Math.random()
                      , k = Math.floor(10 * Math.random() + 1)
                      , b = new m(k,e,b,d);
                    j.push(b)
                }
                p()
            }
            function p() {
                e.clearRect(0, 0, f, g);
                for (var a = 0; a < j.length; a++)
                    j[a].update();
                l = k(p)
            }
            var d = a(b)
              , e = d[0].getContext("2d")
              , f = misc.maxViewWidth()
              , g = misc.maxViewHeight();
            d.attr({
                width: f,
                height: g
            });
            var l, h = 5e3, i = 1, c = "left", j = [], k = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            m.prototype.update = function() {
                this.counter += this.speed,
                this.yPos + this.counter > g && (this.xPos = Math.round(Math.random() * f * i + f),
                "right" == c ? this.xPos = -1 * Math.round(Math.random() * f * i + 25) : "left" != c && (this.xPos = Math.round(Math.random() * f + 1)),
                this.yPos = -1 * Math.round(Math.random() * g * 2 + 1),
                this.counter = 0),
                e.beginPath(),
                "left" == c ? n(this, -1, 7, 10, 11, 5) : "right" == c ? n(this, 1, 7, 10, 11, 5) : (i = 0,
                n(this, 1, 0, 15, 3, 20)),
                e.fillStyle = "rgba(255, 255, 255," + this.opacity.toFixed(2) + ")",
                e.fill()
            }
            ,
            o()
        };
        b("#rain_canvas", "left")
    })
}(jQuery);
