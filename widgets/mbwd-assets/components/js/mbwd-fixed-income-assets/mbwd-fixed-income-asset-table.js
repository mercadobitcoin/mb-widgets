const MBWD_FIXED_INCOME_ASSET_TABLE = () => ({// eslint-disable-line
  template: `
            <div class="mbwd-fixed-income-asset-table">
              <table v-if="!mobileMode" class="fixed-income-asset-table-desktop">
                <thead>
                  <tr>
                    <th>
                      <div class="sorter-cell" @click="changeSortOrder('name')">
                        {{ i18n('Ativo') }}
                        <div class="sorters">
                          <div class="sort-asc arrow up" :class="cssSortActive('name', 'asc')" />
                          <div class="sort-desc arrow down" :class="cssSortActive('name', 'desc')" />
                        </div>  
                      </div>
                    </th>
                    <th>
                      <div class="sorter-cell"  @click="changeSortOrder('minimum_value')">
                        {{ i18n('Valor inicial') }}
                        <div class="sorters">
                          <div class="sort-asc arrow up" :class="cssSortActive('minimum_value', 'asc')" />
                          <div class="sort-desc arrow down" :class="cssSortActive('minimum_value', 'desc')" />
                        </div>  
                      </div>
                    </th>
                    <th>{{ i18n('Rentabilidade') }}</th>
                    <th>{{ i18n('Prazo') }}</th>
                    <th>
                      <div class="sorter-cell" @click="changeSortOrder('available_percentage')">
                        {{ i18n('Estoque') }}
                        <div class="sorters">
                          <div class="sort-asc arrow up" :class="cssSortActive('available_percentage', 'asc')"/>
                          <div class="sort-desc arrow down" :class="cssSortActive('available_percentage', 'desc')" />
                        </div>  
                      </div>
                    </th>
                    <th>{{ i18n('Mercado') }}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="asset in assets">
                    <td class="asset-cell">
                      <a class="asset" :href="getAssetLandingPageLink(asset.symbol)">
                        <img class="icon" :src="getIconUrl(asset.symbol)" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                        {{ asset.name }}
                      </a>
                    </td>
                    <td class="minimum-value">{{ asset.minimum_value }}</td>
                    <td class="profitability">
                      {{ asset.profitability }}
                    </td>
                    <td class="liquidation-date">{{ asset.estimated_liquidation_date }}</td>
                    <td class="available-percentage">{{ getPercentageString(asset.available_percentage.number) }}</td>
                    <td class="status">{{ i18n(asset.status) }}</td>
                    <td class="cta-wrapper apollo">
                      <a class="button primary outlined" :href="getAssetBasicTradeExperienceLink(asset.symbol)">
                        {{ i18n('Investir') }}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="mobileMode" class="fixed-income-asset-table-mobile">
                <a class="fixed-income-asset" v-for="asset in assets" :key="asset.symbol">
                  <div class="attributes">
                    <div class="header">
                      <img class="asset-icon" :src="getIconUrl(asset.symbol)" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                      <div class="asset-data">
                        <p class="name">{{ asset.name }}</p>
                        <p class="symbol">{{ asset.symbol }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="market-data">
                  <mbc-asset-badges :badges="getAssetBadgeAsArray(asset.status)" type="fixed-income" />
                    <p class="profitability">
                      {{ asset.profitability }}
                    </p>
                  </div>
                </a>
              </div>
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
  mixins: [configMixins, UIMixins, currencyFilters],// eslint-disable-line
  components: {
    'mbc-asset-badges': MBC_ASSET_BADGES() // eslint-disable-line
  },
  data () {
    return {
      sort: '',
      order: '',
      translateMap: {
        pt: {
          Ativo: 'Ativo',
          'Valor inicial': 'Valor inicial',
          Rentabilidade: 'Rentabilidade',
          Prazo: 'Prazo',
          Estoque: 'Estoque',
          Mercado: 'Mercado',
          Investir: 'Investir'
        },
        en: {
          Ativo: 'Ativo',
          'Valor inicial': 'Valor inicial',
          Rentabilidade: 'Rentabilidade',
          Prazo: 'Prazo',
          Estoque: 'Estoque',
          Mercado: 'Mercado',
          Investir: 'Investir'
        },
        es: {
          Ativo: 'Ativo',
          'Valor inicial': 'Valor inicial',
          Rentabilidade: 'Rentabilidade',
          Prazo: 'Prazo',
          Estoque: 'Estoque',
          Mercado: 'Mercado',
          Investir: 'Investir'
        }
      }
    }
  },
  methods: {
    cssSortActive (sort, order) {
      return this.sort === sort && this.order === order ? 'active' : ''
    },
    getAssetBadgeAsArray (status) {
      return [status]
    },
    getAssetBasicTradeExperienceLink (symbol) {
      return `https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(symbol ?? '').toLowerCase()}/brl`
    },
    getAssetLandingPageLink (symbol) {
      return `https://www.mercadobitcoin.com.br/conhecer/${(symbol ?? '').toLowerCase()}`
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
    getIconAlt (name) {
      return `ícone ${name}`
    },
    getIconUrl (symbol) {
      return `${this.GLOBAL_Cdn_Static_Path}/img/icons/assets/ico-asset-${(
        symbol ?? ''
      ).toLowerCase()}-color.svg`
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    },
    changeSortOrder (sort) {
      if (this.sort === sort) {
        switch (this.order) {
          case '':
            this.order = 'asc'
            break
          case 'asc':
            this.order = 'desc'
            break
          default:
            this.order = ''
        }
      } else {
        this.sort = sort
        this.order = 'asc'
      }

      this.$emit('sort', { order: this.order, sort: this.sort })
    }
  }
})
