(function() {
  /* Define the number of leaves to be used in the animation */
  var NUMBER_OF_LEAVES = 80; //红包的个数

  /*
   Called when the "Falling Leaves" page is completely loaded.
   */
  function init() {
    /* Get a reference to the element that will contain the leaves */
    var container = document.getElementById('petalbox'); //红包容器

    /* Fill the empty container with new leaves */
    try {
      for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
        container.appendChild(createALeaf());  //添加红包
      }
    } catch (e) {}
  }

  /*
   Receives the lowest and highest values of a range and
   returns a random integer that falls within that range.
   */
  function randomInteger(low, high) { //从low 和 high 中截取一个随机整数，大于等于low 且小于high
    return low + Math.floor(Math.random() * (high - low));
  }

  /*
   Receives the lowest and highest values of a range and
   returns a random float that falls within that range.
   */
  function randomFloat(low, high) { //从low 和 high 中截取一个随机浮点数，大于等于low 且小于high
    return low + Math.random() * (high - low);
  }

  /*
   Receives a number and returns its CSS pixel value.
   */
  function pixelValue(value) { // 加上像素单位
    return value + 'px';
  }

  /*
   Returns a duration value for the falling animation.
   */
  function durationValue(value) { // 加上时间 秒 单位
    return value + 's';
  }

  /*
   Uses an img element to create each leaf. "Leaves.css" implements two spin
   animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
   function determines which of these spin animations should be applied to each leaf.

   */
  function createALeaf() {
    /* Start by creating a wrapper div, and an empty img element */
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');

    /* Randomly choose a leaf image and assign it to the newly created element */
    image.src = 'images/petal' + randomInteger(1, 10) + '.png'; //取得图片

    /* Position the leaf at a random location along the screen */
    leafDiv.style.top = pixelValue(randomInteger(-200, -100)); //开始下降的位置
    leafDiv.style.left = pixelValue(randomInteger(0, 1920)); //距离左边的位置

    /* Randomly choose a spin animation */
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip'; /* Set the -webkit-animation-name property with these values */
    leafDiv.style.webkitAnimationName = 'fade, drop'; //添加淡出 和下落的css 动画
    leafDiv.style.animationName = 'fade, drop';
    image.style.webkitAnimationName = spinAnimationName; //添加旋转动画
    image.style.animationName = spinAnimationName;

    /* 随机下落时间 从开始到结束的时间*/
    var fadeAndDropDuration = durationValue(randomFloat(1.2, 8.2));

    /* 随机旋转时间 从开始到结束的时间*/
    var spinDuration = durationValue(randomFloat(3, 4));

    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
    leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    // 随机delay时间
    var leafDelay = durationValue(randomFloat(0, 2));

    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
    leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
    image.style.webkitAnimationDuration = spinDuration;
    image.style.animationDuration = spinDuration;
    leafDiv.appendChild(image);
    return leafDiv;
  }
  init();
})();
