// eslint-disable-next-line
const MBWD_FIXED_INCOME_ASSETS = () => ({
  template: `
    <div class="mbwd-fixed-income-assets">
      <h3 class="title">
        {{ i18n('Renda Fixa Digital') }}
        <div v-if="mobileMode" class="view-modes">
          <button class="view-mode" :class="cssIsViewModeActive('card')" @click="onViewModeChange('card')">
            <img v-if="isViewModeActive('card')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-four-squares-mono.svg'">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-four-squares-white.svg'">
          </button>
          <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
            <img v-if="isViewModeActive('table')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-three-rectangles-mono.svg'">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-three-rectangles-white.svg'">
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
          <button class="view-mode" :class="cssIsViewModeActive('card')" @click="onViewModeChange('card')">
            <img v-if="isViewModeActive('card')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-four-squares-mono.svg'">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-four-squares-white.svg'">
          </button>
          <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
            <img v-if="isViewModeActive('table')" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-three-rectangles-mono.svg'">
            <img v-else :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-three-rectangles-white.svg'">
          </button>
        </div>
      </div>
      <mbc-empty-state v-if="fixedIncomeAssets.result.length === 0" :title="cptdEmptyStateConfig.title" :message="cptdEmptyStateConfig.message" :main-state-icon="cptdEmptyStateConfig.img" :cta="cptdEmptyStateConfig.cta" />
      <div v-if="fixedIncomeAssets.result.length > 0" class="result-list">
        <div v-if="isViewModeActive('card')" class="view-mode-list card">
          <slot name="fixed-income-cards-list" :assets="fixedIncomeAssets.result">
            <mbwd-fixed-income-asset-card-list :assets="fixedIncomeAssets.result" />
          </slot>
        </div>
        <div v-else class="view-mode-list table">
          <slot name="fixed-income-table" :assets="fixedIncomeAssets.result">
            <mbwd-fixed-income-asset-table ref="refFixedIncomeAssetTable" @sort="changeSortOrder" :assets="fixedIncomeAssets.result" />
          </slot>
        </div>
      </div>
      <div class="pagination-wrapper">
        <mbc-pagination :total-pages="fixedIncomeAssets.totalPages" gaComponent="fixed-income" :current-page="fixedIncomeAssets.currentPage" @change="changePage"/>
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.URLMixins, window.MB_WIDGETS.trackEvent], // eslint-disable-line
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
          Favoritos: 'Favoritos',
          'Com saldo': 'Com saldo',
          'Renda Fixa Digital': 'Renda Fixa Digital',
          Novos: 'Novos',
          Todos: 'Todos',
          'Não encontramos nada em Renda Fixa Digital': 'Não encontramos nada em Renda Fixa Digital'
        },
        es: {
          Favoritos: 'Favoritos',
          'Com saldo': 'Com saldo',
          'Renda Fixa Digital': 'Renda Fixa Digital',
          Novos: 'Novos',
          Todos: 'Todos',
          'Não encontramos nada em Renda Fixa Digital': 'Não encontramos nada em Renda Fixa Digital'
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
    cptdEmptyStateConfig () {
      return {
        title: this.i18n('Não encontramos nada em Renda Fixa Digital'),
        message: '',
        img: 'ilu-empty-search-result.svg'
      }
    },
    cptdIsNewCategory () {
      return this.fixedIncomeAssets.category === 'new'
    }
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
        const response = await fetch(`https://mb-product-gutter-tp-together.dev.mercadolitecoin.com.br/assets/${this.getFixedIncomeAssetsRequestQueryString()}`)
        // const response = await fetch(`/fixed-incomes/${this.getFixedIncomeAssetsRequestQueryString()}`)

        if (response.ok) {
          const { response_data } = await response.json() //eslint-disable-line
          const { data, total_items } = response_data //eslint-disable-line
          this.fixedIncomeAssets.result = data ?? [] //eslint-disable-line
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
        searchQueryStringsMap.offset = (currentPage - 1) * limit
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
      this.ga({
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
      this.getFixedIncomeAssets()
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
    },
    setFixedIncomeAssetsLimit () {
      if (this.mobileMode) {
        this.fixedIncomeAssets.limit = this.viewMode === 'card' ? 4 : 5
      } else {
        this.fixedIncomeAssets.limit = this.viewMode === 'card' ? 3 : 5
      }
    },
    scheduleGetFixedIncomeAssetsInterval () {
      this.intervalId = setInterval(
        this.getFixedIncomeAssets,
        this.intervalTimeout
      )
    },
    stopGetFixedIncomeAssetsInterval () {
      this.intervalId = null
      clearInterval(this.intervalId)
    }
  }
})
