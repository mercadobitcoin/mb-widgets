const MBC_ASSET_BADGES = () => ({ //eslint-disable-line
  template: `<div class="c-asset-badges" v-if="badges.length > 0">
    <div class="c-badge" v-for="(badge, index) in cptdNormalizedBadges" :key="badge.text + index" :style="getBadgeTextColor(badge)">
      <span v-if="isTypeStatus(badge.type)" class="rounded-status" :style="getBadgeSpanColor(badge)" />
      {{ badge.translatedText }}
    </div>
  </div>`,
  mixins: [window.MB_WIDGETS.configMixins], //eslint-disable-line
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
    },
    widgetName: {
      type: String
    }
  },
  data () {
    return {
      translateMap: {
        pt: {
          'novo': 'novo', // eslint-disable-line
          'exclusivos mb': 'exclusivos mb',
          'pré-listagem': 'pré-listagem',
          'primary-market': 'mercado primário',
          'secondary-market': 'mercado secundário',
          'sold-out': 'esgotado',
          'future': 'em breve', // eslint-disable-line
          'finished': 'finalizado' // eslint-disable-line
        },
        en: {
          'novo': 'new', // eslint-disable-line
          'exclusivos mb': 'mb exclusives',
          'pré-listagem': 'pre-listing',
          'primary-market': 'primary market',
          'secondary-market': 'secondary market',
          'sold-out': 'sold out',
          'future': 'coming soon', // eslint-disable-line
          'finished': 'finished' // eslint-disable-line
        },
        es: {
          'novo': 'nuevo', // eslint-disable-line
          'exclusivos mb': 'exclusivas mb',
          'pré-listagem': 'pre-listado',
          'primary-market': 'mercado principal',
          'secondary-market': 'mercado secundario',
          'sold-out': 'vendido',
          'future': 'pronto', // eslint-disable-line
          'finished': 'acabado' // eslint-disable-line
        }
      }
    }
  },
  computed: {
    cptdNormalizedBadges () {
      return this.badges.map((badge) => ({
        ...badge,
        text: (badge.text ?? '').toLowerCase().replace('_', '-'),
        translatedText: this.i18n((badge.text ?? '').toLowerCase().replaceAll('_', '-')) || badge.text
      }))
    }
  },
  methods: {
    isTypeStatus (type) {
      return type === 'status'
    },
    getBadgeTextColor (badge) {
      const textColor = badge.text === 'sold-out' ? badge.color : '#1d2327'
      const styleObject = {
        color: textColor
      }
      return styleObject
    },
    getBadgeSpanColor (badge) {
      const styleObject = {
        background: badge.color
      }
      return styleObject
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key.toLowerCase()] ?? ''
    }
  }
})
