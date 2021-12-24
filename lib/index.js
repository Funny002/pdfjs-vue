import PdfJsVue from './PdfJsVue'
import '../scss/index.scss'

const install = (Vue) => {
  Vue.component('PdfJsVue', PdfJsVue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  PdfJsVue
}
