function MbwdAssets () { // eslint-disable-line
  const mbwdAssets = {
    version: '1.0.0',
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

      new Vue({// eslint-disable-line
        el: document.querySelector(querySelector),
        components: {
          'mbwd-assets': MBWD_ASSETS()// eslint-disable-line
        }
      })
    }
  }

  return mbwdAssets
}
