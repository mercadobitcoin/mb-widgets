 const MBWD_CRYPTO_ASSET_CARD_LIST = () => ({ // eslint-disable-line
  template: `
    <div class="mbwd-crypto-asset-card-list">
      <template v-if="displaySkeleton">
        <mbwd-crypto-asset-card-skeleton v-for="index in qtdSkeletons" :key="'crypto-asset-card-'+index" />
      </template>
      <template v-else>
        <a v-if="mobileMode" class="crypto-card mobile" v-for="asset in assets" :key="asset.product_data.symbol" @click="redirectToAssetTradeExperience(asset.product_data.symbol)">
          <div class="attributes">
            <div class="header">
              <img class="asset-icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)" with="24" height="24" />
              <div class="asset-data">
                <p class="name">{{ asset.name }}</p>
                <p class="type">{{ i18n(asset.product_data.sub_type.display_text) }}</p>
              </div>
            </div>
            <mbc-asset-badges :badges="asset.tags" type="crypto" :language="language" widgetName="mbwd-assets"/>
          </div>
          <div class="market-data">
            <p class="variation">
              <span class="value" :class="asset.product_data.variation.status">{{ asset.product_data.variation.string }}</span>
              <span class="label-24h">24h</span>
            </p>
            <p class="price">{{ asset.market_price | ftFormatCurrency(asset.product_data.fiat_decimals || 4) }}</p>
          </div>
        </a>
        <a v-if="!mobileMode" class="crypto-card desktop" v-for="asset in assets" :key="asset.product_data.symbol" @click="redirectToAssetTradeExperience(asset.product_data.symbol)">
          <div class="attributes">
            <div class="header">
              <img class="asset-icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)" with="24" height="24" />
              <mbc-asset-badges :badges="asset.tags" type="crypto" :language="language" widgetName="mbwd-assets"/>
            </div>
            <p class="name">
              {{ asset.name }}
              <span class="symbol">({{ asset.product_data.symbol }})</span>
            </p>
            <p class="type">{{ i18n(asset.product_data.sub_type.display_text) }}</p>
          </div>
          <p class="price">{{ asset.market_price | ftFormatCurrency(asset.product_data.fiat_decimals || 4) }}</p>
          <span class="variation">
            <span class="value" :class="asset.product_data.variation.status">{{ asset.product_data.variation.string }}</span>
              {{ i18n('nas ??ltimas 24h') }}
          </span>
        </a>
      </template>
    </div>`,
  props: {
    language: {
      type: String,
      default: 'pt'
    },
    assets: {
      type: Array,
      default: () => []
    },
    displaySkeleton: {
      type: Boolean,
      default: false
    }
  },
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.currencyFilters], // eslint-disable-line
  components: {
    'mbc-asset-badges': MBC_ASSET_BADGES(), // eslint-disable-line
    'mbwd-crypto-asset-card-skeleton': MBWD_CRYPTO_ASSET_CARD_SKELETON() // eslint-disable-line
  },
  data () {
    return {
      qtdSkeletons: 4,
      translateMap: {
        pt: {
          'nas ??ltimas 24h': 'nas ??ltimas 24h',
          'criptomoeda': 'Criptomoeda', // eslint-disable-line
          'utility token': 'Utility Token',
          'defi': 'Defi', // eslint-disable-line
          'fan token': 'Fan Token'
        },
        en: {
          'nas ??ltimas 24h': 'last 24h',
          'criptomoeda': 'Cryptocurrency', // eslint-disable-line
          'utility token': 'Utility Token',
          'defi': 'Defi', // eslint-disable-line
          'fan token': 'Fan Token'
        },
        es: {
          'nas ??ltimas 24h': '??ltimas 24h',
          'criptomoeda': 'Criptomoneda', // eslint-disable-line
          'utility token': 'Utility Token',
          'defi': 'Defi', // eslint-disable-line
          'fan token': 'Fan Token'
        }
      }
    }
  },
  methods: {
    i18n (key) {
      return this.translateMap?.[this.language]?.[key.toLowerCase()] ?? ''
    },
    getIconAlt (name) {
      return `??cone ${name}`
    },
    getAssetBasicTradeExperienceLink (symbol) {
      return `https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(symbol ?? '').toLowerCase()}/brl`
    },
    redirectToAssetTradeExperience (symbol) {
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:card:${symbol}`
      })

      location.href = this.getAssetBasicTradeExperienceLink(symbol) // eslint-disable-line
    }
  }
})
