const MBC_ASSET_BADGES = () => ({ //eslint-disable-line
  template: `<div class="c-asset-badges" v-if="badges.length > 0">
    <div v-if="cptdIsTypeFixedIncome" class="c-badge fixed-income" v-for="badge in cptdNormalizedBadges">
      <span class="rounded-status" :class="badge" /> {{ i18n(badge) }}
    </div>
    <div v-if="cptdIsTypeCrypto" class="c-badge crypto" v-for="badge in cptdNormalizedBadges">
      <img class="icon" :src="getIconUrl(badge)" /> {{ i18n(badge) }}
    </div>
  </div>`,
  props: {
    badges: {
      type: Array,
      default: () => []
    },
    language: {
      type: String,
      default: 'pt'
    },
    type: {
      type: String,
      default: 'crypto' // [crypto, fixed-income]
    }
  },
  data () {
    return {
      translateMap: {
        pt: {
          novo: 'novo',
          'exclusivos mb': 'exclusivos mb',
          'pré-listagem': 'pré-listagem',
          'primary-market': 'mercado primário',
          'secondary-market': 'mercado secundário',
          'sold-out': 'esgotado'
        },
        en: {
          novo: 'novo',
          'exclusivos mb': 'exclusivos mb',
          'pré-listagem': 'pré-listagem',
          'primary-market': 'mercado primário',
          'secondary-market': 'mercado secundário',
          'sold-out': 'esgotado'
        },
        es: {
          novo: 'novo',
          'exclusivos mb': 'exclusivos mb',
          'pré-listagem': 'pré-listagem',
          'primary-market': 'mercado primário',
          'secondary-market': 'mercado secundário',
          'sold-out': 'esgotado'
        }
      }
    }
  },
  computed: {
    cptdIsTypeFixedIncome () {
      return this.type === 'fixed-income'
    },
    cptdIsTypeCrypto () {
      return this.type === 'crypto'
    },
    cptdNormalizedBadges () {
      return this.badges.map((badge) => String((badge ?? '')).toLowerCase().replace('_', '-'))
    }
  },
  methods: {
    getIconUrl (badge) {
      switch ((badge ?? '').toLowerCase()) {
        case 'exclusivos mb':
          return '/widgets/img/icons/ico-badge-check-mono.svg'
        default:
          return '/widgets/img/icons/ico-badge-thunder-mono.svg'
      }
    },
    getIconAlt (name) {
      return `ícone ${name}`
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    }
  }
})
