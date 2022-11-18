const MBWD_FIXED_INCOME_ASSET_CARD_LIST = () => ({// eslint-disable-line
  template: `
    <div class="mbwd-fixed-income-asset-card-list apollo">
      <a v-if="!mobileMode" class="fixed-income-card desktop" v-for="asset in assets" :key="asset.product_data.symbol">
        <mbc-asset-badges :badges="getAssetBadgeAsArray(asset)" :language="language" widgetName="mbwd-assets" />
        <div class="asset-data">
          <div class="attributes">
            <p class="name">{{ asset.name }}</p>
            <p class="title">{{ i18n('Valor inicial') }}</p>
            <p class="description minimum-value">{{ i18n('A partir de') }} {{ asset.product_data.minimum_value | ftFormatCurrency(2) }}</p>
            <p class="title">{{ i18n('Rentabilidade') }}</p>
            <p class="description profitability">{{ asset.product_data.profitability }}</p>
            <p class="title">{{ i18n('Prazo estimado') }}</p>
            <p class="description">{{ asset.product_data.estimated_liquidation_date }}</p>
          </div>
          <div class="sold-percentage">
            <div class="middle-circle">
              <p>{{ getPercentageString(asset.product_data.sold_percentage.number) }}</p>
              <p><strong>{{ i18n('vendido') }}</strong></p>
            </div>
            <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle"
              :stroke-dasharray="getSVGSoldPercentageStyle(asset.product_data.sold_percentage.number)"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          </div>
        </div>
        <div class="ctas">
          <a class="button primary filled" @click="redirectToAssetTradeExperience(asset.product_data.symbol)">{{ i18n('Investir') }}</a>
          <a class="button secondary ghost" @click="redirectToAssetLandingPage(asset.product_data.symbol)">{{ i18n('Conhecer') }}</a>
        </div>
      </a>
      <a v-if="mobileMode" class="fixed-income-card mobile" v-for="asset in assets" :key="asset.product_data.symbol">
        <div class="attributes">
          <div class="header">
            <img class="asset-icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
            <p class="symbol">{{ asset.product_data.symbol }}</p>
          </div>
          <mbc-asset-badges :badges="getAssetBadgeAsArray(asset)" :language="language" widgetName="mbwd-assets"/>
        </div>
        <div class="market-data">
          <p class="profitability">
            {{ asset.product_data.profitability }}
          </p>
          <div class="minimum-value">
            <p class="min-label">{{ i18n('A partir de') }}</p>
            <p class="min-value">{{ asset.product_data.minimum_value | ftFormatCurrency(2) }}</p>
          </div>
        </div>
      </a>
    </div>`,
  props: {
    language: {
      type: String,
      default: 'pt'
    },
    assets: {
      type: Array,
      default: () => []
    }
  },
  mixins: [window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.configMixins, window.MB_WIDGETS.currencyFilters],// eslint-disable-line
  components: {
    'mbc-asset-badges': MBC_ASSET_BADGES() // eslint-disable-line
  },
  data () {
    return {
      translateMap: {
        pt: {
          'Valor inicial': 'Valor inicial',
          'A partir de': 'A partir de',
          'Rentabilidade': 'Rentabilidade', // eslint-disable-line
          'Prazo estimado': 'Prazo estimado',
          'vendido': 'vendido', // eslint-disable-line
          'Investir': 'Investir', // eslint-disable-line
          'Conhecer': 'Conhecer' // eslint-disable-line
        },
        en: {
          'Valor inicial': 'Initial Value',
          'A partir de': 'From',
          'Rentabilidade': 'Profitability', // eslint-disable-line
          'Prazo estimado': 'Due Date',
          'vendido': 'sold', // eslint-disable-line
          'Investir': 'Invest', // eslint-disable-line
          'Conhecer': 'View more' // eslint-disable-line

        },
        es: {
          'Valor inicial': 'Valor inicial',
          'A partir de': 'De',
          'Rentabilidade': 'Rentabilidad', // eslint-disable-line
          'Prazo estimado': 'Plazo',
          'vendido': 'vendido', // eslint-disable-line
          'Investir': 'Invertir', // eslint-disable-line
          'Conhecer': 'Saber más' // eslint-disable-line
        }
      }
    }
  },
  methods: {
    getAssetBadgeAsArray (asset) {
      return [...(asset.product_data?.tags || []), { text: asset?.product_data?.status?.value ?? '', type: 'status', color: asset?.product_data?.status?.color }]
    },
    getPercentageString (percentage = 0) {
      let percString = percentage

      if (percString > 100) {
        percString = 100
      }

      if (percString < 0) {
        percString = 0
      }

      return `${this.$options.filters.ftFormatNumber(percString, 2)}%`
    },
    getSVGSoldPercentageStyle (soldPercentage) {
      return `${soldPercentage}, 100`
    },
    getIconAlt (name) {
      return `ícone ${name}`
    },
    getAssetBasicTradeExperienceLink (symbol) {
      return `https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(symbol ?? '').toLowerCase()}/brl`
    },
    getAssetLandingPageLink (symbol) {
      return `https://www.mercadobitcoin.com.br/conhecer/${(symbol ?? '').toLowerCase()}`
    },
    redirectToAssetTradeExperience (symbol) {
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `fixed-income:card:${symbol}:invest`
      })
      location.href = this.getAssetBasicTradeExperienceLink(symbol) // eslint-disable-line
    },
    redirectToAssetLandingPage (symbol) {
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `fixed-income:card:${symbol}:learn`
      })
      location.href = this.getAssetLandingPageLink(symbol) // eslint-disable-line
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    }
  }
})
