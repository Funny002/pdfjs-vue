const PDFLib = require('pdfjs-dist/legacy/build/pdf')

PDFLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')

const ENABLE_XFA = true

const CMAP_PACKED = true

const CMAP_URL = '../node_modules/pdfjs-dist/cmaps/'

export default url => PDFLib.getDocument({url, cMapUrl: CMAP_URL, enableXfa: ENABLE_XFA, cMapPacked: CMAP_PACKED})