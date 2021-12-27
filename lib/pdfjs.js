import {hasType} from '../utils/Type'

const PDFLib = require('pdfjs-dist/legacy/build/pdf')

const workerEntry = require('pdfjs-dist/legacy/build/pdf.worker.entry')

PDFLib.GlobalWorkerOptions.workerSrc = workerEntry

const ENABLE_XFA = true

const CMAP_PACKED = true

const CMAP_URL = '../node_modules/pdfjs-dist/cmaps/'

const outputScale = window.devicePixelRatio || 1

const scaleTransform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null

const createCanvas = (page, width, height) => {
  const canvas = document.createElement('canvas')
  canvas.style.cssText = `width: ${width}px; height: ${height};`
  canvas.height = Math.floor(height * outputScale)
  canvas.width = Math.floor(width * outputScale)
  canvas.id = `PdfJs-page-${page}`
  return canvas
}

export const getPage = (PdfDoc, page = 1, scale = 75) => {
  return new Promise((resolve, reject) => {
    try {
      PdfDoc.getPage(page).then(pageProxy => {
        const viewport = pageProxy.getViewport({scale: scale / 100})
        const canvas = createCanvas(page, viewport.width, viewport.height)
        pageProxy.render({
          viewport,
          transform: scaleTransform,
          canvasContext: canvas.getContext('2d')
        }).promise.then(() => {
          resolve(canvas)
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}


export const getDocument = (url, cmaps = true) => {
  if (cmaps) {
    // https://unpkg.com/browse/pdfjs-dist@2.12.313/cmaps/
    cmaps = hasType(cmaps, 'boolean') ? 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/cmaps/' : cmaps
  } else {
    cmaps = CMAP_URL
  }
  return PDFLib.getDocument({
    url,
    cMapUrl: cmaps,
    enableXfa: ENABLE_XFA,
    cMapPacked: CMAP_PACKED
  })
}

export default getDocument