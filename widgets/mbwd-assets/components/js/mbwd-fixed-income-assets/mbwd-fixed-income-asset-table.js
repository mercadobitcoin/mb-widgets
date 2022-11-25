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
            <td class="status">{{ i18n(asset.product_data.status.short_text)}} </td>
            <td class="cta-wrapper apollo">
              <a class="button primary" :class="getButtonClass(asset.product_data.status.value)" @click="redirectToAssetTradeExperience(asset.product_data.symbol)">
                {{ i18n('Investir') }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="mobileMode" class="fixed-income-asset-table-mobile">
        <a class="fixed-income-asset" v-for="asset in assets" :key="asset.product_data.symbol" @click="redirectToAssetTradeExperience(asset.product_data.symbol)">
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
          <mbc-asset-badges :badges="getAssetBadgeAsArray(asset)" widgetName="mbwd-assets"/>
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
    },
    initialSort: {
      type: String,
      default: 'name'
    },
    initialOrder: {
      type: String,
      default: 'asc'
    }
  },
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.currencyFilters],// eslint-disable-line
  components: {
    'mbc-asset-badges': MBC_ASSET_BADGES() // eslint-disable-line
  },
  data () {
    return {
      sort: this.initialSort,
      order: this.initialOrder,
      translateMap: {
        pt: {
          'ativo': 'Ativo', // eslint-disable-line
          'valor inicial': 'Valor inicial',
          'rentabilidade': 'Rentabilidade', // eslint-disable-line
          'prazo': 'Prazo', // eslint-disable-line
          'estoque': 'Estoque', // eslint-disable-line
          'mercado': 'Mercado', // eslint-disable-line
          'investir': 'Investir', // eslint-disable-line
          'novo': 'novo', // eslint-disable-line
          'exclusivos mb': 'exclusivos mb',
          'pré-listagem': 'pré-listagem',
          'primário': 'Primário', // eslint-disable-line
          'secundário': 'Secundário', // eslint-disable-line
          'esgotado': 'Esgotado', // eslint-disable-line
          'em breve': 'Em breve', // eslint-disable-line
          'finalizado': 'Finalizado', // eslint-disable-line
          'disponível': 'disponível' // eslint-disable-line
        },
        en: {
          'ativo': 'Asset', // eslint-disable-line
          'valor inicial': 'Initial Value',
          'rentabilidade': 'Profitability', // eslint-disable-line
          'prazo': 'Due Date', // eslint-disable-line
          'estoque': 'Supply', // eslint-disable-line
          'mercado': 'Market', // eslint-disable-line
          'investir': 'Trade', // eslint-disable-line
          'novo': 'new', // eslint-disable-line
          'exclusivos mb': 'mb exclusives',
          'pré-listagem': 'pre-listing',
          'primário': 'Primary', // eslint-disable-line
          'secundário': 'Secondary', // eslint-disable-line
          'esgotado': 'Sold out', // eslint-disable-line
          'em breve': 'Coming soon', // eslint-disable-line
          'finalizado': 'Finished', // eslint-disable-line
          'disponível': 'available' // eslint-disable-line
        },
        es: {
          'ativo': 'Activo', // eslint-disable-line
          'valor inicial': 'Valor inicial', // eslint-disable-line
          'rentabilidade': 'Rentabilidad', // eslint-disable-line
          'prazo': 'Plazo', // eslint-disable-line
          'estoque': 'Existencias', // eslint-disable-line
          'mercado': 'Mercado', // eslint-disable-line
          'investir': 'Invertir', // eslint-disable-line
          'novo': 'nueovo', // eslint-disable-line
          'exclusivos mb': 'exclusivas mb',
          'pré-listagem': 'pre-listado',
          'primário': 'Principal', // eslint-disable-line
          'secundário': 'Secundario', // eslint-disable-line
          'esgotado': 'Vendido', // eslint-disable-line
          'em breve': 'Pronto', // eslint-disable-line
          'finalizado': 'Acabado', // eslint-disable-line
          'disponível': 'disponible' // eslint-disable-line
        }
      }
    }
  },
  watch: {
    initialOrder (value) {
      this.order = value
    },
    initialSort (value) {
      this.sort = value
    }
  },
  methods: {
    cssSortActive (sort, order) {
      return this.sort === sort && this.order === order ? 'active' : ''
    },
    getAssetBadgeAsArray (asset) {
      return [...(asset.product_data?.tags || []), { text: asset?.product_data?.status?.value ?? '', type: 'status', color: asset?.product_data?.status?.color }]
    },
    getAssetBasicTradeExperienceLink (symbol) {
      return `https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(symbol ?? '').toLowerCase()}/brl`
    },
    getAssetLandingPageLink (symbol) {
      return `https://www.mercadobitcoin.com.br/conhecer/${(symbol ?? '').toLowerCase()}`
    },
    getPercentageString (percentage = 0) {
      let percString = percentage

      if (percString === '-') {
        return '-'
      }

      if (percString > 100) {
        percString = 100
      }

      if (percString < 0) {
        percString = 0
      }

      return `${Math.trunc(percString)}% ${this.i18n('disponível')}`
    },
    getIconAlt (name) {
      return `ícone ${name}`
    },
    getButtonClass (assetStatus) {
      const assetsStatusToDisableButton = ['SOLD_OUT', 'FINISHED', 'FUTURE']
      if (assetsStatusToDisableButton.indexOf(assetStatus) !== -1) {
        return 'disabled'
      }
      return 'outlined'
    },
    i18n (key) {
      if (key.indexOf('_') >= 0) {
        return this.translateMap?.[this.language]?.[key.toLowerCase().replace('_', '-')] ?? ''
      }
      return this.translateMap?.[this.language]?.[key.toLowerCase()] ?? ''
    },
    redirectToAssetTradeExperience (symbol) {
      this.$root.$emit('track', 'asset-table')
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `fixed-income:table:button:${symbol}`
      })
      location.href = this.getAssetBasicTradeExperienceLink(symbol) // eslint-disable-line
    },
    redirectToAssetLandingPage (symbol) {
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `fixed-income:table:asset-name:${symbol}`
      })
      location.href = this.getAssetLandingPageLink(symbol) // eslint-disable-line
    },
    changeSortOrder (sort) {
      if (this.sort === sort) {
        switch (this.order) {
          case 'desc':
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
