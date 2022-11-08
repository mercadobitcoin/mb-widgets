MBWD_CRYPTO_ASSETS = () => ({ // eslint-disable-line
  template: `
    <div class="mbwd-crypto-assets">
      <h3 class="title">
        {{ i18n('Criptoativos') }}
        <div v-if="mobileMode" class="view-modes">
          <button class="view-mode" :class="cssIsViewModeActive('cards')" @click="onViewModeChange('cards')">
            <img v-if="isViewModeActive('cards')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-four-squares-white.svg'">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-four-squares-mono.svg'">
          </button>
          <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
            <img v-if="isViewModeActive('table')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-three-rectangles-white.svg'">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-three-rectangles-mono.svg'">
          </button>
        </div>
      </h3>
      <div class="options">
        <div class="categories">
          <button class="category" v-for="category in cptdAssetCategories" :class="cssIsCategoryActive(category.value)" @click="changeCategory(category.value)">
            {{ i18n(category.label) }}
          </button>
        </div>
        <div v-if="!mobileMode" class="view-modes">
          <button class="view-mode" :class="cssIsViewModeActive('cards')" @click="onViewModeChange('cards')">
            <img v-if="isViewModeActive('cards')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-four-squares-white.svg'">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-four-squares-mono.svg'">
          </button>
          <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
            <img v-if="isViewModeActive('table')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-three-rectangles-white.svg'">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-three-rectangles-mono.svg'">
          </button>
        </div>
      </div>
      <mbc-empty-state v-if="cryptoAssets.result.length === 0" :title="cptdEmptyStateConfig.title" :message="cptdEmptyStateConfig.message" :main-state-icon="cptdEmptyStateConfig.img" :cta="cptdEmptyStateConfig.cta" />
      <div v-if="cryptoAssets.result.length > 0" class="result-list">
        <div v-if="isViewModeActive('cards')" class="view-mode-list card">
          <slot name="crypto-cards-list" :assets="cryptoAssets.result">
            <mbwd-crypto-asset-card-list :assets="cryptoAssets.result" :language="language"/>
          </slot>
        </div>
        <div v-else class="view-mode-list table">
          <slot name="crypto-table" :assets="cryptoAssets.result">
            <mbwd-crypto-asset-table ref="refCryptoAssetTable" @sort="changeSortOrder" :assets="cryptoAssets.result" :language="language" />
          </slot>
        </div>
      </div>
      <div class="pagination-wrapper">
        <mbc-pagination :total-pages="cryptoAssets.totalPages" :current-page="cryptoAssets.currentPage" trackComponent="assets" @change="changePage"/>
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.URLMixins], // eslint-disable-line
  props: {
    language: {
      type: String,
      default: 'pt'
    },
    search: {
      type: String,
      default: ''
    },
    intervalTimeout: {
      type: Number,
      default: 30000 // ms
    }
  },
  components: {
    'mbc-empty-state': MBC_EMPTY_STATE(),// eslint-disable-line
    'mbc-pagination': MBC_PAGINATION(),// eslint-disable-line
    'mbwd-crypto-asset-card-list': MBWD_CRYPTO_ASSET_CARD_LIST(),// eslint-disable-line
    'mbwd-crypto-asset-table': MBWD_CRYPTO_ASSET_TABLE()// eslint-disable-line
  },
  data () {
    return {
      intervalId: undefined,
      busy: true,
      cryptoAssets: {
        limit: 5,
        category: 'all',
        sort: '',
        order: '',
        currentPage: 1,
        totalPages: 1,
        result: []
      },
      viewMode: 'table', // [card, table]
      shouldOverwriteCryptoAssetResult: false,
      translateMap: {
        pt: {
          Favoritos: 'Favoritos',
          Criptoativos: 'Criptoativos',
          Novos: 'Novos',
          Todos: 'Todos',
          'Em alta': 'Em alta',
          'Em baixa': 'Em baixa',
          'Não encontramos nada em Ativos': 'Não encontramos nada em Ativos'
        },
        en: {
          Favoritos: 'Favorites',
          Criptoativos: 'Cryptoassets',
          Novos: 'New',
          Todos: 'All',
          'Em alta': 'Ups',
          'Em baixa': 'Downs',
          'Não encontramos nada em Ativos': 'We didn\'t find anything in Assets'
        },
        es: {
          Favoritos: 'Favoritos',
          Criptoativos: 'Criptoactivos',
          Novos: 'Nuevos',
          Todos: 'Todos',
          'Em alta': 'En alta',
          'Em baixa': 'En baja',
          'Não encontramos nada em Ativos': 'No encontramos nada en Activos'
        }
      }
    }
  },
  mounted () {
    this.getCryptoAssets()
    this.scheduleGetCryptoAssetsInterval()
    document.addEventListener(
      'visibilitychange',
      this.handleVisibilityChange,
      false
    )
  },
  destroy () {
    this.stopGetCryptoAssetsInterval()
  },
  computed: {
    cptdAssetCategories () {
      return [
        {
          label: 'Novos',
          value: 'new'
        },
        {
          label: 'Todos',
          value: 'all'
        },
        {
          label: 'Em alta',
          value: 'uptrend'
        },
        {
          label: 'Em baixa',
          value: 'downtrend'
        }
      ]
    },
    cptdShowMore () {
      return this.mobileMode
    },
    cptdEmptyStateConfig () {
      return {
        title: this.i18n('Não encontramos nada em Ativos'),
        message: '',
        img: 'ilu-empty-search-result.svg'
      }
    },
    cptdIsNewCategory () {
      return this.cryptoAssets.category === 'new'
    },
    cptdIsUpTrendCategory () {
      return this.cryptoAssets.category === 'uptrend'
    },
    cptdIsDownTrendCategory () {
      return this.cryptoAssets.category === 'downtrend'
    },
    cptdDisplayTableSorters () {
      return !this.cptdIsNewCategory
    }
  },
  watch: {
    search () {
      this.resetCryptoBasicQueryDefaultState()
      this.getCryptoAssets()
    }
  },
  methods: {
    cssIsCategoryActive (category) {
      return this.cryptoAssets.category === category ? 'active' : ''
    },
    cssIsViewModeActive (viewMode) {
      return this.isViewModeActive(viewMode) ? 'active' : ''
    },
    async getCryptoAssets () {
      this.busy = true
      try {
        const response = await fetch(`https://hotwheels-tp-together.dev.mercadolitecoin.com.br/api/v1/marketplace/product/unlogged${this.getCryptoAssetsRequestQueryString()}`)

        if (response.ok) {
          const data = await response.json() //eslint-disable-line
          const { total_items, response_data } = data //eslint-disable-line
          const { products } = response_data // eslint-disable-line

          if (this.cptdShowMore && !this.shouldOverwriteCryptoAssetResult) {
            this.cryptoAssets.result.push(...products ?? []) //eslint-disable-line
          } else {
            this.cryptoAssets.result = products ?? [] //eslint-disable-line
            this.shouldOverwriteCryptoAssetResult = false
            this.setCryptoAssetsLimit()
          }

          if (this.cptdIsNewCategory) {
            this.cryptoAssets.totalPages = 1
          } else {
            if (total_items) {//eslint-disable-line
              this.cryptoAssets.totalPages = Math.ceil(total_items / this.cryptoAssets.limit)//eslint-disable-line
            } else {
              this.cryptoAssets.totalPages = 1
            }
          }
        } else {
          this.cryptoAssets.result = []
          this.cryptoAssets.totalPages = 1
        }
      } catch (e) {
        this.cryptoAssets.result = []
        this.cryptoAssets.totalPages = 1
      }

      this.busy = false
      this.$emit('list-updated', this.cryptoAssets.result.length)
    },
    getCryptoAssetsRequestQueryString () {
      this.setCryptoAssetsLimit()

      const { sort, order, currentPage, totalPages, limit } =
      this.cryptoAssets
      const searchQueryStringsMap = {
        type: 'crypto',
        limit,
        sort,
        order
      }

      if (this.search) {
        searchQueryStringsMap.search = this.search
      }

      if (this.cptdIsNewCategory) {
        searchQueryStringsMap.sort = 'release_date'
        searchQueryStringsMap.order = 'desc'
        return this.mxCreateUrlQueryString(searchQueryStringsMap)
      }

      if (this.cptdIsUpTrendCategory) {
        searchQueryStringsMap.sort = 'variation'
        searchQueryStringsMap.order = 'desc'
      }

      if (this.cptdIsDownTrendCategory) {
        searchQueryStringsMap.sort = 'variation'
        searchQueryStringsMap.order = 'asc'
      }

      if (totalPages > 1) {
        if (this.shouldOverwriteCryptoAssetResult && this.cptdShowMore) {
          searchQueryStringsMap.offset = 0
        } else {
          searchQueryStringsMap.offset = (currentPage - 1) * limit
        }
      }

      return this.mxCreateUrlQueryString(searchQueryStringsMap)
    },
    handleVisibilityChange () {
      if (document.visibilityState === 'hidden') {
        this.stopGetCryptoAssetsInterval()
      } else {
        this.scheduleGetCryptoAssetsInterval()
      }
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    },
    isViewModeActive (viewMode) {
      return this.viewMode === viewMode
    },
    changeCategory (category) {
      this.resetCryptoBasicQueryDefaultState()
      this.cryptoAssets.category = category
      this.getCryptoAssets()
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:${category}`
      })
    },
    changePage (page) {
      this.cryptoAssets.currentPage = page
      this.getCryptoAssets()
    },
    changeSortOrder ({ sort, order }) {
      if (this.cryptoAssets.sort !== sort) {
        this.cryptoAssets.totalPages = 1
        this.cryptoAssets.currentPage = 1
        this.cryptoAssets.category = 'all'
      }

      this.cryptoAssets.sort = sort
      this.cryptoAssets.order = order
      this.getCryptoAssets()
    },
    onViewModeChange (viewMode) {
      this.viewMode = viewMode

      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:${viewMode}`
      })
    },
    resetCryptoBasicQueryDefaultState () {
      if (this.$refs?.refCryptoAssetTable) {
        this.$refs.refCryptoAssetTable.sort = ''
        this.$refs.refCryptoAssetTable.order = ''
      }

      this.cryptoAssets.sort = ''
      this.cryptoAssets.order = ''
      this.cryptoAssets.currentPage = 1
      this.cryptoAssets.totalPages = 1
      this.cryptoAssets.category = 'all'
      this.shouldOverwriteCryptoAssetResult = true
    },
    setCryptoAssetsLimit () {
      if (this.cptdShowMore) {
        this.cryptoAssets.limit = this.shouldOverwriteCryptoAssetResult ? this.cryptoAssets.currentPage * 5 : 5
      } else {
        this.cryptoAssets.limit = this.viewMode === 'cards' ? 4 : 5
      }
    },
    scheduleGetCryptoAssetsInterval () {
      this.intervalId = setInterval(() => {
        this.shouldOverwriteCryptoAssetResult = true
        this.getCryptoAssets()
      }, this.intervalTimeout)
    },
    stopGetCryptoAssetsInterval () {
      this.intervalId = null
      clearInterval(this.intervalId)
    }
  }
})
