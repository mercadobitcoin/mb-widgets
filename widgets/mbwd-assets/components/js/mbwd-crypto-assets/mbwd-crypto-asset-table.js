const MBWD_CRYPTO_ASSET_TABLE = () => ({ // eslint-disable-line
  template: `
    <div class="mbwd-crypto-asset-table">
      <table v-if="!mobileMode" class="crypto-asset-table-desktop">
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
              <div class="sorter-cell" @click="changeSortOrder('symbol')">
                {{ i18n('Ticker') }}
                <div class="sorters">
                  <div class="sort-asc arrow up" :class="cssSortActive('symbol', 'asc')" />
                  <div class="sort-desc arrow down" :class="cssSortActive('symbol', 'desc')" />
                </div>
              </div>
            </th>
            <th>
            <div class="sorter-cell" @click="changeSortOrder('sub_type')">
              {{ i18n('Segmento') }}
              <div class="sorters">
                <div class="sort-asc arrow up" :class="cssSortActive('sub_type', 'asc')" />
                <div class="sort-desc arrow down" :class="cssSortActive('sub_type', 'desc')" />
              </div>
            </div>
          </th>              
            <th>
              <div class="sorter-cell" @click="changeSortOrder('market_price')">
                {{ i18n('Preço') }}
                <div class="sorters">
                  <div class="sort-asc arrow up" :class="cssSortActive('market_price', 'asc')" />
                  <div class="sort-desc arrow down" :class="cssSortActive('market_price', 'desc')" />
                </div>
              </div>
            </th>
            <th>{{ i18n('Variação') }}</th>
            <th>
              <div class="sorter-cell" @click="changeSortOrder('market_cap')">
                {{ i18n('Capitalização de mercado') }}
                <div class="sorters">
                  <div class="sort-asc arrow up" :class="cssSortActive('market_cap', 'asc')" />
                  <div class="sort-desc arrow down" :class="cssSortActive('market_cap', 'desc')" />
                </div>
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asset in assets" :key="asset.product_data.symbol">
            <td class="asset-cell">
              <a class="asset" @click="redirectToAssetLandingPage(asset.product_data.symbol)">
                <img class="icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                {{ asset.name }}
              </a>
            </td>
            <td class="symbol">{{ asset.product_data.symbol }}</td>
            <td class="sub-type">{{ i18n(asset.product_data.sub_type.display_text) }}</td>
            <td class="price">{{ asset.market_price | ftFormatCurrency(2) }}</td>
            <td class="variation" :class="asset.product_data.variation.status">
              {{ asset.product_data.variation.string }}
            </td>
            <td class="market-cap">{{ asset.product_data.market_cap | ftFormatCurrency(2) }}</td>
            <td class="cta-wrapper apollo">
              <a class="button primary outlined" @click="redirectToAssetTradeExperience(asset.product_data.symbol)">
                {{ i18n('Comprar') }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="mobileMode" class="crypto-asset-table-mobile">
        <a class="crypto-asset" v-for="asset in assets" :key="asset.product_data.symbol" @click="redirectToAssetTradeExperience(asset.product_data.symbol)">
          <div class="attributes">
            <div class="header">
              <img class="asset-icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
              <div class="asset-data">
                <p class="name">{{ asset.name }}</p>
                <p class="sub-type">{{ i18n(asset.product_data.sub_type.display_text) }}</p>
              </div>
            </div>
          </div>
          <div class="market-data">
            <p class="price">{{ asset.market_price | ftFormatCurrency(2) }}</p>
            <p class="variation">
              <span class="value" :class="asset.product_data.variation.status">{{ asset.product_data.variation.string }}</span>
              <span class="label-24h">24h</span>
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
  data () {
    return {
      sort: '',
      order: '',
      translateMap: {
        pt: {
          'Ativo': 'Ativo', // eslint-disable-line
          'Ticker': 'Ticker', // eslint-disable-line
          'Segmento': 'Segmento', // eslint-disable-line
          'Preço': 'Preço', // eslint-disable-line
          'Variação': 'Variação', // eslint-disable-line
          'Capitalização de mercado': 'Capitalização de mercado',
          'Comprar': 'Comprar', // eslint-disable-line
          'Criptomoeda': 'Criptomoeda', // eslint-disable-line
          'Utility Token': 'Utility Token',
          'DeFi': 'DeFi', // eslint-disable-line
          'Fan Token': 'Fan Token'
        },
        en: {
          'Ativo': 'Asset', // eslint-disable-line
          'Ticker': 'Ticker', // eslint-disable-line
          'Segmento': 'Segment', // eslint-disable-line
          'Preço': 'Price', // eslint-disable-line
          'Variação': 'Variation', // eslint-disable-line
          'Capitalização de mercado': 'Market capitalization',
          'Comprar': 'Buy', // eslint-disable-line
          'Criptomoeda': 'Cryptocurrency', // eslint-disable-line
          'Utility Token': 'Utility Token',
          'DeFi': 'DeFi', // eslint-disable-line
          'Fan Token': 'Fan Token'
        },
        es: {
          'Ativo': 'Activo', // eslint-disable-line
          'Ticker': 'Ticker', // eslint-disable-line
          'Segmento': 'Segmento', // eslint-disable-line
          'Preço': 'Precio', // eslint-disable-line
          'Variação': 'Variación', // eslint-disable-line
          'Capitalização de mercado': 'Capitalización de Mercado',
          'Comprar': 'Comprar', // eslint-disable-line
          'Criptomoeda': 'Criptomoneda', // eslint-disable-line
          'Utility Token': 'Utility Token',
          'DeFi': 'DeFi', // eslint-disable-line
          'Fan Token': 'Fan Token'
        }
      }
    }
  },
  methods: {
    cssSortActive (sort, order) {
      return this.sort === sort && this.order === order ? 'active' : ''
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    },
    getAssetLandingPageLink (symbol) {
      return `https://www.mercadobitcoin.com.br/conhecer/${(symbol ?? '').toLowerCase()}`
    },
    getAssetBasicTradeExperienceLink (symbol) {
      return `https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(symbol ?? '').toLowerCase()}/brl`
    },
    getIconAlt (name) {
      return `ícone ${name}`
    },
    redirectToAssetTradeExperience (symbol) {
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:table:button:${symbol}`
      })
      location.href = this.getAssetBasicTradeExperienceLink(symbol) // eslint-disable-line
    },
    redirectToAssetLandingPage (symbol) {
      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:table:asset-name:${symbol}`
      })
      location.href = this.getAssetLandingPageLink(symbol) // eslint-disable-line
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
        lb: `assets:table:sort:${sort}`
      })

      this.$emit('sort', { order: this.order, sort: this.sort })
    }
  }
})
