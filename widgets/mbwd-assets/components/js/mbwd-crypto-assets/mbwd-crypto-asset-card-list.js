 MBWD_CRYPTO_ASSET_CARD_LIST = () => ({ // eslint-disable-line
  template: `
    <div class="mbwd-crypto-asset-card-list">
      <a v-if="mobileMode" class="crypto-card mobile" v-for="asset in assets" :key="asset.symbol" @click="triggerGA(asset.symbol)">
        <div class="attributes">
          <div class="header">
            <img class="asset-icon" :src="getIconUrl(asset.symbol)" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
            <div class="asset-data">
              <p class="name">{{ asset.name }}</p>
              <p class="type">{{ i18n(asset.sub_type) }}</p>
            </div>
          </div>
          <mbc-asset-badges :badges="asset.badges" type="crypto" />
        </div>
        <div class="market-data">
          <p class="variation">
            <span class="value" :class="asset.variation.status">{{ asset.variation.string }}</span>
            <span class="label-24h">24h</span>
          </p>
          <p class="price">{{ asset.market_price | ftFormatCurrency(2) }}</p>
        </div>
      </a>
      <a v-if="!mobileMode" class="crypto-card desktop" v-for="asset in assets" :key="asset.symbol" @click="triggerGA(asset.symbol)">
        <div class="attributes">
          <div class="header">
            <img class="asset-icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
            <mbc-asset-badges :badges="asset.badges" type="crypto" />
          </div>
          <p class="name">
            {{ asset.name }}
            <span class="symbol">({{ asset.symbol }})</span>
          </p>
          <p class="type">{{ i18n(asset.sub_type) }}</p>
        </div>
        <p class="price">{{ asset.market_price | ftFormatCurrency(2) }}</p>
        <span class="variation">
          <span class="value" :class="asset.variation.status">{{ asset.variation.string }}</span>
            {{ i18n('nas últimas 24h') }}
        </span>
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
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.currencyFilters, window.MB_WIDGETS.trackEvent], // eslint-disable-line
  components: {
    'mbc-asset-badges': MBC_ASSET_BADGES() // eslint-disable-line
  },
  data () {
    return {
      translateMap: {
        pt: {
          'nas últimas 24h': 'nas últimas 24h',
          utility_token: 'Utility token',
          coin: 'Criptomoeda'
        },
        en: {
          'nas últimas 24h': 'nas últimas 24h',
          utility_token: 'Utility token',
          coin: 'Criptomoeda'
        },
        es: {
          'nas últimas 24h': 'nas últimas 24h',
          utility_token: 'Utility token',
          coin: 'Criptomoeda'
        }
      }
    }
  },
  methods: {
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    },
    getIconAlt (name) {
      return `ícone ${name}`
    },
    triggerGA (symbol) {
      this.ga({
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:card:${symbol}`
      })
    }
  }
})
