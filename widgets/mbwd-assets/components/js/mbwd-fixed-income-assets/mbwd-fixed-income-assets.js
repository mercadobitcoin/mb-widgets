const MBWD_FIXED_INCOME_ASSETS = () => ({
  template: `
          <div class="mbwd-fixed-income-assets">
            <h3 class="title">
              {{ i18n('Renda Fixa Digital') }}
              <div v-if="mobileMode" class="view-modes">
                <button class="view-mode" :class="cssIsViewModeActive('card')" @click="onViewModeChange('card')">
                  <img v-if="isViewModeActive('card')" src="/img/icons/ico-four-squares-mono.svg">
                  <img v-else src="/img/icons/ico-four-squares-white.svg">
                </button>
                <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
                  <img v-if="isViewModeActive('table')" src="/img/icons/ico-three-rectangles-mono.svg">
                  <img v-else src="/img/icons/ico-three-rectangles-white.svg">
                </button>
              </div>
            </h3>
            <div class="options">
              <div class="categories">
                <button class="category" v-for="category in cptdAssetCategories" :class="cssIsCategoryActive(category.value)" @click="onCategoryChange(category.value)">
                  {{ i18n(category.label) }}
                </button>
              </div>
              <div v-if="!mobileMode" class="view-modes">
                <button class="view-mode" :class="cssIsViewModeActive('card')" @click="onViewModeChange('card')">
                  <img v-if="isViewModeActive('card')" src="/img/icons/ico-four-squares-mono.svg">
                  <img v-else src="/img/icons/ico-four-squares-white.svg">
                </button>
                <button class="view-mode" :class="cssIsViewModeActive('table')" @click="onViewModeChange('table')">
                  <img v-if="isViewModeActive('table')" src="/img/icons/ico-three-rectangles-mono.svg">
                  <img v-else src="/img/icons/ico-three-rectangles-white.svg">
                </button>
              </div>
            </div>
            <div v-if="!busy && fixedIncomeAssets.result.length > 0" class="result-list">
              <div v-if="isViewModeActive('card')" class="view-mode-list card">
                <slot name="fixed-income-cards-list" :assets="fixedIncomeAssets.result">
                  <mbwd-fixed-income-asset-card-list :assets="fixedIncomeAssets.result" />
                </slot>
              </div>
              <div v-else class="view-mode-list table">
                <mbwd-fixed-income-asset-table ref="refFixedIncomeAssetTable" @sort="onSortChange" :assets="fixedIncomeAssets.result" />
              </div>
            </div>
            <div v-if="!busy" class="pagination-wrapper">
              <mbc-pagination :total-pages="fixedIncomeAssets.totalPages" :current-page="fixedIncomeAssets.currentPage" @change="onPageChange"/>
            </div>
          </div>`,
  props: {
    authToken: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "pt",
    },
    search: {
      type: String,
      default: "",
    },
    intervalTimeout: {
      type: Number,
      default: 30000, //ms
    },
  },
  mixins: [configMixins, UIMixins, URLMixins],
  components: {
    "mbc-pagination": MBC_PAGINATION(),
    "mbwd-fixed-income-asset-card-list": MBWD_FIXED_INCOME_ASSET_CARD_LIST(),
    "mbwd-fixed-income-asset-table": MBWD_FIXED_INCOME_ASSET_TABLE(),
  },
  data() {
    return {
      intervalId: undefined,
      fixedIncomeAssets: {},
      busy: true,
      viewMode: "table", // [card, table],
      fixedIncomeAssets: {
        limit: 5,
        category: "all",
        sort: "",
        order: "",
        currentPage: 1,
        totalPages: 1,
        result: [],
      },
      translateMap: {
        pt: {
          Favoritos: "Favoritos",
          "Com saldo": "Com saldo",
          "Renda Fixa Digital": "Renda Fixa Digital",
          Novos: "Novos",
          Todos: "Todos",
        },
        en: {
          Favoritos: "Favoritos",
          "Com saldo": "Com saldo",
          "Renda Fixa Digital": "Renda Fixa Digital",
          Novos: "Novos",
          Todos: "Todos",
        },
        es: {
          Favoritos: "Favoritos",
          "Com saldo": "Com saldo",
          "Renda Fixa Digital": "Renda Fixa Digital",
          Novos: "Novos",
          Todos: "Todos",
        },
      },
    };
  },
  mounted() {
    this.getFixedIncomeAssets();
    this.scheduleGetFixedIncomeAssetsInterval();
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
      false
    );
  },
  destroy() {
    this.stopGetFixedIncomeAssetsInterval();
  },
  computed: {
    cptdAssetCategories() {
      let defaultCategories = [
        {
          label: "Novos",
          value: "new",
        },
        {
          label: "Todos",
          value: "all",
        },
      ];

      if (this.authToken) {
        defaultCategories = [
          {
            label: "Favoritos",
            value: "favorites",
          },
          {
            label: "Com saldo",
            value: "has-balance",
          },
          ...defaultCategories,
        ];
      }

      return defaultCategories;
    },
  },
  watch: {
    search() {
      this.resetFixedIncomeBasicQueryDefaultState();
      this.getFixedIncomeAssets();
    },
  },
  methods: {
    cssIsCategoryActive(category) {
      return this.fixedIncomeAssets.category === category ? "active" : "";
    },
    cssIsViewModeActive(viewMode) {
      return this.isViewModeActive(viewMode) ? "active" : "";
    },
    getIconUrl(path) {
      return `${this.GLOBAL_Cdn_Static_Path}/${path}`;
    },
    async getFixedIncomeAssets() {
      this.busy = true;
      this.getFixedIncomeAssetsRequestQueryString();
      // try {
      // const response = await fetch(`https://store.mercadobitcoin.com.br/api/v1/marketplace/crypto/coin?${this.getFixedIncomeAssetsRequestQueryString}`)

      // if (response.ok) {
      // const { response_data } = await response.json()
      // this.fixedIncomeAssets.result = response_data?.data ?? []
      // } else {
      // this.fixedIncomeAssets.result = []
      // }
      // } catch (e) {
      // this.fixedIncomeAssets.result = []
      // }

      this.fixedIncomeAssets.result = [
        {
          asset_id: "704812c83d9b4b13b76bd38bd87ad33r",
          product_id: "3",
          legacy_id: "AAVE",
          name: "Aave",
          symbol: "AAVE",
          minimum_value: "R$ 1,00",
          profitability: "IGPM + TR + 7% a.a.",
          estimated_liquidation_date: "Jan/2024",
          sold_percentage: "0%",
          available_percentage: "100%",
          status: "PRIMARY_MARKET",
          family_name: "Consórcios",
        },
        {
          asset_id: "634812c83d9b4b13b76bd38bd87ad20e",
          product_id: "2",
          legacy_id: "SUSHI",
          name: "SushiSwap",
          symbol: "SUSHI",
          minimum_value: "R$ 50,00",
          profitability: "IGPM + TR + 5% a.a.",
          estimated_liquidation_date: "Jan/2024",
          sold_percentage: "1000000%",
          available_percentage: "-999900%",
          status: "SECONDARY_MARKET",
          family_name: "Consórcios",
        },
        {
          asset_id: "d200df4a856b44348cc94f67488f958b",
          product_id: "1",
          legacy_id: "DAXPTO",
          name: "XRP",
          symbol: "AAA",
          minimum_value: "R$ 150,00",
          profitability: "IPCA + 15% a.a.",
          estimated_liquidation_date: "Mai/2023",
          sold_percentage: "5.59%",
          available_percentage: "94.41%",
          status: "PRIMARY_MARKET",
          family_name: "Precatórios",
        },
      ];
      this.$emit("list-updated", this.fixedIncomeAssets.result.length);
      this.busy = false;
    },
    getFixedIncomeAssetsRequestQueryString() {
      const { sort, category, order, currentPage, totalPages, limit } =
        this.fixedIncomeAssets;
      const searchQueryStringsMap = {
        limit,
        sort,
        order,
      };

      if (totalPages > 1) {
        searchQueryStringsMap.offset = (currentPage - 1) * limit;
      }

      if (this.search) {
        searchQueryStringsMap.query = this.search;
      }

      // if (category === 'new') {
      //   searchQueryStringsMap
      // }

      // if (category === 'all') {

      // }

      console.log(
        "SEARCHING FOR:",
        this.mxCreateUrlQueryString(searchQueryStringsMap)
      );

      return this.mxCreateUrlQueryString(searchQueryStringsMap);
    },
    handleVisibilityChange() {
      if (document.visibilityState == "hidden") {
        this.stopGetFixedIncomeAssetsInterval();
      } else {
        this.scheduleGetFixedIncomeAssetsInterval();
      }
    },
    i18n(key) {
      return this.translateMap?.[this.language]?.[key] ?? "";
    },
    isViewModeActive(viewMode) {
      return this.viewMode === viewMode;
    },
    onCategoryChange(category) {
      this.resetFixedIncomeBasicQueryDefaultState();
      this.fixedIncomeAssets.category = category;
      this.getFixedIncomeAssets();
    },
    onPageChange(page) {
      this.fixedIncomeAssets.currentPage = page;
      this.getFixedIncomeAssets();
    },
    onSortChange({ sort, order }) {
      this.fixedIncomeAssets.sort = sort;
      this.fixedIncomeAssets.order = order;
      this.getFixedIncomeAssets();
    },
    onViewModeChange(viewMode) {
      this.viewMode = viewMode;
      this.fixedIncomeAssets.limit = viewMode === "card" ? 4 : 5;
    },
    resetFixedIncomeBasicQueryDefaultState() {
      if (this.$refs?.refFixedIncomeAssetTable) {
        this.$refs.refFixedIncomeAssetTable.sort = "";
        this.$refs.refFixedIncomeAssetTable.order = "";
      }

      this.fixedIncomeAssets.sort = "";
      this.fixedIncomeAssets.order = "";
      this.currentPage = 1;
      this.totalPages = 1;
      this.category = "all";
    },
    scheduleGetFixedIncomeAssetsInterval() {
      this.intervalId = setInterval(
        this.getFixedIncomeAssets,
        this.intervalTimeout
      );
    },
    stopGetFixedIncomeAssetsInterval() {
      this.intervalId = null;
      clearInterval(this.intervalId);
    },
  },
});
