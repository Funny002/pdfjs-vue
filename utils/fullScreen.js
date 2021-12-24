let [hasFullscreen, prefix] = [false, '']

const prefixFor = function () {
  if ('webkitFullscreenEnabled' in document) return [true, 'webkit']
  if ('mozFullScreenEnabled' in document) return [true, 'moz']
  if ('msFullscreenEnabled' in document) return [true, 'ms']
  if ('fullscreenEnabled' in document) return [true, '']
  return [false, '']
}

const exitFullscreen = function () {
  document[!prefix ? 'exitFullscreen' : `${prefix}ExitFullscreen`]()
}

const isElementFullscreen = function () {
  const {fullscreenElement, msFullscreenElement, mozFullScreenElement, webkitFullscreenElement} = document
  return Boolean(fullscreenElement || msFullscreenElement || mozFullScreenElement || webkitFullscreenElement)
}

export default function (element) {
  [hasFullscreen, prefix] = prefixFor()
  if (!hasFullscreen) throw new Error('Current browsers do not support fullScreen')
  element[!prefix ? 'requestFullscreen' : `${prefix}RequestFullscreen`]()
  return {close: exitFullscreen, has: isElementFullscreen}
}