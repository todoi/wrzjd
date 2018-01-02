window.onload = function() {
  (document.all && !window.print) ? null : setForm();
}

function setForm() { //替换html 中所有的 select 选项
  var s = document.getElementsByTagName('select');
  for (var i=0; i<s.length; i++) {
    selectReplacement(s[i]);
  }
}

function selectReplacement(obj) { //obj为select元素
  // append a class to the select
  obj.className += ' replaced';
  // create list for styling
  var ul = document.createElement('ul');  //创建ul
  ul.className = 'selectReplacement';
  var opts = obj.options;
  for (var i=0; i<opts.length; i++) {
    var selectedOpt; //selected 的位置
    if (opts[i].selected) {
      selectedOpt = i;
      break;
    } else {
      selectedOpt = 0;
    }
  }
  for (var i=0; i<opts.length; i++) {
    var li = document.createElement('li');
    var txt = document.createTextNode(opts[i].text);
    li.appendChild(txt);
    li.selIndex = opts[i].index;
    li.selectID = obj.id;
    li.onclick = function() { //添加事件选中
      selectMe(this);
    }
    if (i == selectedOpt) {
      li.className = 'selected';
      li.onclick = function() { //添加事件展开option
        this.parentNode.className += ' selectOpen';
        this.onclick = function() {
          selectMe(this);
        }
      }
    }
    if (window.attachEvent) {
      li.onmouseover = function() {
        this.className += ' hover';
      }
      li.onmouseout = function() {
        this.className =
          this.className.replace(new RegExp(" hover\\b"), '');
      }
    }
    ul.appendChild(li);
  }
  // add the input and the ul
  obj.parentNode.appendChild(ul);
}

function selectMe(obj) { //参数是Li
  var lis = obj.parentNode.getElementsByTagName('li');  //get ul child list
  for (var i=0; i<lis.length; i++) {
    if (lis[i] != obj) { // not the selected list item
      lis[i].className='';
      lis[i].onclick = function() {
        selectMe(this);
      }
   } else {
      setVal(obj.selectID, obj.selIndex);
      obj.className='selected';
      obj.parentNode.className =
        obj.parentNode.className.replace(new RegExp(" selectOpen\\b"), '');
      obj.onclick = function() {
        obj.parentNode.className += ' selectOpen';
        this.onclick = function() {
          selectMe(this);
        }
      }
    }
  }
}
function setVal(objID, selIndex) {
  var obj = document.getElementById(objID);
  obj.selectedIndex = selIndex;
}
function closeSel(obj) {
  // close the ul
}
