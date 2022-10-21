window.MB_WIDGETS = window.MB_WIDGETS || {}
window.MB_WIDGETS.UIMixins = {//eslint-disable-line
  data () {
    return {
      mobileMode: false,
      mobileThreshold: 768,
      mediumThreshold: null,
      mediumThresholdConfig: {
        min: 641,
        max: 1130
      }
    }
  },
  created () {
    const clientWidth = document.documentElement.clientWidth
    this.mobileMode = clientWidth <= this.mobileThreshold
    this.mediumThreshold =
      !this.mobileMode &&
      clientWidth >= this.mediumThresholdConfig.min &&
      clientWidth <= this.mediumThresholdConfig.max
  }
}
