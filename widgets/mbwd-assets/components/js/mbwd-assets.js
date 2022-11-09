const MBWD_ASSETS = () => ({ //eslint-disable-line
  template: `
    <div class="mbwd-assets">
      <h2 class="title">{{ i18n('Conheça os nossos produtos') }}</h2>
      <div class="search-wrapper">
        <mbc-search-box :value.sync="search" :placeholder="i18n('Busque um produto')" widgetName="mbwd-assets" />
      </div>
      <mbwd-crypto-assets v-show="!cptdDisplayEmptyState" :search="search" :language="language" :interval-timeout="intervalTimeout" @list-updated="onCryptoAssetsUpdated">
        <template v-slot:crypto-cards-list="{ assets }">
          <slot name="crypto-cards-list" :assets="assets"></slot>
        </template>
      </mbwd-crypto-assets>
      <mbwd-fixed-income-assets v-show="!cptdDisplayEmptyState" :search="search" :language="language" :interval-timeout="intervalTimeout" @list-updated="onFixedIncomeAssetsUpdated" />
      <mbc-empty-state v-if="cptdDisplayEmptyState" :title="cptdEmptyStateConfig.title" :message="cptdEmptyStateConfig.message" :main-state-icon="cptdEmptyStateConfig.img" :cta="cptdEmptyStateConfig.cta" widgetName="mbwd-assets"/>
    </div>`,
  props: {
    language: {
      type: String,
      default: 'pt'
    },
    intervalTimeout: {
      type: Number,
      default: 30000 // ms
    }
  },
  mixins: [window.MB_WIDGETS.configMixins],// eslint-disable-line
  components: {
    'mbc-empty-state': MBC_EMPTY_STATE(),// eslint-disable-line
    'mbc-search-box': MBC_SEARCH_BOX(),// eslint-disable-line
    'mbwd-crypto-assets': MBWD_CRYPTO_ASSETS(),// eslint-disable-line
    'mbwd-fixed-income-assets': MBWD_FIXED_INCOME_ASSETS()// eslint-disable-line
  },
  data () {
    return {
      cryptoResults: undefined,
      fixedIncomeResults: undefined,
      search: '',
      translateMap: {
        pt: {
          'Conheça os nossos produtos': 'Conheça os nossos produtos',
          'Busque um produto': 'Busque um produto',
          'Ainda não temos #searchTerm no MB, mas anotamos a sugestão!':
            'Ainda não temos #searchTerm no MB, mas anotamos a sugestão!'
        },
        en: {
          'Conheça os nossos produtos': 'Discover our products',
          'Busque um produto': 'Search for a product',
          'Ainda não temos #searchTerm no MB, mas anotamos a sugestão!':
            'We don\'t have #searchTerm in MB yet, but we\'ve noted the suggestion!'
        },
        es: {
          'Conheça os nossos produtos': 'Descubre nuestros productos',
          'Busque um produto': 'Buscar un producto',
          'Ainda não temos #searchTerm no MB, mas anotamos a sugestão!':
            'Todavía no tenemos #searchTerm en MB, ¡pero hemos tomado nota de la sugerencia!'
        }
      }
    }
  },
  computed: {
    cptdEmptyStateConfig () {
      if (this.cptdDisplayEmptyState) {
        return {
          title: 'Sem resultado',
          message: this.i18n(
            'Ainda não temos #searchTerm no MB, mas anotamos a sugestão!'
          ).replace('#searchTerm', `"${this.search}"`),
          img: 'ilu-empty-search-result.svg'
        }
      }
    },
    cptdHasAssetsCardsScopedSlot () {
      return !!this.$slots['assets-cards']
    },
    cptdDisplayEmptyState () {
      return (
        this.search && this.cryptoResults === 0 && this.fixedIncomeResults === 0
      )
    }
  },
  methods: {
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    },
    onCryptoAssetsUpdated (resultLength) {
      this.cryptoResults = resultLength
    },
    onFixedIncomeAssetsUpdated (resultLength) {
      this.fixedIncomeResults = resultLength
    }
  }
})
