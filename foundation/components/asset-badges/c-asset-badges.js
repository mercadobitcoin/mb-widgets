const MBC_ASSET_BADGES = () => ({
  template: `<div class="c-asset-badges" v-if="badges.length > 0">
			<div v-if="cptdIsTypeFixedIncome" class="c-badge fixed-income" v-for="badge in badges">
				<span class="rounded-status" :class="badge" /> {{ i18n(badge) }}
			</div>
			<div v-else class="c-badge crypto" v-for="badge in badges">
				<img class="icon" :src="getIconUrl(badge)" /> {{ i18n(badge) }}
			</div>
		</div>`,
  props: {
    badges: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "crypto", // [crypto, fixed-income]
    },
  },
  data() {
    return {
      translateMap: {
        pt: {
          Favoritos: "Favoritos",
        },
        en: {
          Favoritos: "Favoritos",
        },
        es: {
          Favoritos: "Favoritos",
        },
      },
    };
  },
  computed: {
    cptdIsTypeFixedIncome: () => this.type === "fixed-income",
    cptdIsTypeCrypto: () => this.type === "crypto",
  },
  methods: {
    getIconUrl() {},
    getIconAlt(name) {
      return `ícone ${name}`;
    },
    i18n(key) {
      return this.translateMap?.[this.language]?.[key] ?? "";
    },
  },
});
