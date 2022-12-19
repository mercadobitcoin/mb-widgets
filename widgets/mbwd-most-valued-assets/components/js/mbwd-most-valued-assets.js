const MBWD_MOST_VALUED_ASSETS = () => ({ //eslint-disable-line
  template: `
            <div v-if="cptdDisplaySelf" class="mbwd-most-valued-assets">
                <p class="title">{{ i18n('Mais valorizados') }}</p>
                <p class="description">{{ i18n('Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.') }}</p>
                <p class="badge">{{ i18n('Nas últimas 24 horas') }}</p>
                <div class="assets">
                    <a class="asset" v-for="asset in mostValuedAssetsList" :key="asset.symbol" :href="getAssetBasicTradeExperienceLink(asset.symbol)">
                        <div class="attributes">
                            <img class="icon" :src="getIconUrl(asset.icon)" :title="getIconAlt(asset.symbol)" :alt="getIconAlt(asset.symbol)"/>
                            <p class="name">{{ asset.symbol }}</p>
                        </div>
                        <span class="variation">+{{ asset.variation | ftFormatNumber(2) }}%</span>
                    </a>
                </div>
            </div>`,
  props: {
    language: {
      type: String,
      default: 'pt'
    },
    intervalTimeout: {
      type: Number,
      default: 30000 // ms
    }
  },
    mixins: [window.MB_WIDGETS.currencyFilters], //eslint-disable-line
  data () {
    return {
      intervalId: null,
      mostValuedAssetsList: [],
      translateMap: {
        pt: {
          'Mais valorizados': 'Mais valorizados',
          'Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.':
              'Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.',
          'Nas últimas 24 horas': 'Nas últimas 24 horas'
        },
        en: {
          'Mais valorizados': 'Mais valorizados',
          'Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.':
              'Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.',
          'Nas últimas 24 horas': 'Nas últimas 24 horas'
        },
        es: {
          'Mais valorizados': 'Mais valorizados',
          'Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.':
              'Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.',
          'Nas últimas 24 horas': 'Nas últimas 24 horas'
        }
      }
    }
  },
  created () {
    this.getMostValuedAssets()
    this.scheduleGetMostValuedAssetsInterval()
    document.addEventListener(
      'visibilitychange',
      this.handleVisibilityChange,
      false
    )
  },
  destroy () {
    this.stopInterval()
  },
  computed: {
    cptdDisplaySelf () {
      return this.mostValuedAssetsList?.length > 0
    },
    cptdCdnStaticDomainUrl () {
      return 'https://static.mercadolitecoin.com.br/web'
    }
  },
  methods: {
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    },
    getIconAlt (name) {
      return `ícone ${name}`
    },
    getIconUrl (path) {
      return this.cptdCdnStaticDomainUrl + path
    },
    getAssetBasicTradeExperienceLink (symbol) {
      return `https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(symbol ?? '').toLowerCase()}/brl`
    },
    async getMostValuedAssets () {
      try {
        // throw new Error('Error')
          const response = await fetch('https://store.mercadobitcoin.com.br/api/v1/marketplace/crypto/coin?sort=variation&order=DESC&limit=4') // eslint-disable-line

        if (response.ok) {
            const { response_data } = await response.json() // eslint-disable-line
            this.mostValuedAssetsList = response_data?.data ?? [] // eslint-disable-line
        } else {
          this.mostValuedAssetsList = []
        }
      } catch (e) {
        this.mostValuedAssetsList = []
      }
    },
    scheduleGetMostValuedAssetsInterval () {
      this.intervalId = setInterval(
        this.getMostValuedAssets,
        this.intervalTimeout
      )
    },
    stopGetMostValuedAssetsInterval () {
      clearInterval(this.intervalId)
      this.intervalId = null
    },
    handleVisibilityChange () {
      if (document.visibilityState === 'hidden') {
        this.stopGetMostValuedAssetsInterval()
      } else {
        this.scheduleGetMostValuedAssetsInterval()
      }
    }
  }
})
