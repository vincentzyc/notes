# Css移动端适配

前一段时间群里有人问我rem相关的问题,一直想整理一下,可是都忘记了.今天终于抽出时间来整理一下相关知识点!
说到rem就要谈到移动端布局,现在很多人在移动端布局上面还是用px,我们先来谈谈px;px:像素(Pixel),相对单位长度,px相对于屏幕分辨率而言的.
我们为什么使用rem,rem的诞生也是webapp的推动,rem完美解决了webapp的屏幕适应问题,大家都知道移动端设备屏幕大小各异,像素也是各个不同的,那么webapp使用px就相当鸡肋,因为大家都知道px是像素,由屏幕的分辨率决定,用px在很大程度上影响webapp的美观.
下面介绍如何使用rem,首先我们得设置rem的初始值,然后我们每个尺寸按照这个初始值进行换算得出rem值进行布局.
## 1.媒体查询

```css
html {
    font-size : 20px;
}
@media only screen and (min-width: 401px){
    html {
        font-size: 25px !important;
    }
}
@media only screen and (min-width: 428px){
    html {
        font-size: 26.75px !important;
    }
}
@media only screen and (min-width: 481px){
    html {
        font-size: 30px !important; 
    }
}
@media only screen and (min-width: 569px){
    html {
        font-size: 35px !important; 
    }
}
@media only screen and (min-width: 641px){
    html {
        font-size: 40px !important; 
    }
}
```

       
## 2.自动设置html的font-size

```js
 (function (doc, win) {   
            var docEl = doc.documentElement,   
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',   
            recalc = function () {   
            var clientWidth = docEl.clientWidth;   
            if (!clientWidth) return;   
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';   
        };   
        if (!doc.addEventListener) return;   
        win.addEventListener(resizeEvt, recalc, false);   
        doc.addEventListener('DOMContentLoaded', recalc, false);   
        })(document, window);   
```
## 3.designWidth:设计稿的实际宽度值，需要根据实际设置,maxWidth:制作稿的最大宽度值，需要根据实际设置

```js
(function(designWidth, maxWidth) {
	var doc = document,
	win = window,
	docEl = doc.documentElement,
	remStyle = document.createElement("style"),
	tid;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		maxWidth = maxWidth || 540;
		width>maxWidth && (width=maxWidth);
		var rem = width * 100 / designWidth;
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = doc.createElement("div");
		wrap.appendChild(remStyle);
		doc.write(wrap.innerHTML);
		wrap = null;
	}
	//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
	refreshRem();

	win.addEventListener("resize", function() {
		clearTimeout(tid); //防止执行两次
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function(e) {
		if (e.persisted) { // 浏览器后退的时候重新计算
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function(e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
})(750, 750);
```
