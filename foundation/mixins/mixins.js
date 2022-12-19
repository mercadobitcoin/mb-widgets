window.MB_WIDGETS = window.MB_WIDGETS || {}
window.MB_WIDGETS.mixins = {
  methods: {
    mxDebounce (debounceIntervalId, callback, wait) {
      const debounceWaitTimeOut = wait || 300

      clearTimeout(debounceIntervalId)
      return (debounceIntervalId = setTimeout(callback, debounceWaitTimeOut))
    }
  }
}
