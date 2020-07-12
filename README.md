# FE PPT

不会 PPT，Markdown + CSS 还不会吗？

## 入门

1. npm -g fe-ppt
2. fe-ppt --path hello.md

## 使用指南

### 演示 PPT

1. 本地 md 文件

```
fe-ppt --path hello.md
```

2. 远程 md 文件

```
fe-ppt
```

启动服务后，在网址后面的 url 上面添加?ppt=http://127.0.0.1/hello.md

### 导出 PPT

```
fe-ppt --path hello.md --type export
```

## PPT 语法

除了支持 markdown 语法外，扩展了:::语法，另外:::语法是成对出现的，与 html 类似。

### ::: page

每个 page 表示一个页面，示例如下：

```
::: page

我是第一个页面

:::

::: page

我是第二个页面

:::
```

### ::: style

设置全局样式

```

::: style

body {
  background-color: green;
}

.page-1 {
  ...
}

.page-2 {
  ...
}

:::

```

### ::: .xx .xxx

- 以.开头的为 class，会被包装到一个 div 元素的 class 上面。
- 可以通过`::: style`定义全局样式，然后通过.xx 的方式添加到元素上。
- 也可以使用内置的自带样式，提供了布局，动画等样式。
- 支持 animate.css 中的所有动画功能。

### 列表按照顺序显示

添加.build 支持 ul，ol 列表按照顺序显示，每次点击显示下一个或上一个，显示完成后显示下一个 PPT 页面。

```
::: .build

- CSS
- HTML
- JavaScript

:::
```

## 高级用法

### 动画

参考文档：[animate.css](https://animate.style/)

```
::: .backOutDown

# 我会动起来噢~

:::
```

### 添加多个指令

```
::: page .class1 .class2 .backOutDown

除了::: style指令外，其他任何指令都支持同时添加多个指令，每个指令以空格分开

:::
```
