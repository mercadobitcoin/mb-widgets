const MBWD_ASSETS_COMPARISON_GRAPH_BAR = () => ({ //eslint-disable-line
  template: `
    <div class="graph-bars-wrapper">
      <div class="graph-bar-item">
        <div class="bar-container">
          <div class="bar-filler" :style="cssItemPercentual(baseAsset.monthlyInterestRate)" />
        </div>
        <p class="asset-name">{{ baseAsset.displayName }}</p>
        <p class="value">{{ baseAsset.estimatedYieldAmount | ftFormatCurrency(2) }}</p>
        <p class="yield">{{ baseAsset.estimatedInterestRateLabel }} ao ano</p>
      </div>

      <div v-for="comparissonItem in comparissonAssets" class="graph-bar-item">
        <div class="bar-container">
          <div class="bar-filler" :style="cssItemPercentual(comparissonItem.monthlyInterestRate)" />
        </div>
        <p class="asset-name">{{ comparissonItem.displayName }}</p>
        <p class="value">{{ comparissonItem.estimatedYieldAmount | ftFormatCurrency(2) }}</p>
        <p class="yield">{{ comparissonItem.estimatedInterestRateLabel }} ao ano</p>
      </div>
    </div>
  `,
  mixins: [window.MB_WIDGETS.currencyFilters], //eslint-disable-line
  props: {
    baseAsset: {
      type: Object,
      required: true
    },
    comparissonAssets: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    cssItemPercentual(value) {
      return {
        height: (value/this.baseAsset.monthlyInterestRate)*100 + '%'
      };
    },
  }
})
