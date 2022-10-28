function MbwdAssets () { // eslint-disable-line
  return {
    version: '1.0.0',
    appendStyle () {
      const cssLink = document.createElement('link')
      cssLink.href = 'http://localhost:5001/web/widgets/mbwd-assets/css/mbwd-assets.css'
      cssLink.rel = 'stylesheet'

      document.head.appendChild(cssLink)
    },
    render: function (Vue, querySelector) {
      if (!Vue) {
        throw Error('Vue is required to load this widget')
      }

      if (Vue.version && Number(Vue.version[0]) < 2) {
        throw Error('You must provide at least a Vue 2 version')
      }

      if (!querySelector) {
        throw Error('Provide a querySelector')
      }

      this.appendStyle()

      const mbwdAssetsWrapper = document.querySelector(querySelector)
      const mbwdAssetsTag = `<mbwd-assets v-bind='${mbwdAssetsWrapper.dataset.props}' />`
      mbwdAssetsWrapper.insertAdjacentHTML('beforeend', mbwdAssetsTag)

      new Vue({// eslint-disable-line
        el: document.querySelector('mbwd-assets'),
        components: {
          'mbwd-assets': MBWD_ASSETS()// eslint-disable-line
        }
      })
    }
  }
}
