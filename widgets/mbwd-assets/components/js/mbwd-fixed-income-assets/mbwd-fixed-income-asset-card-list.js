const MBWD_FIXED_INCOME_ASSET_CARD_LIST = () => ({// eslint-disable-line
  template: `
    <div class="mbwd-fixed-income-asset-card-list apollo">
      <a v-if="!mobileMode" class="fixed-income-card desktop" v-for="asset in assets" :key="asset.symbol">
        <mbc-asset-badges :badges="getAssetBadgeAsArray(asset.status.value)" type="fixed-income" />
        <div class="asset-data">
          <div class="attributes">
            <p class="name">{{ asset.name }}</p>
            <p class="title">{{ i18n('Valor inicial') }}</p>
            <p class="description minimum-value">{{ i18n('A partir de') }} {{ asset.minimum_value }}</p>
            <p class="title">{{ i18n('Rentabilidade') }}</p>
            <p class="description profitability">{{ asset.profitability }}</p>
            <p class="title">{{ i18n('Prazo estimado') }}</p>
            <p class="description">{{ asset.estimated_liquidation_date }}</p>
          </div>
          <div class="sold-percentage">
            <div class="middle-circle">
              <p>{{ getPercentageString(asset.sold_percentage.number) }}</p>
              <p><strong>{{ i18n('vendido') }}</strong></p>
            </div>
            <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle"
              :stroke-dasharray="getSVGSoldPercentageStyle(asset.sold_percentage.number)"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          </div>
        </div>
        <div class="ctas">
          <a class="button primary filled">Investir</a>
          <a class="button secondary ghost">Conhecer</a>
        </div>
      </a>
      <a v-if="mobileMode" class="fixed-income-card mobile" v-for="asset in assets" :key="asset.symbol">
        <div class="attributes">
          <div class="header">
            <img class="asset-icon" :src="getIconUrl(asset.symbol)" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
            <p class="symbol">{{ asset.symbol }}</p>
          </div>
          <mbc-asset-badges :badges="getAssetBadgeAsArray(asset.status)" type="fixed-income" />
        </div>
        <div class="market-data">
          <p class="profitability">
            {{ asset.profitability }}
          </p>
          <div class="minimum-value">
            <p class="min-label">{{ i18n('A partir de') }}</p>
            <p class="min-value">{{ asset.minimum_value }}</p>
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
          'nas últimas 24h': 'nas últimas 24h',
          'Valor inicial': 'Valor inicial',
          'A partir de': 'A partir de',
          Rentabilidade: 'Rentabilidade',
          'Prazo estimado': 'Prazo estimado',
          vendido: 'vendido'
        },
        en: {
          'nas últimas 24h': 'nas últimas 24h',
          'Valor inicial': 'Valor inicial',
          'A partir de': 'A partir de',
          Rentabilidade: 'Rentabilidade',
          'Prazo estimado': 'Prazo estimado',
          vendido: 'vendido'
        },
        es: {
          'nas últimas 24h': 'nas últimas 24h',
          'Valor inicial': 'Valor inicial',
          'A partir de': 'A partir de',
          Rentabilidade: 'Rentabilidade',
          'Prazo estimado': 'Prazo estimado',
          vendido: 'vendido'
        }
      }
    }
  },
  methods: {
    getAssetBadgeAsArray (status) {
      return [status]
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
    getIconUrl (symbol) {
      return `${this.MB_WIDGETS_GLOBAL_Cdn_Assets_Icon_Url}/img/icons/assets/ico-asset-${(
        symbol ?? ''
      ).toLowerCase()}-color.svg`
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    }
  }
})
