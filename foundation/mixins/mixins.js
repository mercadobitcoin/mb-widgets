const mixins = { //eslint-disable-line
  methods: {
    mxDebounce (debounceIntervalId, callback, wait) {
      const debounceWaitTimeOut = wait || 300

      clearTimeout(debounceIntervalId)
      return (debounceIntervalId = setTimeout(callback, debounceWaitTimeOut))
    }
  }
}
