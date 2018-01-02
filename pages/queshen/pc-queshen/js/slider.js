var $slideContainer = $("#part4-list")[0], //a 为part4-list
    $dots = $("#btns-arr li"), // c 为小圆点集合 (5个li)
    $slides = $("#part4-list li"), // 图片容器 (5个li)
    $btns = $("#part4-list a"), // prev button 和 next button
    $smallContainer = $('#btns-arr .small')[0], // 是圆点li 的 ul 的上一级 div
    indexNow = 0, //iNow 为 index now
    copyArr = [],
    clock = null,
    slideInfo = [{ //最大图片的宽高和位子
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
    }];

var slideLength = $slides.length

function doMove(element, styleObject, cb) {
    var g, d = 0,
        f = !0 //true
    for (var styleName in styleObject) {
        d = styleName === "opacity" ? window.parseInt(100 * parseFloat(getStyle(element, "opacity"))) : window.parseInt(getStyle(element, styleName));
        isNaN(d) && (d = 0);
        g = navigator.userAgent.indexOf("MSIE 8.0") > 0 ? (styleObject[styleName] - d) / 3 : (styleObject[styleName] - d) / 5;
        g = g > 0 ? Math.ceil(g) : Math.floor(g);
        window.parseInt(styleObject[styleName]) !== d && (f = !1);
        if(styleName === "opacity"){
            element.style.filter = "alpha(opacity:" + (d + g) + ")"
            element.style.opacity = (d + g) / 100
        }else{
            element.style[styleName] = styleName === "zIndex" ? d + g : d + g + "px"
        }
    }
    f && (clearInterval(element.timer), element.timer = null, cb && cb())
}

function startMove(element, styleObject, cb) {
    // var timer = null;
    element.timer && clearInterval(element.timer)
    element.timer = setInterval(function() {
        doMove(element, styleObject, cb)
    }, 30)
}

function getStyle(selector, styleName) {
    // return element.currentStyle ? element.currentStyle[b] : getComputedStyle(element, false)[b]
    return $(selector).css(styleName)
}

//copy 图片的宽高位置到 i 数组
function copy() {
    copyArr = []
    for (var i = 0; i < slideLength; i++){
        copyArr.push(slideInfo[i])
    }
}


function show() {
    for (var i = 0; i < slideLength; i++) {
        if ($($slides[i]).width() === 480) {
            var img = $('#part4-list img')[i];
            startMove(img, {
                opacity: 100
            })
        }
    }
}


//每张图移动
function updateSlide() {
    console.log('updateSlide')
    for (var i = 0; i < slideLength; i++) {
        // var img = $('#part4-list img')[i]
        // startMove(img, { opacity: 75 })
        startMove($slides[i], copyArr[i], function () {
            show()
        })
        // startMove($slides[i], copyArr[i], function() { o() })
    }
    // $slides.eq(indexNow).addClass('hove').siblings().removeClass('hove')
}

//重置小圆点的className，为激活圆点加 "hove" class ,开始移动
function updateDot() {
    console.log('updateDot')
    $dots.eq(indexNow).addClass('hove').siblings().removeClass('hove')

    startMove($dots[indexNow], {opacity: 100 });

    //变换图片宽高数组的顺序
    copy()
    for (var i = 0; indexNow > i; i++){
        copyArr.unshift(copyArr.pop());
    }
    updateSlide()
}

/* 更新indexNow */
function updateIndex() {
    console.log('updateIndex')
    indexNow++
    indexNow > slideLength - 1 && (indexNow = 0)
    updateDot()
}

function main(){
    $dots.on("click", function(e) {
        var element = e.currentTarget
        indexNow = $(element).index();
        updateDot()
    })

    for (var i = 0; i < slideLength; i++) {
        $($slides[i]).css({
            'width': slideInfo[i].width + 'px',
            'height': slideInfo[i].height + 'px',
            'top': slideInfo[i].top + 'px',
            'left': slideInfo[i].left + 'px',
            'z-index': slideInfo[i].zIndex
        })
    }

    $slides.on("click", function(e) {
        var element = e.currentTarget
        indexNow = $(element).index();
        updateDot()
        copy()
        for ( var j = 0; indexNow > j; j++){
            copyArr.unshift(copyArr.pop());
        }
        updateSlide()
    })

   $($btns[0]).on("click", function() { //向左按钮
        copyArr.unshift(copyArr.pop())
        updateSlide()
        updateIndex()
    })

    $($btns[1]).on("click", function() { //向右按钮
        copyArr.push(copyArr.shift())
        updateSlide()
        indexNow--
        if( indexNow < 0 ){
            indexNow = slideLength - 1
        }
        updateDot()
    })

    $smallContainer.onmouseover = $slideContainer.onmouseover = function () {
        clearInterval(clock)
    }

    $smallContainer.onmouseout = $slideContainer.onmouseout = function() {
        clearInterval(clock)
        clock = setInterval(updateIndex, 1e3)
    };

    clock = setInterval(updateIndex, 1e3)
    // o()
}

// function myAddEvent(element, event, handle) {
//     element.attachEvent ? element.attachEvent("on" + event, function() {
//         handle.call(element)
//     }) : element.addEventListener(event, handle, false)
// }


window.onload = function() {
    main()
}
