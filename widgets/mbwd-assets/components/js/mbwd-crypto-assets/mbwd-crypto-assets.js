MBWD_CRYPTO_ASSETS = () => ({ // eslint-disable-line
  template: `
          <div class="mbwd-crypto-assets">
            <h3 class="title">
              {{ i18n('Criptoativos') }}
              <div class="view-modes" v-if="mobileMode">
                <button class="view-mode" :class="cssIsViewModeActive('card')" @click="onViewModeChange('card')">
                  card
                </button>
                <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
                  tabela
                </button>
              </div>
            </h3>
            <div class="options">
              <div class="categories">
                <button class="category" v-for="category in cptdAssetCategories" :class="cssIsCategoryActive(category.value)" @click="onCategoryChange(category.value)">
                  {{ i18n(category.label) }}
                </button>
              </div>
              <div class="view-modes" v-if="!mobileMode">
                <button class="view-mode" :class="cssIsViewModeActive('card')" @click="onViewModeChange('card')">
                  card
                </button>
                <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
                  tabela
                </button>
              </div>
            </div>
            <div class="result-list" v-if="cryptoAssets.result.length > 0">
              <div v-if="isViewModeActive('card')" class="view-mode-list card">
                <slot name="crypto-cards-list" :assets="cryptoAssets.result">
                  <mbwd-crypto-asset-card-list :assets="cryptoAssets.result" />
                </slot>
              </div>
              <div v-else class="view-mode-list table">
                <mbwd-crypto-asset-table :assets="cryptoAssets.result" />
              </div>
            </div>
            <div class="pagination-wrapper">
              <mbc-pagination :total-pages="cryptoAssets.totalPages" :current-page="cryptoAssets.currentPage" @change="onPageChange"/>
            </div>
          </div>`,
  props: {
    authenticated: {
      type: Boolean,
      default: false
    },
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
  mixins: [configMixins, UIMixins],// eslint-disable-line
  components: {
    'mbc-pagination': MBC_PAGINATION(),// eslint-disable-line
    'mbwd-crypto-asset-card-list': MBWD_CRYPTO_ASSET_CARD_LIST(),// eslint-disable-line
    'mbwd-crypto-asset-table': MBWD_CRYPTO_ASSET_TABLE()// eslint-disable-line
  },
  data () {
    return {
      intervalId: undefined,
      cryptoAssets: {
        currentPage: 1,
        totalPages: 50,
        result: []
      },
      viewMode: 'card', // [card, table]
      category: 'new',
      sort: 'name',
      translateMap: {
        pt: {
          Favoritos: 'Favoritos',
          Criptoativos: 'Criptoativos',
          Novos: 'Novos',
          Todos: 'Todos',
          'Em alta': 'Em alta',
          'Em baixa': 'Em baixa'
        },
        en: {
          Favoritos: 'Favoritos',
          Criptoativos: 'Criptoativos',
          Novos: 'Novos',
          Todos: 'Todos',
          'Em alta': 'Em alta',
          'Em baixa': 'Em baixa'
        },
        es: {
          Favoritos: 'Favoritos',
          Criptoativos: 'Criptoativos',
          Novos: 'Novos',
          Todos: 'Todos',
          'Em alta': 'Em alta',
          'Em baixa': 'Em baixa'
        }
      }
    }
  },
  created () {
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
      let defaultCategories = [
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
          value: 'up-trend'
        },
        {
          label: 'Em baixa',
          value: 'low-trend'
        }
      ]

      if (this.authenticated) {
        defaultCategories = [
          {
            label: 'Favoritos',
            value: 'favorites'
          },
          ...defaultCategories
        ]
      }

      return defaultCategories
    }
  },
  watch: {
    search (value) {
      console.log('restating crypto scheduler')
      this.restartCryptoAssetsScheduler()
    }
  },
  methods: {
    cssIsCategoryActive (category) {
      return this.category === category ? 'active' : ''
    },
    cssIsViewModeActive (viewMode) {
      return this.isViewModeActive(viewMode) ? 'active' : ''
    },
    async getCryptoAssets () {
      try {
        const response = await fetch(`/cryptos?${this.getCryptoAssetsRequestQueryString()}`)

        if (response.ok) {
          const { response_data } = await response.json() //eslint-disable-line
          const { data, total_items } = response_data //eslint-disable-line
          this.cryptoAssets.result = data ?? [] //eslint-disable-line
          this.cryptoAssets.totalPages = total_items ?? 1 //eslint-disable-line
        } else {
          this.cryptoAssets.result = []
        }
      } catch (e) {
        this.cryptoAssets.result = []
      }

      this.$emit('list-updated', this.cryptoAssets.result ?? 0) //eslint-disable-line
    },
    getCryptoAssetsRequestQueryString () {
      // TODO: Implement later
      return 'sort=variation&order=DESC&limit=4'
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
    onCategoryChange (category) {
      this.category = category
    },
    onPageChange (page) {
      this.cryptoAssets.currentPage = page
    },
    onViewModeChange (viewMode) {
      this.viewMode = viewMode
    },
    restartCryptoAssetsScheduler () {
      this.stopGetCryptoAssetsInterval()
      this.getCryptoAssets()
      this.scheduleGetCryptoAssetsInterval()
    },
    scheduleGetCryptoAssetsInterval () {
      this.intervalId = setInterval(this.getCryptoAssets, this.intervalTimeout)
    },
    stopGetCryptoAssetsInterval () {
      this.intervalId = null
      clearInterval(this.intervalId)
    }
  }
})
