# SVG Stroke 属性

SVG提供了一个范围广泛stroke 属性。在本章中，我们将看看下面：

- stroke
- stroke-width
- stroke-linecap
- stroke-dasharray

所有stroke属性，可应用于任何种类的线条，文字和元素就像一个圆的轮廓。

1. stroke 属性定义一条线，文本或元素轮廓颜色：

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none">
    <path stroke="red" d="M5 20 l215 0" />
    <path stroke="blue" d="M5 40 l215 0" />
    <path stroke="black" d="M5 60 l215 0" />
  </g>
</svg>
代码如下：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none">
    <path stroke="red" d="M5 20 l215 0" />
    <path stroke="blue" d="M5 40 l215 0" />
    <path stroke="black" d="M5 60 l215 0" />
  </g>
</svg>
```

2. stroke-width 属性定义了一条线，文本或元素轮廓厚度：

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black">
    <path stroke-width="2" d="M5 20 l215 0" />
    <path stroke-width="4" d="M5 40 l215 0" />
    <path stroke-width="6" d="M5 60 l215 0" />
  </g>
</svg>
代码如下：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black">
    <path stroke-width="2" d="M5 20 l215 0" />
    <path stroke-width="4" d="M5 40 l215 0" />
    <path stroke-width="6" d="M5 60 l215 0" />
  </g>
</svg>
```

3. stroke-linecap 属性定义不同类型的开放路径的终结：

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="6">
    <path stroke-linecap="butt" d="M5 20 l215 0" />
    <path stroke-linecap="round" d="M5 40 l215 0" />
    <path stroke-linecap="square" d="M5 60 l215 0" />
  </g>
</svg>
代码如下：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="6">
    <path stroke-linecap="butt" d="M5 20 l215 0" />
    <path stroke-linecap="round" d="M5 40 l215 0" />
    <path stroke-linecap="square" d="M5 60 l215 0" />
  </g>
</svg>
```

4. stroke-dasharray 属性用于创建虚线：

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="4">
    <path stroke-dasharray="5,5" d="M5 20 l215 0" />
    <path stroke-dasharray="10,10" d="M5 40 l215 0" />
    <path stroke-dasharray="20,10,5,5,5,10" d="M5 60 l215 0" />
  </g>
</svg>
代码如下：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="4">
    <path stroke-dasharray="5,5" d="M5 20 l215 0" />
    <path stroke-dasharray="10,10" d="M5 40 l215 0" />
    <path stroke-dasharray="20,10,5,5,5,10" d="M5 60 l215 0" />
  </g>
</svg>
```

### 示例一
用stroke属性画一条绿色的直线
```html
<svg height="50" width="300">
    <path stroke="green" d="M5 20 1215 0" />
</svg>
```
<svg height="50" width="300">
    <path stroke="green" d="M5 20 1215 0" />
</svg>

### 示例二
用Stroke属性画一个拥有蓝色边框的黑色的圆形
```html
​​<svg height="200" width="200">
    <circle cx="50" cy="50" r="40" stroke="blue" stroke-width="2" fill="black" />
</svg>
```
​​<svg height="200" width="200">
    <circle cx="50" cy="50" r="40" stroke="blue" stroke-width="2" fill="black" />
</svg>