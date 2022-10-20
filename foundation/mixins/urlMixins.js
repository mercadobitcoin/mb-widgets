window.MB_WIDGETS = window.MB_WIDGETS || {}
window.MB_WIDGETS.URLMixins = { //eslint-disable-line
  methods: {
    mxCreateUrlQueryString (options) {
      if (!options || !Object.keys(options).length) {
        return ''
      }

      return '?'.concat(
        Object.keys(options)
          .map(
            (key) => {
              if (options[key]) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`
              }

              return ''
            }
          )
          .filter(options => !!options)
          .join('&')
      )
    }
  }
}
