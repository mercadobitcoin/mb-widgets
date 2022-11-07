// eslint-disable-next-line
const MBWD_FIXED_INCOME_ASSETS = () => ({
  template: `
    <div class="mbwd-fixed-income-assets">
      <h3 class="title">
        {{ i18n('Renda Fixa Digital') }}
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
          <button class="category" v-for="category in cptdAssetCategories" :key="category.value" :class="cssIsCategoryActive(category.value)" @click="changeCategory(category.value)">
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
      <mbc-empty-state v-if="fixedIncomeAssets.result.length === 0" :title="cptdEmptyStateConfig.title" :message="cptdEmptyStateConfig.message" :main-state-icon="cptdEmptyStateConfig.img" :cta="cptdEmptyStateConfig.cta" />
      <div v-if="fixedIncomeAssets.result.length > 0" class="result-list">
        <div v-if="isViewModeActive('cards')" class="view-mode-list card">
          <slot name="fixed-income-cards-list" :assets="fixedIncomeAssets.result">
            <mbwd-fixed-income-asset-card-list :assets="fixedIncomeAssets.result" :language="language" />
          </slot>
        </div>
        <div v-else class="view-mode-list table">
          <slot name="fixed-income-table" :assets="fixedIncomeAssets.result">
            <mbwd-fixed-income-asset-table ref="refFixedIncomeAssetTable" @sort="changeSortOrder" :assets="fixedIncomeAssets.result" :language="language" />
          </slot>
        </div>
      </div>
      <div class="pagination-wrapper">
        <mbc-pagination :total-pages="fixedIncomeAssets.totalPages" trackComponent="fixed-income" :current-page="fixedIncomeAssets.currentPage" @change="changePage"/>
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.URLMixins], // eslint-disable-line
  props: {
    authToken: {
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
  components: {
    'mbc-empty-state': MBC_EMPTY_STATE(),// eslint-disable-line
    "mbc-pagination": MBC_PAGINATION(), // eslint-disable-line
    "mbwd-fixed-income-asset-card-list": MBWD_FIXED_INCOME_ASSET_CARD_LIST(), // eslint-disable-line
    "mbwd-fixed-income-asset-table": MBWD_FIXED_INCOME_ASSET_TABLE(), // eslint-disable-line
  },
  data () {
    return {
      intervalId: undefined,
      busy: true,
      viewMode: 'table', // [card, table],
      shouldOverwriteFixedIncomeResult: false,
      fixedIncomeAssets: {
        limit: 5,
        category: 'all',
        sort: '',
        order: '',
        currentPage: 1,
        totalPages: 1,
        result: []
      },
      translateMap: {
        pt: {
          Favoritos: 'Favoritos',
          'Com saldo': 'Com saldo',
          'Renda Fixa Digital': 'Renda Fixa Digital',
          Novos: 'Novos',
          Todos: 'Todos',
          'Não encontramos nada em Renda Fixa Digital': 'Não encontramos nada em Renda Fixa Digital'
        },
        en: {
          Favoritos: 'Favorites',
          'Com saldo': 'With balance',
          'Renda Fixa Digital': 'Digital Fixed Income',
          Novos: 'New',
          Todos: 'All',
          'Não encontramos nada em Renda Fixa Digital': 'We didn\'t find anything in Digital Fixed Income'
        },
        es: {
          Favoritos: 'Favoritos',
          'Com saldo': 'Con saldo',
          'Renda Fixa Digital': 'Renta Fija Digital',
          Novos: 'Nuevos',
          Todos: 'Todos',
          'Não encontramos nada em Renda Fixa Digital': 'No encontramos nada en Renta Fija Digital'
        }
      }
    }
  },
  mounted () {
    this.getFixedIncomeAssets()
    this.scheduleGetFixedIncomeAssetsInterval()
    document.addEventListener(
      'visibilitychange',
      this.handleVisibilityChange,
      false
    )
  },
  destroy () {
    this.stopGetFixedIncomeAssetsInterval()
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
        }
      ]
    },
    cptdShowMore(){
      return this.mobileMode
    },
    cptdEmptyStateConfig () {
      return {
        title: this.i18n('Não encontramos nada em Renda Fixa Digital'),
        message: '',
        img: 'ilu-empty-search-result.svg'
      }
    },
    cptdIsNewCategory () {
      return this.fixedIncomeAssets.category === 'new'
    },
  },
  watch: {
    search () {
      this.resetFixedIncomeBasicQueryDefaultState()
      this.getFixedIncomeAssets()
    }
  },
  methods: {
    cssIsCategoryActive (category) {
      return this.fixedIncomeAssets.category === category ? 'active' : ''
    },
    cssIsViewModeActive (viewMode) {
      return this.isViewModeActive(viewMode) ? 'active' : ''
    },
    async getFixedIncomeAssets () {
      this.busy = true
      console.log(
        'SEARCHING FOR FIXED INCOMES: ',
        this.getFixedIncomeAssetsRequestQueryString()
      )
      try {
        // TODO: CHANGE TO API LATER
        const response = await fetch(`https://hotwheels-tp-together.dev.mercadolitecoin.com.br/api/v1/marketplace/product/unlogged${this.getFixedIncomeAssetsRequestQueryString()}`)
        // &limit=5&offset=0&sort=symbol&order=asc
        // const response = await fetch(`/fixed-incomes/${this.getFixedIncomeAssetsRequestQueryString()}`)

        if (response.ok) {
          const data = await response.json() //eslint-disable-line
          const { total_items, response_data } = data //eslint-disable-line
          const { products } = response_data

          if(this.cptdShowMore && !this.shouldOverwriteFixedIncomeResult){
            this.fixedIncomeAssets.result.push(...products ?? []) //eslint-disable-line
          } else {
            this.fixedIncomeAssets.result = products ?? [] //eslint-disable-line
            this.shouldOverwriteFixedIncomeResult = false
            this.setFixedIncomeAssetsLimit()
          }

    
          if (this.cptdIsNewCategory) {
            this.fixedIncomeAssets.totalPages = 1
          } else {
            if (total_items) {//eslint-disable-line
              this.fixedIncomeAssets.totalPages = Math.ceil(total_items / this.fixedIncomeAssets.limit)//eslint-disable-line
            } else {
              this.fixedIncomeAssets.totalPages = 1
            }
          }
        } else {
          this.fixedIncomeAssets.result = []
          this.fixedIncomeAssets.totalPages = 1
        }
      } catch (e) {
        this.fixedIncomeAssets.result = []
        this.fixedIncomeAssets.totalPages = 1
      }

      this.busy = false
      this.$emit('list-updated', this.fixedIncomeAssets.result.length)
    },
    getFixedIncomeAssetsRequestQueryString () {
      this.setFixedIncomeAssetsLimit()

      const { sort, category, order, currentPage, totalPages, limit } =
        this.fixedIncomeAssets
      const searchQueryStringsMap = {
        type: 'fixed_income',
        limit,
        sort,
        order
      }

      if (category === 'new') {
        searchQueryStringsMap.sort = 'release_date'
        searchQueryStringsMap.order = 'desc'
        return this.mxCreateUrlQueryString(searchQueryStringsMap)
      }

      if (totalPages > 1) {
        if(this.shouldOverwriteFixedIncomeResult && this.cptdShowMore) {
          searchQueryStringsMap.offset = 0
        } else {
          searchQueryStringsMap.offset = (currentPage - 1) * limit
        }
      }
        
      if (this.search) {
        searchQueryStringsMap.search = this.search
      }

      return this.mxCreateUrlQueryString(searchQueryStringsMap)
    },
    handleVisibilityChange () {
      if (document.visibilityState === 'hidden') {
        this.stopGetFixedIncomeAssetsInterval()
      } else {
        this.scheduleGetFixedIncomeAssetsInterval()
      }
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    },
    isViewModeActive (viewMode) {
      return this.viewMode === viewMode
    },
    changeCategory (category) {
      this.resetFixedIncomeBasicQueryDefaultState()
      this.fixedIncomeAssets.category = category
      this.getFixedIncomeAssets()
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `fixed-income:${category}`
      })
    },
    changePage (page) {
      this.fixedIncomeAssets.currentPage = page
      this.getFixedIncomeAssets()
    },
    changeSortOrder ({ sort, order }) {
      if (this.fixedIncomeAssets.sort !== sort) {
        this.fixedIncomeAssets.totalPages = 1
        this.fixedIncomeAssets.currentPage = 1
        this.fixedIncomeAssets.category = 'all'
      }

      this.fixedIncomeAssets.sort = sort
      this.fixedIncomeAssets.order = order
      this.getFixedIncomeAssets()
    },
    onViewModeChange (viewMode) {
      this.viewMode = viewMode
    },
    resetFixedIncomeBasicQueryDefaultState () {
      if (this.$refs?.refFixedIncomeAssetTable) {
        this.$refs.refFixedIncomeAssetTable.sort = ''
        this.$refs.refFixedIncomeAssetTable.order = ''
      }

      this.fixedIncomeAssets.sort = ''
      this.fixedIncomeAssets.order = ''
      this.fixedIncomeAssets.currentPage = 1
      this.fixedIncomeAssets.totalPages = 1
      this.fixedIncomeAssets.category = 'all'
      this.shouldOverwriteFixedIncomeResult = true
    },
    setFixedIncomeAssetsLimit () {
      if (this.cptdShowMore) {
        this.fixedIncomeAssets.limit = this.shouldOverwriteFixedIncomeResult ? this.fixedIncomeAssets.currentPage * 5 : 5
      } else {
        this.fixedIncomeAssets.limit = this.viewMode === 'cards' ? 3 : 5
      }
    },
    scheduleGetFixedIncomeAssetsInterval () {
      this.intervalId = setInterval(() => {
        this.shouldOverwriteFixedIncomeResult = true
        this.getFixedIncomeAssets() 
      }, this.intervalTimeout)

    },
    stopGetFixedIncomeAssetsInterval () {
      this.intervalId = null
      clearInterval(this.intervalId)
    }
  }
})
