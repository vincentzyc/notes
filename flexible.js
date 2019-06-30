/**
designWidth: 设计稿的实际宽度值，需要根据实际设置
maxWidth: 制作稿（页面）的最大宽度值，需要根据实际设置
这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿（页面）最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
*/
!(function(designWidth, maxWidth) {
  var doc = document,
    win = window,
    docEl = doc.documentElement,
    rem = 14,
    tid;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 540;
    width > maxWidth && (width = maxWidth);
    rem = width * 100 / designWidth;
    docEl.style.fontSize = rem + 'px';
    if (doc.body) setBodyStyle()
  }

  function setBodyStyle() {
    doc.body.style.position = "relative";
    doc.body.style.fontSize = 14 / rem + "rem";
    doc.body.style.margin = "0 auto";
    doc.body.style.maxWidth = maxWidth + "px";
  }
  refreshRem();
  win.addEventListener("resize", function() {
    clearTimeout(tid); //防止执行两次
    tid = setTimeout(refreshRem(), 300);
  }, false);
  win.addEventListener("pageshow", function(e) {
    if (e.persisted) { // 浏览器后退的时候重新计算
      clearTimeout(tid);
      tid = setTimeout(refreshRem(), 300);
    }
  }, false);
  win.addEventListener("DOMContentLoaded", function() {
    setBodyStyle()
  }, false);
})(720, 640);

//压缩版
// !function(a,b){function h(){var d=e.getBoundingClientRect().width;b=b||540,d>b&&(d=b),f=100*d/a,e.style.fontSize=f+"px",c.body&&i()}function i(){c.body.style.position="relative",c.body.style.fontSize=14/f+"rem",c.body.style.margin="0 auto",c.body.style.maxWidth=b+"px"}var g,c=document,d=window,e=c.documentElement,f=14;h(),d.addEventListener("resize",function(){clearTimeout(g),g=setTimeout(h(),300)},!1),d.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(g),g=setTimeout(h(),300))},!1),d.addEventListener("DOMContentLoaded",function(){i()},!1)}(720,640);
