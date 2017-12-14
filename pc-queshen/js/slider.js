var $slideContainer = $("#part4-list")[0], //a 为part4-list
    $dotContainer = $("#btns-arr")[0], //b btns-arr 小圆点容器
    $dots = $("#btns-arr li"), // c 为小圆点集合 (5个li)
    $slides = $("#part4-list li"), // 图片容器 (5个li)
    $btns = $("#part4-list a"), // prev button 和 next button
    $smallContainer = $('#btns-arr .small')[0], // 是圆点li 的 ul 的上一级 div
    indexNow = 0, //iNow 为 index now
    copyArr = [],
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

//copy 图片的宽高位置到 i 数组
function copy() {
    for (var i = 0; i < slideLength; i++){
        copyArr[i] = slideInfo[i]
    }
}

//每张图移动
function n() {
    for (var i = 0; i < slideLength; i++) {
        var a = $dots[i].getElementsByTagName("img")[0];

        startMove(a, { opacity: 75 })
        startMove($dots[i], copyArr[i], function() { o() })

    }
    $dots.eq(indexNow).addClass('hove').removeClass('hove')
}

//重置小圆点的className，为激活圆点加 "hove" class ,开始移动
function updateDot() {
    $dots.eq(indexNow).addClass('hove').removeClass('hove')

    startMove(c[iNow], {opacity: 100 });

    //变换图片宽高数组的顺序
    var a = indexNow;
    copy()
    for (var i = 0; a > i; i++){
        slideInfo.unshift(slideInfo.pop());
    }
    n()
}

/* 更新indexNow */
function updateIndex() {
    indexNow++
    indexNow > slideLength - 1 && (indexNow = 0)
    updateDot()
}


