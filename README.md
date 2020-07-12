# FE PPT

不会 PPT，Markdown + CSS 还不会吗？

## 入门

1. npm i -g fe-ppt
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

### ::: 给包装元素添加样式

- 以.开头的为 class，会被包装到一个 div 元素的 class 上面。
- 可以通过`::: style`定义全局样式，然后通过.xx 的方式添加到元素上。
- 也可以使用内置的自带样式，提供了布局，动画等样式。
- 支持 animate.css 中的所有动画功能。

```
::: page .class1 .class2

# 我是个大标题

::: .build

- CSS
- HTML
- Javascript

:::

:::
```

注意，如果要使用:::功能，则:::必须放在 page 下面，不能与 page 同级，另外::: page 本身也支持添加 class

### :: 单元素添加属性

支持以下元素使用自定义属性功能，id 使用#开头，class 使用.开头，剩余为自定义属性，会被添加到标签属性上

- blockquote
- em
- code
- del
- p
- strong
- li
- h1-h6

```
# 我是标题啊 ::.class1 #app data-id=1::

output

<h1 id="app" class="class1" data-id="1">我是标题啊</h1>
```

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

### 修改标题

```
---
title: 不会写PPT的前端工程师
---
```

### 添加远程样式

在 markdown 文件头部添加以下配置添加远程全局样式

```
---
style: http://127.0.0.1:8080/reset.css
style: http://127.0.0.1:8080/layout.css
---
```

可以定制化或样式共用，比如写一套布局样式，之后就可以导入这个布局样式

### 添加远程脚本

在 markdown 文件头部添加以下配置添加远程全局脚本

```

---
script: http://127.0.0.1:8080/layout.js
---

```
