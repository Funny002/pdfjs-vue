# pdfjs-vue

基于 pdf.js 封装的 vue-pdf 插件

> ps:
> 目前只支持链接的方式

### 未支持&部分支持功能

> 下载 ~ 使用的`a`标签下载，可能和导致无法下载
>
> 打印 ~ 用的`window.open` 进行新窗口打印，图片过大可能导致不显示问题
>
> 宽度/高度适应 ~ 未做

### 参数

|参数名|类型|默认值|说明|
| :--- | :--- | :--- | :--- |
|src|string|null|必须，要访问的链接|
|title|string|null|文件名称|
|print|boolean|true|打印按钮|
|download|boolean|true|下载按钮|
|singlePage|boolean|faflse|是否只显示一页 pdf 的渲染|

### 简单实例

```vue

<template>
  ......
  <pdf-js-vue :src="pdfUrl" :title="title"/>
  ......
</template>
<script>
import PdfJsVue from 'pdfjs-vue'

export default {
  ......,
  components: {PdfJsVue},
  data: function () {
    return {
      ......,
      title: 'Hello World.pdf' || 'Hello World',
      pdfUrl: './Hello World.pdf',
    }
  }
}
</script>
```
