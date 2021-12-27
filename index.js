import PdfJsVue from './lib/PdfJsVue'
import './scss/index.scss'

const install = (Vue) => {
  Vue.component('PdfJsVue', PdfJsVue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

PdfJsVue.install = install

export default PdfJsVue