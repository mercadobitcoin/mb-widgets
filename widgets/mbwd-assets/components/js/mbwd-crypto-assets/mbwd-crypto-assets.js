var MBWD_CRYPTO_ASSETS = () => ({
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
      default: 30000 //ms
    }
  },
  mixins: [configMixins, UIMixins],
  components: {
    'mbc-pagination': MBC_PAGINATION(),
    'mbwd-crypto-asset-card-list': MBWD_CRYPTO_ASSET_CARD_LIST(),
    'mbwd-crypto-asset-table': MBWD_CRYPTO_ASSET_TABLE()
  },
  data() {
    return {
      intervalId: undefined,
      cryptoAssets: {
        currentPage: 1,
        totalPages: 50,
        result: []
      },
      viewMode: 'table', // [card, table]
      category: 'new',
      sort: 'name',
      translateMap: {
        pt: {
          "Favoritos": "Favoritos",
          "Criptoativos": "Criptoativos",
          "Novos": "Novos",
          "Todos": "Todos",
          "Em alta": "Em alta",
          "Em baixa": "Em baixa"
        },
        en: {
          "Favoritos": "Favoritos",
          "Criptoativos": "Criptoativos",
          "Novos": "Novos",
          "Todos": "Todos",
          "Em alta": "Em alta",
          "Em baixa": "Em baixa"
        },
        es: {
          "Favoritos": "Favoritos",
          "Criptoativos": "Criptoativos",
          "Novos": "Novos",
          "Todos": "Todos",
          "Em alta": "Em alta",
          "Em baixa": "Em baixa"
        }
      },
    };
  },
  created() {
    this.getCryptoAssets()
    this.scheduleGetCryptoAssetsInterval()
    document.addEventListener('visibilitychange', this.handleVisibilityChange, false)
  },
  destroy() {
    this.stopGetCryptoAssetsInterval()
  },
  computed: {
    cptdAssetCategories() {
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
        },
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

      return defaultCategories;
    }
  },
  watch: {
    search(value) {
      console.log('restating crypto scheduler')
      this.restartCryptoAssetsScheduler()
    }
  },
  methods: {
    cssIsCategoryActive(category) {
      return this.category === category ? 'active' : '';
    },
    cssIsViewModeActive(viewMode) {
      return this.isViewModeActive(viewMode) ? 'active' : '';
    },
    async getCryptoAssets() {
      // try {
      // const response = await fetch(`https://store.mercadobitcoin.com.br/api/v1/marketplace/crypto/coin?${this.getCryptoAssetsRequestQueryString}`)

      // if (response.ok) {
      // const { response_data } = await response.json()
      // this.cryptoAssetsList.result = response_data?.data ?? []
      // } else {
      // this.cryptoAssetsList.result = []
      // }
      // } catch (e) {
      // this.cryptoAssetsList.result = []
      // }

      this.cryptoAssets.result = this.search ? [] : [
        {
          "product_id": "ANKR",
          "symbol": "ANKR",
          "name": "ANKR",
          "type": "crypto",
          "sub_type": "utility_token",
          "variation": {
            "string": "+0%",
            "number": 0.0,
            "status": "positive"
          },
          "current_price": "0.00",
          "market_price": "0.00",
          "market_cap": "R$ 0,00",
          "badges": [

          ],
          "icon_url": "https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-ankr-color.svg",
          "created_at": "2022-08-24T13:32:52-03:00",
          "release_date": "2022-08-24T13:32:54-03:00"
        },
        {
          "product_id": "AXS",
          "symbol": "AXS",
          "name": "Axie Infinity Shard",
          "type": "crypto",
          "sub_type": "utility_token",
          "variation": {
            "string": "+0%",
            "number": 0.0,
            "status": "positive"
          },
          "current_price": "0.00",
          "market_price": "0.00",
          "market_cap": "R$ 0,00",
          "badges": [

          ],
          "icon_url": "https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-axs-color.svg",
          "created_at": "2022-08-24T13:32:54-03:00",
          "release_date": "2022-08-24T13:32:54-03:00"
        },
        {
          "product_id": "BAND",
          "symbol": "BAND",
          "name": "Band Protocol",
          "type": "crypto",
          "sub_type": "utility_token",
          "variation": {
            "string": "+0%",
            "number": 0.0,
            "status": "positive"
          },
          "current_price": "0.00",
          "market_price": "0.00",
          "market_cap": "R$ 0,00",
          "badges": [

          ],
          "icon_url": "https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-band-color.svg",
          "created_at": "2022-08-24T13:32:55-03:00",
          "release_date": "2022-08-24T13:32:54-03:00"
        },
        {
          "product_id": "BAT",
          "symbol": "BAT",
          "name": "Basic Attention token",
          "type": "crypto",
          "sub_type": "utility_token",
          "variation": {
            "string": "+0%",
            "number": 0.0,
            "status": "positive"
          },
          "current_price": "0.00",
          "market_price": "0.00",
          "market_cap": "R$ 0,00",
          "badges": [

          ],
          "icon_url": "https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-bat-color.svg",
          "created_at": "2022-08-24T13:32:55-03:00",
          "release_date": "2022-08-24T13:32:54-03:00"
        },
        {
          "product_id": "BTC",
          "symbol": "BTC",
          "name": "Bitcoin",
          "type": "crypto",
          "sub_type": "coin",
          "variation": {
            "string": "+0%",
            "number": 0.0,
            "status": "positive"
          },
          "current_price": "0.00",
          "market_price": "0.00",
          "market_cap": "R$ 0,00",
          "badges": [

          ],
          "icon_url": "https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-btc-color.svg",
          "created_at": "2022-08-24T13:32:57-03:00",
          "release_date": "2022-08-24T13:32:54-03:00"
        }
      ]
      this.$emit('list-updated', this.cryptoAssets?.result?.length ?? 0);
    },
    getCryptoAssetsRequestQueryString() {
      // TODO: Implement later
      return 'sort=variation&order=DESC&limit=4'
    },
    handleVisibilityChange() {
      if (document.visibilityState == "hidden") {
        this.stopGetCryptoAssetsInterval();
      } else {
        this.scheduleGetCryptoAssetsInterval();
      }
    },
    i18n(key) {
      return this.translateMap?.[this.language]?.[key] ?? '';
    },
    isViewModeActive(viewMode) {
      return this.viewMode === viewMode;
    },
    onCategoryChange(category) {
      this.category = category;
    },
    onPageChange(page) {
      this.cryptoAssets.currentPage = page
    },
    onViewModeChange(viewMode) {
      this.viewMode = viewMode;
    },
    restartCryptoAssetsScheduler() {
      this.stopGetCryptoAssetsInterval()
      this.getCryptoAssets()
      this.scheduleGetCryptoAssetsInterval()
    },
    scheduleGetCryptoAssetsInterval() {
      this.intervalId = setInterval(this.getCryptoAssets, this.intervalTimeout);
    },
    stopGetCryptoAssetsInterval() {
      this.intervalId = null;
      clearInterval(this.intervalId);
    }
  },
})