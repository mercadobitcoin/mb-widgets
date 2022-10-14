MBWD_MOST_VALUED_ASSETS = function () {
  return {
    template: `
            <div class="mbwd-most-valued-assets" v-if="cptdDisplaySelf">
                <p class="title">{{ i18n('Mais valorizados') }}</p>
                <p class="description">{{ i18n('Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.') }}</p>
                <p class="badge">{{ i18n('Nas últimas 24 horas') }}</p>
                <div class="assets">
                    <a class="asset" v-for="asset in mostValuedAssetsList">
                        <div class="attributes">
                            <img class="icon" :src="getIconUrl(asset.icon)" :title="asset.symbol" :alt="asset.symbol"/>
                            <p class="name">{{ asset.symbol }}</p>
                        </div>
                        <span class="variation">+{{ asset.variation }}%</span>
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
        default: 30000 //ms
      }
    },
    data() {
      return {
        intervalId: null,
        mostValuedAssetsList: [],
        translateMap:{
          pt: {
            "Mais valorizados": "Mais valorizados",
            "Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.": "Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.",
            "Nas últimas 24 horas": "Nas últimas 24 horas"
          },
          en: {
            "Mais valorizados": "Mais valorizados",
            "Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.": "Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.",
            "Nas últimas 24 horas": "Nas últimas 24 horas"
          },
          es: {
            "Mais valorizados": "Mais valorizados",
            "Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.": "Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.",
            "Nas últimas 24 horas": "Nas últimas 24 horas"
          }                                
        },
      };
    },
    created() {
      this.getMostValuedAssets()
      this.scheduleGetMostValuedAssetsInterval()
      document.addEventListener('visibilitychange', this.handleVisibilityChange, false)
    },
    destroy() {
      this.stopInterval()
    },
    computed: {
      cptdDisplaySelf() {
        return this.mostValuedAssetsList?.length > 0
      },
      cptdCdnStaticDomainUrl() {
        return 'https://static.mercadobitcoin.com.br/web'
      }
    },
    methods: {
      i18n(key) {
        return this.translateMap?.[this.language]?.[key] ?? '';
      },
      getIconUrl(path) {
        return this.cptdCdnStaticDomainUrl + path
      },
      async getMostValuedAssets() {
        try {
          throw 'Error'
          const response = await fetch('https://store.mercadobitcoin.com.br/api/v1/marketplace/crypto/coin?sort=variation&order=DESC&limit=4')
          
          if (response.ok) {
            const { response_data } = await response.json()
            this.mostValuedAssetsList = response_data?.data ?? []
          } else {
            this.mostValuedAssetsList = []
          }
        } catch (e) {
          this.mostValuedAssetsList = [{"id":"STVFT","symbol":"STVFT","name":"Sint-Truidense FT","status":null,"variation":30.22,"decimals":4,"quote_decimals":2,"actual_value":23.7,"volume_traded":533.70082613,"brl_estimated_volume_traded":12648.709579281,"icon":"/img/icons/assets/ico-asset-stvft-color.svg","release_date":"2013-01-01 00:00:00"},{"id":"RLY","symbol":"RLY","name":"Rally","status":null,"variation":26.18,"decimals":4,"quote_decimals":4,"actual_value":0.1287,"volume_traded":44302.59012839,"brl_estimated_volume_traded":5701.743349523794,"icon":"/img/icons/assets/ico-asset-rly-color.svg","release_date":"2013-01-01 00:00:00"},{"id":"DG","symbol":"DG","name":"Decentral Games","status":null,"variation":24.23,"decimals":4,"quote_decimals":8,"actual_value":0.31979,"volume_traded":98322.66760683,"brl_estimated_volume_traded":31442.605873988166,"icon":"/img/icons/assets/ico-asset-dg-color.svg","release_date":"2022-06-14 10:00:00"},{"id":"METIS","symbol":"METIS","name":"MetisDAO","status":null,"variation":18.58,"decimals":4,"quote_decimals":2,"actual_value":133.99,"volume_traded":202.18145047,"brl_estimated_volume_traded":27090.2925484753,"icon":"/img/icons/assets/ico-asset-metis-color.svg","release_date":"2013-01-01 00:00:00"}]
        }
      },
      scheduleGetMostValuedAssetsInterval() {
        this.intervalId = setInterval(this.getMostValuedAssets, this.intervalTimeout)
      },
      stopGetMostValuedAssetsInterval() {
        clearInterval(this.intervalId)
        this.intervalId = null
      },
      handleVisibilityChange() {
        if (document.visibilityState == "hidden") {
          this.stopGetMostValuedAssetsInterval()
        } else {
          this.scheduleGetMostValuedAssetsInterval()
        }
      }
    },
  }
}