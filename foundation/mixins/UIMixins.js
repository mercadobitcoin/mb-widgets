const UIMixins = {
  data() {
    return {
      mobileMode: false,
      mobileThreshold: 645,
      mediumThreshold: null,
      mediumThresholdConfig: {
        min: 641,
        max: 1130
      }
    }
  },
  created() {
    var clientWidth = document.documentElement.clientWidth;
    this.mobileMode = clientWidth <= this.mobileThreshold;
    this.mediumThreshold = !this.mobileMode && (clientWidth >= this.mediumThresholdConfig.min && clientWidth <= this.mediumThresholdConfig.max);
  }
}