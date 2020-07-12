# I PPT

不会PPT，Markdown + CSS 还不会吗？

## 入门

1. npx i-ppt
2. i-ppt --path hello.md

## 使用指南

### 演示PPT

1. 本地md文件

```
i-ppt --path hello.md
```

2. 远程md文件

```
i-ppt
```

启动服务后，在网址后面的url上面添加?ppt=http://127.0.0.1/hello.md

### 导出PPT

```
i-ppt --path hello.md --type export
```

## PPT语法

除了支持markdown语法外，扩展了:::语法，另外:::语法是成对出现的，与html类似。

### ::: page

每个page表示一个页面，示例如下：

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

- 以.开头的为class，会被包装到一个div元素的class上面。
- 可以通过`::: style`定义全局样式，然后通过.xx的方式添加到元素上。
- 也可以使用内置的自带样式，提供了布局，动画等样式。
- 支持animate.css中的所有动画功能。

### 列表按照顺序显示

添加.build支持ul，ol列表按照顺序显示，每次点击显示下一个或上一个，显示完成后显示下一个PPT页面。

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