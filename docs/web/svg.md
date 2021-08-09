# SVG路径

`<path>`元素可以用来定义一个路径。

首先理解一下定义路径时各种字符命令代码的意思：

|  指令  | 参数  | 名称         | 描述                       |
|------|-----|------------|--------------------------|
|  M  | x,y | moveto 移动到 | 移动虚拟画笔到指定的（x,y）坐标，仅移动不绘制 |
|  m  | x,y | moveto     | 同M，但使用相对坐标               |
|  L  | x,y | lineto连直线到  |  从当前画笔所在位置绘制一条直线到指定的（x,y）坐标  |
| l  | x,y | lineto |  同L，但使用相对坐标  |
| H  | x | horizontal lineto水平连线到 | 绘制一条水平直线到参数指定的x坐标点，y坐标为画笔的y坐标 |
| h  |  x   |  horizontal lineto |  同H，但使用相对坐标  |
| V  | y  | vertical lineto垂直连线到   |  从当前位置绘制一条垂直直线到参数指定的y坐标   |
| v  |  y  |   vertical lineto	   |    同V，但使用相对坐标                    |
| C | x1,y1 x2,y2 x,y	|curveto三次方贝塞尔曲线 | 从当前画笔位置绘制一条三次贝兹曲线到参数（x,y）指定的坐标。x1，y1和x2,y2是曲线的开始和结束控制点，用于控制曲线的弧度 |
| c | x1,y1 x2,y2 x,y |	curveto | 同C，但使用相对坐标 |
| S |x2,y2 x,y|shorthand / 平滑三次方贝塞尔曲线|从当前画笔位置绘制一条三次贝塞尔曲线到参数（x,y）指定的坐标。x2,y2是结束控制点。开始控制点和前一条曲线的结束控制点相同|
| s |x2,y2 x,y  | shorthand / 平滑三次方贝塞尔曲线 | 同S，但使用相对坐标   |
| Q | x1,y1 x,y | 二次方贝塞尔曲线 | 从当前画笔位置绘制一条二次方贝塞尔曲线到参数（x,y）指定的坐标。x1,y1是控制点，用于控制曲线的弧度   |
| q  | x1,y1 x,y | 二次方贝塞尔曲线 | 同Q，但使用相对坐标   |
| T | x,y | 平滑的二次贝塞尔曲线 | 从当前画笔位置绘制一条二次贝塞尔曲线到参数（x,y）指定的坐标。控制点被假定为最后一次使用的控制点   |
| t | x,y | 平滑的二次贝塞尔曲线 | 同T，但使用相对坐标   |
| A | rx,ry x-axis-rotation large-arc-flag,sweepflag x,y | 椭圆弧线 |  从当前画笔位置开始绘制一条椭圆弧线到（x,y）指定的坐标。rx和ry分别为椭圆弧线水平和垂直方向上的半径。x-axis-rotation指定弧线绕x轴旋转的度数，它只在rx和ry的值不相同是有效果。large-arc-flag是大小弧标志位，取值0或1，0表示弧线小于180度，1表示弧线大于180度。sweep-flag用于决定弧线绘制的方向，取值0或1，0表示弧线逆时针旋转，1表示顺时针旋转  |
| a | rx,ry x-axis-rotation large-arc-flag,sweepflag x,y | 椭圆弧线 | 同A，但使用相对坐标   |
| Z |无  | 闭合路径 |  从结束点绘制一条直线到开始点，闭合路径  |
| Z |无  | 闭合路径 |  同Z  |

 **注意:** 所有的这些字符命令都可以用大小写两种形式。大小表示绝对位置，而小写表示相对位置。

### 例 1
下面的例子里定义了一个路径，从点 150,0 开始，连直线到点 75,200，然后连直线到点 225,200，最后闭合这个路径，连直线回到点 150,0:

<svg height="210" width="400">
  <path d="M150 0 L75 200 L225 200 Z" />
</svg>

上面的例子使用了下面的SVG代码：

```html
<svg height="210" width="400">
  <path d="M150 0 L75 200 L225 200 Z" />
</svg>
```

### 例 2
贝塞尔曲线是一种非常顺滑的曲线。通常，用户需要提供两个端点和一个或两个控制点。使用一个控制点的贝塞尔曲线叫做二次方贝塞尔曲线，使用两个控制点的贝塞尔曲线叫做三次方贝塞尔曲线。

下面的例子里使用了二次方贝塞尔曲线，其中 A 和 C 分别是两个端点，B是控制点：

  <svg height="400" width="450">
	  <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
	  stroke-width="3" fill="none" />
	  <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
	  stroke-width="3" fill="none" />
	  <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
	  fill="none" />
	  <path d="M 100 350 q 150 -300 300 0" stroke="blue"
	  stroke-width="5" fill="none" />
	  <!-- Mark relevant points -->
	  <g stroke="black" stroke-width="3" fill="black">
	    <circle id="pointA" cx="100" cy="350" r="3" />
	    <circle id="pointB" cx="250" cy="50" r="3" />
	    <circle id="pointC" cx="400" cy="350" r="3" />
	  </g>
	  <!-- Label the points -->
	  <g font-size="30" font-family="sans-serif" fill="black" stroke="none"
	  text-anchor="middle">
	    <text x="100" y="350" dx="-30">A</text>
	    <text x="250" y="50" dy="-10">B</text>
	    <text x="400" y="350" dx="30">C</text>
	  </g>
	</svg>

上面的例子里使用了下面的SVG代码：
```html
  <svg height="400" width="450">
	  <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
	  stroke-width="3" fill="none" />
	  <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
	  stroke-width="3" fill="none" />
	  <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
	  fill="none" />
	  <path d="M 100 350 q 150 -300 300 0" stroke="blue"
	  stroke-width="5" fill="none" />
	  <!-- Mark relevant points -->
	  <g stroke="black" stroke-width="3" fill="black">
	    <circle id="pointA" cx="100" cy="350" r="3" />
	    <circle id="pointB" cx="250" cy="50" r="3" />
	    <circle id="pointC" cx="400" cy="350" r="3" />
	  </g>
	  <!-- Label the points -->
	  <g font-size="30" font-family="sans-serif" fill="black" stroke="none"
	  text-anchor="middle">
	    <text x="100" y="350" dx="-30">A</text>
	    <text x="250" y="50" dy="-10">B</text>
	    <text x="400" y="350" dx="30">C</text>
	  </g>
	</svg>
```

### 例3
<svg height="120" viewBox="0 0 1024 1024" width="120">
  <circle cx="512" cy="420" r="160" stroke="#FD7991"stroke-width="60" fill="none"/>
  <path d="M805 124a407 407 0 0 0-586 0 431 431 0 0 0 0 599L512 1024l293-300a431 431 0 0 0 0-599z m-44 557l-248 255 -248-255 a365 365 0 0 1 0 -508 346 346 0 0 1 497 0 365 365 0 0 1 0 508Z" 
	fill="#FD7991">
  </path>
</svg>

```html
<svg height="120" viewBox="0 0 1024 1024" width="120">
  <circle cx="512" cy="420" r="160" stroke="#FD7991"stroke-width="60" fill="none"/>
  <path d="M805 124a407 407 0 0 0-586 0 431 431 0 0 0 0 599L512 1024l293-300a431 431 0 0 0 0-599z m-44 557l-248 255 -248-255 a365 365 0 0 1 0 -508 346 346 0 0 1 497 0 365 365 0 0 1 0 508Z" 
	fill="#FD7991">
  </path>
</svg>
```

