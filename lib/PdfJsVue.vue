<template>
  <pdf-box
      v-bind="pdfBox"
      :max="nav.maxPage"
      @change="navChange"
      @resize="navResize"
      :zoom.sync="nav.zoom"
      :page.sync="nav.page"
      @print="e => onTimeout('onPrint', e)"
      @download="e => onTimeout('onDownLoad', e)">

  </pdf-box>
</template>

<script>
import {createProp, PropBoolean, PropNumber, PropString} from '../utils/Props'
import PdfBox from './PdfBox'

// import PdfJs from './pdfjs'

export default {
  name: 'PdfJsVue',
  components: {PdfBox},
  props: {
    title: PropString(''),
    delay: PropNumber(300),
    print: PropBoolean(true),
    downLoad: PropBoolean(true),
    // page: PropNumber(1),
    singlePage: PropBoolean(false),
    emptyText: PropString('加载失败'),
    src: createProp([String], '')
  },
  data: function () {
    return {
      timeout: {},
      nav: {zoom: 75, page: 1, maxPage: 1}
      // PDFDoc: null,
      // isError: false,
      // loading: false,
      // config: {page: 1, scale: 1, load: false}
    }
  },
  watch: {
    src (val) {
      this.__init(val)
    }
  },
  computed: {
    pdfBox () {
      const {title, print, downLoad, loading} = this
      return {title, print, downLoad, loading}
    }
  },
  mounted () {
    this.__init(this.src)
  },
  methods: {
    navResize (state) {
      console.log(state)
    },
    navChange (name, value) {
      console.log(name, value)
    },
    onTimeout (name, ...args) {
      if (!this.timeout[name]) {
        this[name](...args)
      } else {
        clearTimeout(this.timeout[name])
      }
      this.timeout[name] = setTimeout(() => {
        delete this.timeout[name]
      }, this.delay)
    },
    onPrint (e) {
      console.log('onPrint', e)
    },
    onDownLoad (e) {
      console.log('onDownLoad', e)
    },
    __init (src) {
      console.log(src)
      // this.isError = false
      // if (hasEmpty(src)) {
      //   console.warn('src 不能为空')
      //   this.$emit('empty')
      //   this.isError = true
      // } else {
      //   this.setLoad(true)
      //   try {
      //     // PdfJs(src).promise.then(pdfDoc => {
      //     //   this.setLoad(false)
      //     //   this.$emit('read') // 加载成功
      //     //   this.PDFDoc = pdfDoc
      //     //   console.log(pdfDoc)
      //     //   this.getPage()
      //     // })
      //   } catch (e) {
      //     this.setLoad(false)
      //     this.$emit('error')
      //     this.isError = true
      //     console.error(e)
      //   }
      // }
    }
    // setLoad (state = false, timeout = 300) {
    //   if (this.timeout.load) clearTimeout(this.timeout.load)
    //   this.timeout.load = setTimeout(() => {
    //     this.config.load = state
    //   }, timeout)
    // },
    // getPage () {
    //   this.setLoad(true)
    //   try {
    //     this.renderPage().then(data => {
    //       this.setLoad(false)
    //       data.forEach(canvas => {
    //         this.$refs.PDFJs.append(canvas)
    //       })
    //       this.$('render')
    //     })
    //   } catch (e) {
    //     this.setLoad(false)
    //     this.isError = true
    //   }
    // },
    // getPageNum (num) {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       this.PDFDoc.getPage(num).then(page => {
    //         const outputScale = window.devicePixelRatio || 1
    //         const canvas = document.createElement('canvas')
    //         const canvasContext = canvas.getContext('2d')
    //         const viewport = page.getViewport({scale: this.scale})
    //         const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null
    //         canvas.style.cssText = `width: ${viewport.width}px; height: ${viewport.height};`
    //         canvas.height = Math.floor(viewport.height * outputScale) + 'px'
    //         canvas.width = Math.floor(viewport.width * outputScale) + 'px'
    //         page.render({viewport, transform, canvasContext}).promise.then(() => {
    //           resolve(canvas)
    //         })
    //       })
    //     } catch (e) {
    //       reject(e)
    //     }
    //   })
    // },
    // reFresh () {
    //   this.config = {page: 1, scale: 1, load: false} // 清空配置
    //   this.$refs.PDFJs.innerHTML = '' // 清空节点
    //   this.isError = false
    // },
    // renderPage () {
    //   const getPage = this.getPageNum
    //   let list = [getPage(this.page)]
    //   if (!this.singlePage) {
    //     list = Array.from(Array(this.maxPage), ((v, k) => getPage(k + 1)))
    //   }
    //   return Promise.all(list)
    // }
  }
}
</script>
