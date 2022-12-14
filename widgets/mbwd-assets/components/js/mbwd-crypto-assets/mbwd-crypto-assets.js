MBWD_CRYPTO_ASSETS = () => ({ // eslint-disable-line
  template: `
    <div class="mbwd-crypto-assets" :class="cssClassMobileDesktop">
      <h3 class="title">
        {{ i18n('Criptoativos') }}
        <div v-if="mobileMode" class="view-modes">
          <button class="view-mode" :class="cssIsViewModeActive('cards')" @click="onViewModeChange('cards')">
            <img v-if="isViewModeActive('cards')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/mbwd-assets/img/icons/ico-four-squares-white.svg'" width="17" height="16">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/mbwd-assets/img/icons/ico-four-squares-mono.svg'" width="17" height="16">
          </button>
          <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
            <img v-if="isViewModeActive('table')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/mbwd-assets/img/icons/ico-three-rectangles-white.svg'" width="16" height="16">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/mbwd-assets/img/icons/ico-three-rectangles-mono.svg'" width="16" height="16">
          </button>
        </div>
      </h3>
      <div class="options">
        <div :class="cptdClassCategory">
          <button class="category" v-for="category in cptdAssetCategories" :class="cssIsCategoryActive(category.value)" @click="changeCategory(category.value)">
            {{ i18n(category.label) }}
          </button>
        </div>
        <div v-if="!mobileMode" class="view-modes">
          <button class="view-mode" :class="cssIsViewModeActive('cards')" @click="onViewModeChange('cards')">
            <img v-if="isViewModeActive('cards')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/mbwd-assets/img/icons/ico-four-squares-white.svg'" width="17" height="16">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/mbwd-assets/img/icons/ico-four-squares-mono.svg'" width="17" height="16">
          </button>
          <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
            <img v-if="isViewModeActive('table')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/mbwd-assets/img/icons/ico-three-rectangles-white.svg'" width="16" height="16">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/mbwd-assets/img/icons/ico-three-rectangles-mono.svg'" width="16" height="16">
          </button>
        </div>
      </div>
      <mbc-empty-state v-if="cptdDisplayEmptyState" :title="cptdEmptyStateConfig.title" :message="cptdEmptyStateConfig.message" :main-state-icon="cptdEmptyStateConfig.img" :cta="cptdEmptyStateConfig.cta" widgetName="mbwd-assets" />
      <div v-if="cptdDisplayResultList" class="result-list">
        <div v-if="isViewModeActive('cards')" class="view-mode-list card">
          <slot name="crypto-cards-list" :assets="cryptoAssets.result">
            <mbwd-crypto-asset-card-list :display-skeleton="displaySkeleton" :assets="cryptoAssets.result" :language="language"/>
          </slot>
        </div>
        <div v-else class="view-mode-list table">
          <slot name="crypto-table" :assets="cryptoAssets.result">
            <mbwd-crypto-asset-table ref="refCryptoAssetTable" :display-skeleton="displaySkeleton" :initial-sort="cryptoAssets.sort" :initial-order="cryptoAssets.order" :assets="cryptoAssets.result" :language="language" @sort="changeSortOrder"/>
          </slot>
        </div>
      </div>
      <div class="pagination-wrapper">
        <mbc-pagination :total-pages="cryptoAssets.totalPages" :current-page="cryptoAssets.currentPage" track-component="assets" @change="changePage"/>
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
      busy: false,
      displaySkeleton: false,
      cryptoAssets: {
        type: 'crypto',
        offset: 0,
        limit: 5,
        category: 'all',
        sort: 'symbol',
        order: 'asc',
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        result: []
      },
      viewMode: 'table', // [card, table]
      shouldOverwriteCryptoAssetResult: false,
      translateMap: {
        pt: {
          'favoritos': 'Favoritos', // eslint-disable-line
          'criptoativos': 'Criptoativos', // eslint-disable-line
          'novos': 'Novos', // eslint-disable-line
          'todos': 'Todos', // eslint-disable-line
          'em alta': 'Em alta',
          'em baixa': 'Em baixa',
          'n??o encontramos nada em ativos': 'N??o encontramos nada em Ativos'
        },
        en: {
          'favoritos': 'Favorites', // eslint-disable-line
          'criptoativos': 'Cryptoassets', // eslint-disable-line
          'novos': 'New', // eslint-disable-line
          'todos': 'All', // eslint-disable-line
          'em alta': 'Ups',
          'em baixa': 'Downs',
          'n??o encontramos nada em ativos': 'We didn\'t find anything in Assets'
        },
        es: {
          'favoritos': 'Favoritos', // eslint-disable-line
          'criptoativos': 'Criptoactivos', // eslint-disable-line
          'novos': 'Nuevos', // eslint-disable-line
          'todos': 'Todos', // eslint-disable-line
          'em alta': 'En alta',
          'em baixa': 'En baja',
          'n??o encontramos nada em ativos': 'No encontramos nada en Activos'
        }
      }
    }
  },
  mounted () {
    this.displaySkeleton = true
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
    cssClassMobileDesktop () {
      return this.mobileMode ? 'mobile' : 'desktop'
    },
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
        title: this.i18n('N??o encontramos nada em Ativos'),
        message: '',
        img: 'ilu-empty-search-result.svg'
      }
    },
    cptdIsAllCategory () {
      return this.cryptoAssets.category === 'all'
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
    },
    cptdClassCategory () {
      return [
        'categories',
        this.mobileMode ? 'mobile' : ''
      ]
    },
    cptdDisplayResultList () {
      return this.displaySkeleton || this.cryptoAssets.result.length > 0
    },
    cptdDisplayEmptyState () {
      return !this.displaySkeleton && this.cryptoAssets.result.length === 0
    }
  },
  watch: {
    search (value, oldValue) {
      if (oldValue && !value) {
        this.resetSearchQuery()
      } else {
        this.resetCryptoBasicQueryDefaultState()
      }

      this.setCryptoAssetsRequestQueryStringAndGetCryptoAssets()
    }
  },
  methods: {
    cssIsCategoryActive (category) {
      return this.cryptoAssets.category === category ? 'active' : ''
    },
    cssIsViewModeActive (viewMode) {
      return this.isViewModeActive(viewMode) ? 'active' : ''
    },
    setCryptoAssetsRequestQueryStringAndGetCryptoAssets () {
      this.setCryptoAssetsRequestQueryString()
      this.getCryptoAssets()
    },
    async getCryptoAssets () {
      if (!this.busy) {
        this.busy = true
        try {
          const response = await fetch(`https://store.mercadobitcoin.com.br/api/v1/marketplace/product/unlogged${this.getCryptoAssetsRequestQueryString()}`)

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
                this.cryptoAssets.totalItems = total_items //eslint-disable-line
                this.cryptoAssets.totalPages = Math.ceil(total_items / this.cryptoAssets.limit)//eslint-disable-line
                this.cryptoAssets.currentPage = this.cryptoAssets.currentPage > this.cryptoAssets.totalPages ? this.cryptoAssets.totalPages : this.cryptoAssets.currentPage
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

        this.displaySkeleton = false
        this.busy = false
        this.$emit('list-updated', this.cryptoAssets.result.length)
      }
    },
    setCryptoAssetsRequestQueryString () {
      if (this.cptdIsNewCategory) {
        this.cryptoAssets.sort = 'release_date'
        this.cryptoAssets.order = 'desc'
      }

      if (this.cptdIsUpTrendCategory) {
        this.cryptoAssets.sort = 'variation'
        this.cryptoAssets.order = 'desc'
      }

      if (this.cptdIsDownTrendCategory) {
        this.cryptoAssets.sort = 'variation'
        this.cryptoAssets.order = 'asc'
      }

      if (this.cptdIsAllCategory) {
        this.cryptoAssets.sort = 'symbol'
        this.cryptoAssets.order = 'asc'
      }
      this.setCryptoAssetsOffset()
    },
    setCryptoAssetsOffset () {
      if (this.cryptoAssets.totalPages > 1) {
        if (this.shouldOverwriteCryptoAssetResult && this.cptdShowMore) {
          this.cryptoAssets.offset = 0
        } else {
          this.cryptoAssets.currentPage = this.cryptoAssets.currentPage > Math.ceil(this.cryptoAssets.totalItems / this.cryptoAssets.limit) ? Math.ceil(this.cryptoAssets.totalItems / this.cryptoAssets.limit) : this.cryptoAssets.currentPage
          this.cryptoAssets.offset = (this.cryptoAssets.currentPage - 1) * this.cryptoAssets.limit
        }
      }
    },
    getCryptoAssetsRequestQueryString () {
      this.setCryptoAssetsLimit()

      const { type, sort, order, limit, offset } =
      this.cryptoAssets
      const searchQueryStringsMap = {
        type,
        limit,
        sort,
        order,
        offset,
        search: this.search
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
      return this.translateMap?.[this.language]?.[key.toLowerCase()] ?? ''
    },
    isViewModeActive (viewMode) {
      return this.viewMode === viewMode
    },
    changeCategory (category) {
      this.cryptoAssets.category = category

      if (this.cptdIsNewCategory && this.search) {
        this.$parent.$emit('clear-search')
      } else {
        this.shouldOverwriteCryptoAssetResult = true
        this.resetPaginationQuery()
        this.setCryptoAssetsRequestQueryString()
        if (this.cptdIsAllCategory && this.cryptoAssets.sort === '' && this.cryptoAssets.order === '') {
          this.cryptoAssets.sort = 'symbol'
          this.cryptoAssets.order = 'asc'
        }
        this.getCryptoAssets()
      }

      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:${category}`
      })
    },
    changePage (page) {
      this.cryptoAssets.currentPage = page
      this.setCryptoAssetsOffset()
      this.getCryptoAssets()
    },
    changeSortOrder ({ sort, order }) {
      if (this.cryptoAssets.sort !== sort) {
        this.cryptoAssets.category = 'all'
      }

      this.cryptoAssets.sort = sort
      this.cryptoAssets.order = order
      this.cryptoAssets.offset = 0
      this.cryptoAssets.currentPage = 1
      this.getCryptoAssets()
    },
    onViewModeChange (viewMode) {
      if (this.viewMode !== viewMode) {
        this.displaySkeleton = true
        this.viewMode = viewMode
        this.shouldOverwriteCryptoAssetResult = true
        this.setCryptoAssetsLimit()
        this.setCryptoAssetsRequestQueryStringAndGetCryptoAssets()
        this.stopGetCryptoAssetsInterval()
        this.scheduleGetCryptoAssetsInterval()

        this.$root.$emit('track-analytics', {
          ec: 'web:site:home',
          en: 'click',
          lb: `assets:${viewMode}`
        })
      }
    },
    resetPaginationQuery () {
      this.cryptoAssets.currentPage = 1
      this.cryptoAssets.offset = 0
    },
    resetSearchQuery () {
      this.cryptoAssets.sort = ''
      this.cryptoAssets.order = ''
      this.resetPaginationQuery()
      this.shouldOverwriteCryptoAssetResult = true
    },
    resetCryptoBasicQueryDefaultState () {
      this.resetSearchQuery()
      this.cryptoAssets.category = 'all'
    },
    setCryptoAssetsLimit () {
      const limit = this.viewMode === 'cards' ? 4 : 5
      if (this.cptdShowMore) {
        this.cryptoAssets.limit = this.shouldOverwriteCryptoAssetResult ? this.cryptoAssets.currentPage * limit : limit
      } else {
        this.cryptoAssets.limit = limit
      }
    },
    scheduleGetCryptoAssetsInterval () {
      this.intervalId = setInterval(() => {
        if (!this.busy) {
          this.shouldOverwriteCryptoAssetResult = true
          this.setCryptoAssetsOffset()
          this.getCryptoAssets()
        }
      }, this.intervalTimeout)
    },
    stopGetCryptoAssetsInterval () {
      clearInterval(this.intervalId)
    }
  }
})
