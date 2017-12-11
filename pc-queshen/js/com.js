function getRatio() {
    var width = document.documentElement.clientWidth;
    width = width > 1920 ? 1920 : width;
    return width / 1920;
}
var ratio = getRatio()

function _g(a) {
    return "string" == typeof a ? document.getElementById(a) : a
}

function addEvent(a, b, c) {
    addEvent = a.addEventListener ? function(a, b, c) {
        a.addEventListener(b, c, !1)
    } : function(a, b, c) {
        a.attachEvent("on" + b, c)
    }, addEvent(a, b, c)
}

function addClass(a, b) {
    var c = a.className;
    return new RegExp("(^|\\s)" + b + "(\\s|$)", "i").test(c) || (a.className = c + (c.length > 0 ? " " : "") + b), a.className
}

function removeClass(a, b) {
    var c = new RegExp("(^|\\s)" + b + "(\\s|$)", "i");
    return a.className = a.className.replace(c, " ").replace(/^\s+|\s+$/g, ""), a.className
}

function WfireSilder() {
    function k() {
        iNow++, iNow > d.length - 1 && (iNow = 0), l()
    }

    function l() {
        for (g = 0; g < c.length; g++) c[g].className = "";
        c[iNow].className = "hove", startMove(c[iNow], {
            opacity: 100
        });
        var a = iNow;
        for (m(), g = 0; a > g; g++) i.unshift(i.pop());
        n()
    }

    function m() {
        for (g = 0; g < d.length; g++) i[g] = j[g]
    }

    function n() {
        for (g = 0; g < d.length; g++) {
            var a = d[g].getElementsByTagName("img")[0];
            startMove(a, {
                opacity: 75
            }), startMove(d[g], i[g], function() {
                o()
            }), d[g].className = ""
        }
        d[iNow].className = "hove"
    }

    function o() {
        for (g = 0; g < d.length; g++)
            if (Math.floor(480*ratio)+"px" == d[g].style.width) {
                var a = d[g].getElementsByTagName("img")[0];
                startMove(a, {
                    opacity: 100
                })
            }
    }
    var a = document.getElementById("part4-list"),
        b = document.getElementById("btns-arr"),
        c = b.getElementsByTagName("li"),
        d = a.getElementsByTagName("li"),
        e = a.getElementsByTagName("a"),
        f = getClass(b, "small")[0],
        g = iNow = 0,
        h = null,
        i = [],
        j = [{
            width: Math.floor(480*ratio),
            height: Math.floor(260*ratio),
            top: 0,
            left: Math.floor(186*ratio),
            zIndex: 10
        }, {
            width: Math.floor(320*ratio),
            height: Math.floor(174*ratio),
            top: Math.floor(56*ratio),
            left: 0,
            zIndex: 8
        }, {
            width: Math.floor(320*ratio),
            height: Math.floor(174*ratio),
            top: Math.floor(56*ratio),
            left: Math.floor(530*ratio),
            zIndex: 6
        }];
    for (g = 0; g < c.length; g++) c[g].index = g, myAddEvent(c[g], "click", function() {
        iNow = this.index, l()
    });
    for (g = 0; g < d.length; g++) d[g].index = g, d[g].style.width = j[g].width + "px", d[g].style.height = j[g].height + "px", d[g].style.top = j[g].top + "px", d[g].style.left = j[g].left + "px", d[g].style.zIndex = j[g].zIndex, i[g] = j[g], myAddEvent(d[g], "mouseover", function() {
        var a = this.getElementsByTagName("div")[0];
        startMove(a, {
            opacity: 0
        })
    }), myAddEvent(d[g], "mouseout", function() {
        if ((Math.floor(670*ratio)+"px") == this.style.width);
        else {
            var a = this.getElementsByTagName("div")[0];
            startMove(a, {
                opacity: 75
            })
        }
    }), myAddEvent(d[g], "click", function() {
        var a = this.index;
        for (iNow = this.index, m(), g = 0; a > g; g++) i.unshift(i.pop());
        n()
    });
    myAddEvent(e[0], "click", function() {
        i.unshift(i.pop()), n(), k()
    }), myAddEvent(e[1], "click", function() {
        i.push(i.shift()), n(), iNow--, 0 > iNow && (iNow = d.length - 1), l()
    }), f.onmouseover = a.onmouseover = function() {
        clearInterval(h)
    }, f.onmouseout = a.onmouseout = function() {
        clearInterval(h), h = setInterval(k, 5e3)
    }, h = setInterval(k, 5e3), o()
}

function getClass(a, b) {
    var c = document.getElementsByTagName("*"),
        d = [],
        e = 0;
    for (e = 0; e < c.length; e++) c[e].className == b && d.push(c[e]);
    return d
}

function myAddEvent(a, b, c) {
    a.attachEvent ? a.attachEvent("on" + b, function() {
        c.call(a)
    }) : a.addEventListener(b, c, !1)
}
function startMove(a, b, c) {
    var timer = null;
    a.timer && clearInterval(a.timer), a.timer = setInterval(function() {
        doMove(a, b, c)
    }, 30)
}

function getStyle(a, b) {
    return a.currentStyle ? a.currentStyle[b] : getComputedStyle(a, !1)[b]
}
function doMove(a, b, c) {
    var g, d = 0,
        e = "",
        f = !0;
    for (e in b) d = "opacity" == e ? parseInt(100 * parseFloat(getStyle(a, "opacity"))) : parseInt(getStyle(a, e)), isNaN(d) && (d = 0), g = navigator.userAgent.indexOf("MSIE 8.0") > 0 ? (b[e] - d) / 3 : (b[e] - d) / 5, g = g > 0 ? Math.ceil(g) : Math.floor(g), parseInt(b[e]) != d && (f = !1), "opacity" == e ? (a.style.filter = "alpha(opacity:" + (d + g) + ")", a.style.opacity = (d + g) / 100) : a.style[e] = "zIndex" == e ? d + g : d + g + "px";
    f && (clearInterval(a.timer), a.timer = null, c && c())
}

function vtab() {
    // var e, a = _g("mapNav"),
    //     b = a.getElementsByTagName("li"),
    //     c = b.length,
    //     d = 0;
    // for (e = 0; c > e; e++) addEvent(b[e], "click", function(a) {
    //     return function() {
    //         removeClass(b[d], "current"), addClass(b[a], "current");
    //         var c = b[a].getAttribute("data-src");
    //         _g("big-pic").src = c, d = a
    //     }
    // }(e))
}

function TGDialogS(a) {
    need("biz.dialog-min", function(b) {
        b.show({
            id: a,
            bgcolor: "#000",
            opacity: 50
        })
    })
}
window.onload = function() {
    var a, b;
    WfireSilder();
    // vtab(), a = document.getElementById("gameJs"), b = document.getElementById("floatBox"), a.onmouseover = function() {
    //     b.style.display = "block"
    // }, a.onmouseout = function() {
    //     b.style.display = "none"
    // }
};/*  |xGv00|896b2343e26f4b8fb998246354a18c39 */