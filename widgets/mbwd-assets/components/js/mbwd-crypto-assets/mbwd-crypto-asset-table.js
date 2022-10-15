const MBWD_CRYPTO_ASSET_TABLE = () => ({
  template: `
            <div class="mbwd-crypto-asset-table">
              <table v-if="!mobileMode" class="crypto-asset-table-desktop">
                <thead>
                  <tr>
                    <th>
                      <div class="sorter-cell" @click="onSortChange('name')">
                        {{ i18n('Ativo') }}
                        <div class="sorters">
                          <div class="sort-asc arrow up" />
                          <div class="sort-desc arrow down" />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div class="sorter-cell">
                        {{ i18n('Ticker') }}
                        <div class="sorters">
                          <div class="sort-asc arrow up" />
                          <div class="sort-desc arrow down" />
                        </div>
                      </div>
                    </th>
                    <th>
                    <div class="sorter-cell">
                      {{ i18n('Segmento') }}
                      <div class="sorters">
                        <div class="sort-asc arrow up" />
                        <div class="sort-desc arrow down" />
                      </div>
                    </div>
                  </th>              
                    <th>
                      <div class="sorter-cell">
                        {{ i18n('Preço') }}
                        <div class="sorters">
                          <div class="sort-asc arrow up" />
                          <div class="sort-desc arrow down" />
                        </div>
                      </div>
                    </th>
                    <th>{{ i18n('Variação') }}</th>
                    <th>
                      <div class="sorter-cell">
                        {{ i18n('Capitalização de mercado') }}
                        <div class="sorters">
                          <div class="sort-asc arrow up" />
                          <div class="sort-desc arrow down" />
                        </div>
                      </div>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="asset in assets">
                    <td class="asset-cell">
                      <div class="asset">
                        <img class="icon" :src="asset.icon_url" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                        {{ asset.name }}
                      </div>
                    </td>
                    <td class="symbol">{{ asset.symbol }}</td>
                    <td class="sub-type">{{ asset.sub_type }}</td>
                    <td class="price">{{ asset.current_price | ftFormatCurrency(2) }}</td>
                    <td class="variation" :class="asset.variation.positive">
                      {{ asset.variation.string }}%
                    </td>
                    <td class="market-cap">{{ asset.market_price | ftFormatCurrency(2) }}</td>
                    <td class="cta-wrapper apollo">
                      <a class="button primary outlined">{{ i18n('Comprar') }}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="mobileMode" class="crypto-asset-table-mobile">
                <a class="crypto-asset" v-for="asset in assets">
                  <div class="attributes">
                    <div class="header">
                      <img class="asset-icon" :src="asset.icon_url" :title="getIconAlt(asset.name)" :alt="getIconAlt(asset.name)"/>
                      <div class="asset-data">
                        <p class="name">{{ asset.name }}</p>
                        <p class="sub-type">{{ asset.sub_type }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="market-data">
                    <p class="price">{{ asset.current_price | ftFormatCurrency(2) }}</p>
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
      default: "pt",
    },
    assets: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [configMixins, UIMixins, currencyFilters],
  data() {
    return {
      sort: "",
      order: "",
      translateMap: {
        pt: {
          Ativo: "Ativo",
          Ticker: "Ticker",
          Segmento: "Segmento",
          Preço: "Preço",
          Variação: "Variação",
          "Capitalização de mercado": "Capitalização de mercado",
          Comprar: "Comprar",
          utility_token: "Utility token",
        },
        en: {
          Ativo: "Ativo",
          Ticker: "Ticker",
          Segmento: "Segmento",
          Preço: "Preço",
          Variação: "Variação",
          "Capitalização de mercado": "Capitalização de mercado",
          Comprar: "Comprar",
          utility_token: "Utility token",
        },
        es: {
          Ativo: "Ativo",
          Ticker: "Ticker",
          Segmento: "Segmento",
          Preço: "Preço",
          Variação: "Variação",
          "Capitalização de mercado": "Capitalização de mercado",
          Comprar: "Comprar",
          utility_token: "Utility token",
        },
      },
    };
  },
  methods: {
    i18n(key) {
      return this.translateMap?.[this.language]?.[key] ?? "";
    },
    getIconAlt(name) {
      return `ícone ${name}`;
    },
    onSortChange(sort) {
      if (this.sort === "sort") {
      } else {
        this.sort = sort;
        this.order = "asc";
      }

      this.$emit("sort", { order: this.order, sort: this.sort });
    },
  },
});
