<template>
  <pdf-box
      ref="PdfBox"
      :print="print"
      @print="onPrint"
      :resize="resize"
      :title="getTitle"
      @change="onChange"
      :page="config.page"
      :zoom="config.scale"
      :download="download"
      :loading="boxLoading"
      @download="onDownLoad"
      :max="config.maxPage"
      :class="{'var-pdfJs--mini': viewWidth <= 600}"
  >
    <slot v-if="$slots.download" name="download" slot="download"><!-- 下载 --></slot>
    <slot v-if="$slots.print" name="print" slot="print"><!-- 打印 --></slot>
    <div class="var-pdfJs__error--box" v-if="isError">
      <div class="var-pdfJs__error">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="128" height="128">
          <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>
        </svg>
        <div class="var-pdfJs__error--text">加载失败</div>
      </div>
    </div>
    <div v-else class="var-pdfJs__canvas" ref="PdfJsBody"></div>
  </pdf-box>
</template>

<script>
import PdfBox from './PdfBox'
import {createProp, PropBoolean, PropString} from '../utils/Props'
import getDocument, {getPage} from './pdfjs'
import {hasEmpty, Size} from '../utils/Limit'

export default {
  name: 'PdfJsVue',
  components: {PdfBox},
  props: {
    src: PropString(),
    title: PropString(''),
    print: PropBoolean(true),
    resize: PropBoolean(false),
    download: PropBoolean(true),
    singlePage: PropBoolean(false),
    cmaps: createProp([String, Boolean], true)
  },
  data: function () {
    return {
      openUrl: '',
      timeout: {}, // 加载延迟问题
      PDFDoc: null,
      viewWidth: 0,
      getPage: null,
      observer: null,
      isError: false,
      boxLoading: false,
      config: {page: 1, maxPage: 1, scale: 100}
    }
  },
  watch: {
    src (val) {
      this.__init(val)
    },
    singlePage () {
      this.__init(this.openUrl)
    }
  },
  computed: {
    getTitle () {
      return (this.title || '').replace(/\.pdf$/, '')
    }
  },
  mounted () {
    if (!hasEmpty(this.src)) {
      this.__init(this.src)
    }
    window.addEventListener('resize', this.__reView)
    this.$nextTick(() => {
      this.__reView()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.__reView)
  },
  methods: {
    __reView () {
      this.viewWidth = this.$refs.PdfBox.$el.offsetWidth
    },
    __setLoading (state = false) {
      if (this.timeout.boxLoad) clearTimeout(this.timeout.boxLoad)
      this.timeout.boxLoad = setTimeout(() => {
        this.boxLoading = state
      })
    },
    __reConfig (src) {
      this.openUrl = src
      this.isError = false
      this.boxLoading = false
      if (this.observer) this.observer.disconnect()
      this.config = {page: 1, maxPage: 1, scale: 100}
    },
    __setError (e) {
      this.isError = true
      console.error(new Error(e))
      this.$emit('error', e)
      this.__setLoading(false)
    },
    __init (src) {
      this.__reConfig(src)
      if (hasEmpty(src)) {
        this.isError = true
      } else {
        this.__setLoading(true)
        try {
          getDocument(src, this.cmaps).promise.then(PDFDoc => {
            this.config.maxPage = PDFDoc.numPages || 1
            this.$emit('init', true)
            this.__setLoading(false)
            this.PDFDoc = PDFDoc
            this.__setDrawing()
          }).catch(e => {
            this.__setError(e.message)
          })
        } catch (e) {
          this.__setError(e.message)
        }
      }
    },
    __setDrawing () {
      if (this.timeout.drawing) clearTimeout(this.timeout.drawing)
      this.timeout.drawing = setTimeout(() => {
        this.initDrawing()
      }, 10)
    },
    initDrawing () {
      this.__setLoading(true)
      this.$refs.PdfJsBody.innerHTML = ''
      const {PDFDoc, config: {page, maxPage, scale}} = this
      // 只显示一页
      if (this.singlePage) {
        getPage(PDFDoc, page, scale).then(canvas => {
          this.__setLoading(false)
          this.$refs.PdfJsBody.append(canvas)
          this.$emit('reload')
        })
      } else {
        Promise.all(Array.from(Array(maxPage), (v, k) => {
          return getPage(PDFDoc, k + 1, scale)
        })).then(canvasList => {
          this.$emit('reload')
          this.__setLoading(false)
          this.$refs.PdfJsBody.append(...canvasList)
          this.__setScrollPage(this.$refs.PdfJsBody)
        })
      }
    },
    __setScrollPage ({parentNode, childNodes}) {
      const threshold = Size(parentNode.offsetHeight / childNodes[0].offsetHeight / 2, 0, 1)
      this.observer = new IntersectionObserver(args => {
        if (this.timeout.page) {
          this.timeout.page = false
        } else {
          args.forEach(({isIntersecting, target}) => {
            if (isIntersecting) {
              this.config.page = parseInt(target.id.replace(/[^\d]/g, ''))
            }
          })
        }
      }, {root: parentNode, threshold})
      childNodes.forEach(el => {
        this.observer.observe(el)
      })
    },
    __pageAnchor (page) {
      this.timeout.page = true
      const box = this.$refs.PdfJsBody.parentElement
      if (page === 1) {
        box.scrollTop = 0
      } else {
        const heightList = Array.from(Array(page - 1), (_, k) => document.getElementById(`PdfJs-page-${k + 1}`).offsetHeight)
        box.scrollTop = heightList.reduce((v, k) => (v += (k + 10), v), 0)
      }
    },
    onPrint () {
      let images = ''
      for (let canvas of this.$refs.PdfJsBody.getElementsByTagName('canvas')) {
        images += `<img src="${canvas.toDataURL()}" alt="canvas"/>`
      }
      const win = window.open('', '', '')
      win.document.write(images)
      win.document.close()
      setTimeout(() => {
        win.focus()
        win.print()
        win.close()
      })
    },
    onDownLoad () {
      const a = document.createElement('a')
      a.download = this.getTitle + '.pdf' // 名字
      a.href = this.openUrl // 下载地址
      a.click()
      a.remove()
    },
    onChange (name, value) {
      name = name === 'zoom' ? 'scale' : name
      if (this.config[name] !== value) {
        this.config[name] = value // 更改
        if (name === 'scale' || this.singlePage) {
          this.__setDrawing()
        } else if (name === 'page') {
          this.__pageAnchor(value)
        }
      }
    }
  }
}
</script>
