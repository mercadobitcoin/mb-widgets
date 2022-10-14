const MBWD_CRYPTO_ASSET_CARD_LIST = () => ({
  template: `
              <div class="mbwd-crypto-asset-card-list">
                <a v-if="mobileMode" class="crypto-card mobile" v-for="asset in assets">
                  <div class="attributes">
                    <div class="header">
                      <img class="asset-icon" :src="asset.icon_url" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                      <div class="asset-data">
                        <p class="name">{{ asset.name }}</p>
                        <p class="type">{{ asset.sub_type }}</p>
                      </div>
                    </div>
                    <div class="badges">
                      <div class="badge">
                        <img class="icon" :src="asset.icon_url" /> exclusivos mb
                      </div>
                      <div class="badge">
                        <img class="icon" :src="asset.icon_url" /> novo
                      </div>
                    </div>
                  </div>
                  <div class="market-data">
                    <p class="variation">
                      <span class="value" :class="asset.variation.status">{{ asset.variation.string }}</span>
                      <span class="label-24h">24h</span>
                    </p>
                    <p class="price">{{ asset.current_price | ftFormatCurrency(2) }}</p>
                  </div>
                </a>
                <a v-if="!mobileMode" class="crypto-card desktop" v-for="asset in assets">
                  <div class="attributes">
                    <div class="header">
                      <img class="asset-icon" :src="asset.icon_url" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                      <div class="badges">
                        <div class="badge">
                          <img class="icon" :src="asset.icon_url" /> exclusivos mb
                        </div>
                        <div class="badge">
                          <img class="icon" :src="asset.icon_url" /> novo
                        </div>
                      </div>
                    </div>
                    <p class="name">
                      {{ asset.name }}
                      <span class="symbol">({{ asset.symbol }})</span>
                    </p>
                    <p class="type">{{ asset.sub_type }}</p>
                  </div>
                  <p class="price">{{ asset.current_price | ftFormatCurrency(2) }}</p>
                  <span class="variation">
                    <span class="value" :class="asset.variation.status">{{ asset.variation.string }}</span>
                      {{ i18n('nas últimas 24h') }}
                  </span>
                </a>
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
  mixins: [configMixins, UIMixins, currencyFilters],
  data() {
    return {
      translateMap: {
        pt: {
          "nas últimas 24h": "nas últimas 24h"
        },
        en: {
          "nas últimas 24h": "nas últimas 24h"
        },
        es: {
          "nas últimas 24h": "nas últimas 24h"
        }
      }
    };
  },
  methods: {
    i18n(key) {
      return this.translateMap?.[this.language]?.[key] ?? '';
    },
    getIconAlt(name) {
      return `ícone ${name}`;
    },
  },
})