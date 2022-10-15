function MbwdMostValuedAssets () { // eslint-disable-line
  this.render = function (Vue, querySelector) {
    if (!Vue) {
      throw new Error('Vue is required to load this widget')
    }

    if (Vue.version && Number(Vue.version[0]) < 2) {
      throw new Error('You must provide at least a Vue 2 version')
    }

    if (!querySelector) {
      throw new Error('Provide a querySelector')
    }

    new Vue({ // eslint-disable-line
      el: document.querySelector(querySelector),
      components: {
        'mbwd-most-valued-assets': MBWD_MOST_VALUED_ASSETS() // eslint-disable-line
      }
    })
  }
}
