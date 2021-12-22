const Models = []

const install = (Vue) => {
  Models.forEach(model => {
    Vue.component(model.name, model)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...Models
}