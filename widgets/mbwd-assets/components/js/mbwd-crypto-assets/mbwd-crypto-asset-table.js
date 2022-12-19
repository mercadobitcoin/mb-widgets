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
          <template v-if="!displaySkeleton">
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
                <td class="price">{{ asset.market_price | ftFormatCurrency(asset.product_data.fiat_decimals || 4) }}</td>
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
            </template>
            <template v-else>
              <tbody class="mbwd-crypto-asset-table-skeleton-desktop">
                <mbwd-crypto-asset-table-skeleton-desktop v-for="index in qtdSkeletons" :key="'crypto-asset-asset-table-' + index" />
              </tbody>
            </template>
        </table>
        <div v-else class="crypto-asset-table-mobile">
          <template v-if="!displaySkeleton">
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
                <p class="price">{{ asset.market_price | ftFormatCurrency(asset.product_data.fiat_decimals || 4) }}</p>
                <p class="variation">
                  <span class="value" :class="asset.product_data.variation.status">{{ asset.product_data.variation.string }}</span>
                  <span class="label-24h">24h</span>
                </p>
              </div>
            </a>
          </template>
          <template v-else>
            <mbwd-crypto-asset-table-skeleton-mobile v-for="index in qtdSkeletons" :key="'crypto-asset-asset-table-' + index"/>
          </template>
        </template>
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
    },
    displaySkeleton: {
      type: Boolean,
      default: false
    }
  },
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.currencyFilters],// eslint-disable-line
  components: {
    'mbwd-crypto-asset-table-skeleton-desktop': MBWD_CRYPTO_ASSET_TABLE_SKELETON_DESKTOP(), // eslint-disable-line
    'mbwd-crypto-asset-table-skeleton-mobile': MBWD_CRYPTO_ASSET_TABLE_SKELETON_MOBILE() // eslint-disable-line
  },
  data () {
    return {
      sort: this.initialSort,
      order: this.initialOrder,
      qtdSkeletons: 5,
      translateMap: {
        pt: {
          'ativo': 'Ativo', // eslint-disable-line
          'ticker': 'Ticker', // eslint-disable-line
          'segmento': 'Segmento', // eslint-disable-line
          'preço': 'Preço', // eslint-disable-line
          'variação': 'Variação', // eslint-disable-line
          'capitalização de mercado': 'Capitalização de mercado',
          'comprar': 'Comprar', // eslint-disable-line
          'criptomoeda': 'Criptomoeda', // eslint-disable-line
          'utility token': 'Utility Token',
          'defi': 'Defi', // eslint-disable-line
          'fan token': 'Fan Token'
        },
        en: {
          'ativo': 'Asset', // eslint-disable-line
          'ticker': 'Ticker', // eslint-disable-line
          'segmento': 'Segment', // eslint-disable-line
          'preço': 'Price', // eslint-disable-line
          'variação': 'Variation', // eslint-disable-line
          'capitalização de mercado': 'Market cap',
          'comprar': 'Buy', // eslint-disable-line
          'criptomoeda': 'Cryptocurrency', // eslint-disable-line
          'utility token': 'Utility Token',
          'defi': 'Defi', // eslint-disable-line
          'fan token': 'Fan Token'
        },
        es: {
          'ativo': 'Activo', // eslint-disable-line
          'ticker': 'Ticker', // eslint-disable-line
          'segmento': 'Segmento', // eslint-disable-line
          'preço': 'Precio', // eslint-disable-line
          'variação': 'Variación', // eslint-disable-line
          'capitalização de mercado': 'Capitalización de Mercado',
          'comprar': 'Comprar', // eslint-disable-line
          'criptomoeda': 'Criptomoneda', // eslint-disable-line
          'utility token': 'Utility Token',
          'defi': 'Defi', // eslint-disable-line
          'fan token': 'Fan Token'
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
    i18n (key) {
      return this.translateMap?.[this.language]?.[key.toLowerCase()] ?? ''
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
        lb: `assets:table:sort:${sort}`
      })

      this.$emit('sort', { order: this.order, sort: this.sort })
    }
  }
})
