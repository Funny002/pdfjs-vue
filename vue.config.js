const sourceMap = false

module.exports = {
  pages: {
    index: {
      title: 'pdfjs-vue',
      filename: 'index.html',
      entry: './example/main.js',
      template: './example/index.html'
    }
  },
  css: {
    sourceMap: sourceMap
  },
  productionSourceMap: sourceMap
}