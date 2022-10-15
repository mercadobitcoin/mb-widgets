const MBWD_FIXED_INCOME_ASSET_TABLE = () => ({// eslint-disable-line
  template: `
            <div class="mbwd-fixed-income-asset-table">
              <table v-if="!mobileMode" class="fixed-income-asset-table-desktop">
                <thead>
                  <tr>
                    <th>
                      <div class="sorter-cell" @click="onSortChange('name')">
                        {{ i18n('Ativo') }}
                        <div v-if="displaySorters" class="sorters">
                          <div class="sort-asc arrow up" :class="cssSortActive('name', 'asc')" />
                          <div class="sort-desc arrow down" :class="cssSortActive('name', 'desc')" />
                        </div>  
                      </div>
                    </th>
                    <th>
                      <div class="sorter-cell"  @click="onSortChange('minimum_value')">
                        {{ i18n('Valor inicial') }}
                        <div v-if="displaySorters" class="sorters">
                          <div class="sort-asc arrow up" :class="cssSortActive('minimum_value', 'asc')" />
                          <div class="sort-desc arrow down" :class="cssSortActive('minimum_value', 'desc')" />
                        </div>  
                      </div>
                    </th>
                    <th>{{ i18n('Rentabilidade') }}</th>
                    <th>{{ i18n('Prazo') }}</th>
                    <th>
                      <div class="sorter-cell" @click="onSortChange('available_percentage')">
                        {{ i18n('Estoque') }}
                        <div v-if="displaySorters" class="sorters">
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
                      {{ asset.profitability }}%
                    </td>
                    <td class="liquidation-date">{{ asset.estimated_liquidation_date }}</td>
                    <td class="available-percentage">{{ getPercentageString(asset.available_percentage) }}</td>
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
                <a class="fixed-income-asset" v-for="asset in assets">
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
                    <div class="badge-wrapper">
                      <div class="badge">
                        <span class="rounded-status primary" /> {{ i18n('asset.status') }} mercadinhoww
                      </div>
                    </div>
                    <p class="profitability">
                      {{ asset.profitability }}%
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
    },
    displaySorters: {
      type: Boolean,
      default: true
    }
  },
  mixins: [configMixins, UIMixins],// eslint-disable-line
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
          Investir: 'Investir',
          PRIMARY_MARKET: 'Primário',
          SECONDARY_MARKET: 'Secundário',
          SOLD_OUT: 'esgotado'
        },
        en: {
          Ativo: 'Ativo',
          'Valor inicial': 'Valor inicial',
          Rentabilidade: 'Rentabilidade',
          Prazo: 'Prazo',
          Estoque: 'Estoque',
          Mercado: 'Mercado',
          Investir: 'Investir',
          PRIMARY_MARKET: 'Primário',
          SECONDARY_MARKET: 'Secundário',
          SOLD_OUT: 'esgotado'
        },
        es: {
          Ativo: 'Ativo',
          'Valor inicial': 'Valor inicial',
          Rentabilidade: 'Rentabilidade',
          Prazo: 'Prazo',
          Estoque: 'Estoque',
          Mercado: 'Mercado',
          Investir: 'Investir',
          PRIMARY_MARKET: 'Primário',
          SECONDARY_MARKET: 'Secundário',
          SOLD_OUT: 'esgotado'
        }
      }
    }
  },
  methods: {
    cssSortActive (sort, order) {
      return this.sort === sort && this.order === order ? 'active' : ''
    },
    parsePercentageStrToNumber (percentage = '0') {
      return Number(percentage.replace(/[^\d.-]/g, ''))
    },
    getAssetBasicTradeExperienceLink (symbol) {
      return `https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(symbol ?? '').toLowerCase()}/brl`
    },
    getAssetLandingPageLink (symbol) {
      return `https://www.mercadobitcoin.com.br/conhecer/${(symbol ?? '').toLowerCase()}`
    },
    getPercentageString (percentage = 0) {
      let percString = this.parsePercentageStrToNumber(percentage)
      percString = percString > 100 ? 100 : percString
      percString = percString < 0 ? 0 : percString
      return `${percString}%`
    },
    getSoldPercentageStyle (percentage = '0') {
      const progress = this.getPercentageString(percentage)
      return {
        background: `conic-gradient(#4D5EFF ${progress},#F3F4F4 ${progress})`
      }
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
    onSortChange (sort) {
      if (this.displaySorters) {
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
  }
})
