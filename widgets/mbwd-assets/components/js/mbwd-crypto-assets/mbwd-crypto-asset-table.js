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
          <tr v-for="asset in assets" :key="asset.symbol">
            <td class="asset-cell">
              <a class="asset" @click="redirectToAssetLandingPage(asset.symbol)">
                <img class="icon" :src="asset.icon_url.svg" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                {{ asset.name }}
              </a>
            </td>
            <td class="symbol">{{ asset.symbol }}</td>
            <td class="sub-type">{{ i18n(asset.sub_type) }}</td>
            <td class="price">{{ asset.market_price | ftFormatCurrency(2) }}</td>
            <td class="variation" :class="asset.variation.status">
              {{ asset.variation.string }}
            </td>
            <td class="market-cap">{{ asset.market_cap | ftFormatCurrency(2) }}</td>
            <td class="cta-wrapper apollo">
              <a class="button primary outlined" @click="redirectToAssetTradeExperience(asset.symbol)">
                {{ i18n('Comprar') }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="mobileMode" class="crypto-asset-table-mobile">
        <a class="crypto-asset" v-for="asset in assets" :key="asset.symbol" :href="getAssetBasicTradeExperienceLink(asset.symbol)">
          <div class="attributes">
            <div class="header">
              <img class="asset-icon" :src="getIconUrl(asset.symbol)" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
              <div class="asset-data">
                <p class="name">{{ asset.name }}</p>
                <p class="sub-type">{{ i18n(asset.sub_type) }}</p>
              </div>
            </div>
          </div>
          <div class="market-data">
            <p class="price">{{ asset.market_price | ftFormatCurrency(2) }}</p>
            <p class="variation">
              <span class="value" :class="asset.variation.status">{{ asset.variation.string }}</span>
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
  mixins: [window.MB_WIDGETS.configMixins, window.MB_WIDGETS.UIMixins, window.MB_WIDGETS.currencyFilters, window.MB_WIDGETS.trackEvent],// eslint-disable-line
  data () {
    return {
      sort: '',
      order: '',
      translateMap: {
        pt: {
          Ativo: 'Ativo',
          Ticker: 'Ticker',
          Segmento: 'Segmento',
          Preço: 'Preço',
          Variação: 'Variação',
          'Capitalização de mercado': 'Capitalização de mercado',
          Comprar: 'Comprar',
          utility_token: 'Utility token',
          coin: 'Criptomoeda'
        },
        en: {
          Ativo: 'Ativo',
          Ticker: 'Ticker',
          Segmento: 'Segmento',
          Preço: 'Preço',
          Variação: 'Variação',
          'Capitalização de mercado': 'Capitalização de mercado',
          Comprar: 'Comprar',
          utility_token: 'Utility token',
          coin: 'Criptomoeda'
        },
        es: {
          Ativo: 'Ativo',
          Ticker: 'Ticker',
          Segmento: 'Segmento',
          Preço: 'Preço',
          Variação: 'Variação',
          'Capitalização de mercado': 'Capitalização de mercado',
          Comprar: 'Comprar',
          utility_token: 'Utility token',
          coin: 'Criptomoeda'
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
    redirectToAssetTradeExperience(symbol) {
      this.ga({
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:table:button:${symbol}`
      })
      location.href = this.getAssetBasicTradeExperienceLink(symbol)
    },
    redirectToAssetLandingPage(symbol) {
      this.ga({
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:table:asset-name:${symbol}`
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

      this.ga({
        ec: 'web:site:home',
        en: 'click',
        lb: `assets:table:sort:${sort}`
      })

      this.$emit('sort', { order: this.order, sort: this.sort })
    }
  }
})
