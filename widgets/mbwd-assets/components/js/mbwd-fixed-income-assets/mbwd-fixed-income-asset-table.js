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
              <a class="asset" @click="redirectToAssetLandingPage(asset.product_data.symbol)">
                <img class="icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                {{ asset.name }}
              </a>
            </td>
            <td class="minimum-value">{{ asset.product_data.minimum_value | ftFormatCurrency(2) }}</td>
            <td class="profitability">
              {{ asset.product_data.profitability }}
            </td>
            <td class="liquidation-date">{{ asset.product_data.estimated_liquidation_date }}</td>
            <td class="available-percentage">{{ getPercentageString(asset.product_data.available_percentage.number) }}</td>
            <td class="status">{{ i18n(asset.product_data.status.value) }}</td>
            <td class="cta-wrapper apollo">
              <a class="button primary outlined" @click="redirectToAssetTradeExperience(asset.product_data.symbol)">
                {{ i18n('Investir') }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="mobileMode" class="fixed-income-asset-table-mobile">
        <a class="fixed-income-asset" v-for="asset in assets" :key="asset.product_data.symbol">
          <div class="attributes">
            <div class="header">
              <img class="asset-icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
              <div class="asset-data">
                <p class="name">{{ asset.name }}</p>
                <p class="symbol">{{ asset.product_data.symbol }}</p>
              </div>
            </div>
          </div>
          <div class="market-data">
          <mbc-asset-badges :badges="getAssetBadgeAsArray(asset)" />
            <p class="profitability">
              {{ asset.product_data.profitability }}
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
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.currencyFilters],// eslint-disable-line
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
          Investir: 'Investir',
          novo: 'novo',
          'exclusivos mb': 'exclusivos mb',
          'pré-listagem': 'pré-listagem',
          'primary-market': 'Primário',
          'secondary-market': 'Secundário',
          'sold-out': 'esgotado',
          future: 'em breve',
          finished: 'finalizado'
        },
        en: {
          Ativo: 'Asset',
          'Valor inicial': 'Initial Value',
          Rentabilidade: 'Profitability',
          Prazo: 'Due Date',
          Estoque: 'Supply',
          Mercado: 'Market',
          Investir: 'Trade',
          novo: 'new',
          'exclusivos mb': 'mb exclusives',
          'pré-listagem': 'pre-listing',
          'primary-market': 'Primary',
          'secondary-market': 'Secondary',
          'sold-out': 'sold out',
          future: 'coming soon',
          finished: 'finished'
        },
        es: {
          Ativo: 'Activo',
          'Valor inicial': 'Valor inicial',
          Rentabilidade: 'Rentabilidad',
          Prazo: 'Plazo',
          Estoque: 'Existencias',
          Mercado: 'Mercado',
          Investir: 'Investir',
          novo: 'nueovo',
          'exclusivos mb': 'exclusivas mb',
          'pré-listagem': 'pre-listado',
          'primary-market': 'Principal',
          'secondary-market': 'Secundario',
          'sold-out': 'vendido',
          future: 'pronto',
          finished: 'acabado'
        }
      }
    }
  },
  methods: {
    cssSortActive (sort, order) {
      return this.sort === sort && this.order === order ? 'active' : ''
    },
    getAssetBadgeAsArray (asset) {
      return [...(asset.product_data.badges || []), { text: asset?.product_data?.status?.value ?? '', type: 'status' }]
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
    i18n (key) {
      if (key.indexOf('_') >= 0) {
        return this.translateMap?.[this.language]?.[key.toLowerCase().replace('_', '-')] ?? ''
      }
      return this.translateMap?.[this.language]?.[key] ?? ''
    },
    redirectToAssetTradeExperience (symbol) {
      this.$root.$emit('track', 'asset-table')
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `fixed-income:table:button:${symbol}`
      })
      location.href = this.getAssetBasicTradeExperienceLink(symbol)
    },
    redirectToAssetLandingPage (symbol) {
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `fixed-income:table:asset-name:${symbol}`
      })
      location.href = this.getAssetLandingPageLink(symbol)
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

      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `fixed-income:table:sort:${sort}`
      })

      this.$emit('sort', { order: this.order, sort: this.sort })
    }
  }
})
