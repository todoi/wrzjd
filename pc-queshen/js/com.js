//_g 输入id 返回elementNode
function _g(a) {
    return "string" === typeof a ? document.getElementById(a) : a
}

//a 是elementNode
//b 是event
//c 是handle
function addEvent(a, b, c) {
    if (a.addEventListener) {
        addEvent = function (a, b, c) {
            a.addEventListener(b, c, !1)
        }
    } else {
        addEvent = function (a, b, c){
            a.attachEvent("on" + b, c)
        }
    }
    addEvent(a, b, c)
}
//     addEvent = a.addEventListener ? function(a, b, c) {
//         a.addEventListener(b, c, !1)
//     } : function(a, b, c) {
//         a.attachEvent("on" + b, c)
//     }, addEvent(a, b, c)
// }

//判断a 是否有class b, 如果没有就添加，如果有就不添加，最后都是返回 a的className 字符串
function addClass(a, b) {
    var c = a.className;
    return new RegExp("(^|\\s)" + b + "(\\s|$)", "i").test(c) || (a.className = c + (c.length > 0 ? " " : "") + b), a.className
}

//删除a 上的class b，最后都是返回 a的className 字符串
function removeClass(a, b) {
    var c = new RegExp("(^|\\s)" + b + "(\\s|$)", "i");
    return a.className = a.className.replace(c, " ").replace(/^\s+|\s+$/g, ""), a.className
}

function WfireSilder() {
    //更新index
    function k() { //updateIndex
        iNow++, iNow > d.length - 1 && (iNow = 0), l()
    }

    //重置小圆点的className，为激活圆点加 "hove" class ,开始移动
    function l() { //updateDot
        for (g = 0; g < c.length; g++) c[g].className = "";
        c[iNow].className = "hove", startMove(c[iNow], {
            opacity: 100
        });
        //变换图片宽高数组的顺序
        var a = iNow;
        for (m(), g = 0; a > g; g++) i.unshift(i.pop());
        n()
    }

    //copy 图片的宽高位置到 i 数组
    function m() {
        for (g = 0; g < d.length; g++) i[g] = j[g]
    }

    //每张图移动
    function n() { //updateSlide
        for (g = 0; g < d.length; g++) {
            var a = d[g].getElementsByTagName("img")[0];
            startMove(a, { opacity: 75 })
            startMove(d[g], i[g], function () { o() })
            d[g].className = ""
        }
        d[iNow].className = "hove"
    }

    /**
     * [o description]
     * @return {[type]} [description]
     */
    function o() {
        for (g = 0; g < d.length; g++) {
            if (480 + "px" == d[g].style.width) {
                var a = d[g].getElementsByTagName("img")[0];
                startMove(a, {
                    opacity: 100
                })
            }
        }
    }

    var a = document.getElementById("part4-list"), //a 为part4-list
        b = document.getElementById("btns-arr"), //b btns-arr 小圆点容器
        c = b.getElementsByTagName("li"), // c 为小圆点集合 (3个li)
        d = a.getElementsByTagName("li"), // 图片容器 (3个li)
        e = a.getElementsByTagName("a"), // prev button 和 next button
        f = getClass(b, "small")[0], // 是圆点li 的 ul 的上一级 div
        g = iNow = 0, //iNow 为 index now
        h = null,
        i = [],
        j = [{ //最大图片的宽高和位子
            width: 480,
            height: 260,
            top: 0,
            left: 260,
            zIndex: 10
        }, { //右边大图片的宽高和位子
            width: 320,
            height: 174,
            top: 56,
            left: 570,
            zIndex: 6
        }, { //右边小图片的宽高和位子
            width: 240,
            height: 130,
            top: 80,
            left: 740,
            zIndex: 2
        }, { //左边小图片的宽高和位子
            width: 240,
            height: 130,
            top: 80,
            left: 20,
            zIndex: 4
        }, { //左边大图片的宽高和位子
            width: 320,
            height: 174,
            top: 56,
            left: 110,
            zIndex: 8
        }]

    for (g = 0; g < c.length; g++) {
        c[g].index = g
        myAddEvent(c[g], "click", function() {
            iNow = this.index;
            l()
        })
    }

    for (g = 0; g < d.length; g++) {
        d[g].index = g
        d[g].style.width = j[g].width + "px";
        d[g].style.height = j[g].height + "px";
        d[g].style.top = j[g].top + "px";
        d[g].style.left = j[g].left + "px";
        d[g].style.zIndex = j[g].zIndex;
        i[g] = j[g];
        myAddEvent(d[g], "mouseover", function() {
            var a = this.getElementsByTagName("div")[0];
            startMove(a, {
                opacity: 0
            })
        });
        myAddEvent(d[g], "mouseout", function() {
            if (670 + "px" == this.style.width);
            else {
                var a = this.getElementsByTagName("div")[0];
                startMove(a, {
                    opacity: 75
                })
            }
        })

        myAddEvent(d[g], "click", function() {
            var a = this.index;
            for (iNow = this.index, m(), g = 0; a > g; g++) i.unshift(i.pop());
            n()
        })
    }

    myAddEvent(e[0], "click", function() { //向左按钮
        i.unshift(i.pop()), n(), k()
    })

    myAddEvent(e[1], "click", function() { //向右按钮
        i.push(i.shift()), n(), iNow--, 0 > iNow && (iNow = d.length - 1), l()
    })

    f.onmouseover = a.onmouseover = function () {
        clearInterval(h)
    }

    f.onmouseout = a.onmouseout = function() {
        clearInterval(h), h = setInterval(k, 5e3)
    };

    h = setInterval(k, 5e3), o()
}

// 在 a 区域中寻找 class 为b的元素, 返回这个数组
function getClass(a, b) {
    var c = a.getElementsByTagName("*"),
        d = [];
    for (e = 0; e < c.length; e++) c[e].className == b && d.push(c[e]);
    return d
}

//为a 元素添加b 事件 处理器为c
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
        f = !0 //true
    for (e in b) {
        d = "opacity" == e ? parseInt(100 * parseFloat(getStyle(a, "opacity"))) : parseInt(getStyle(a, e));
        isNaN(d) && (d = 0);
        g = navigator.userAgent.indexOf("MSIE 8.0") > 0 ? (b[e] - d) / 3 : (b[e] - d) / 5;
        g = g > 0 ? Math.ceil(g) : Math.floor(g);
        parseInt(b[e]) != d && (f = !1);
        "opacity" == e ? (a.style.filter = "alpha(opacity:" + (d + g) + ")", a.style.opacity = (d + g) / 100) : a.style[e] = "zIndex" == e ? d + g : d + g + "px";
    }
    f && (clearInterval(a.timer), a.timer = null, c && c())
}

// function vtab() {
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
// }

// function TGDialogS(a) {
//     need("biz.dialog-min", function(b) {
//         b.show({
//             id: a,
//             bgcolor: "#000",
//             opacity: 50
//         })
//     })
// }

window.onload = function() {
    var a, b
    WfireSilder()
    // vtab(), a = document.getElementById("gameJs"), b = document.getElementById("floatBox"), a.onmouseover = function() {
    //     b.style.display = "block"
    // }, a.onmouseout = function() {
    //     b.style.display = "none"
    // }
} /*  |xGv00|896b2343e26f4b8fb998246354a18c39 */
