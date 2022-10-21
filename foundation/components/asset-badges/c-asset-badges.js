const MBC_ASSET_BADGES = () => ({ //eslint-disable-line
  template: `<div class="c-asset-badges" v-if="badges.length > 0">
    <div class="c-badge" v-for="(badge, index) in cptdNormalizedBadges" :key="badge.text + index">
      <span v-if="isTypeStatus(badge.type)" class="rounded-status" :class="badge.text" />
      <img v-else class="icon" :src="cptdBadgeIconUrl" /> 
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
          'sold-out': 'esgotado',
          future: 'em breve',
          finished: 'finalizado'
        },
        en: {
          novo: 'novo',
          'exclusivos mb': 'exclusivos mb',
          'pré-listagem': 'pré-listagem',
          'primary-market': 'mercado primário',
          'secondary-market': 'mercado secundário',
          'sold-out': 'esgotado',
          future: 'em breve',
          finished: 'finalizado'
        },
        es: {
          novo: 'novo',
          'exclusivos mb': 'exclusivos mb',
          'pré-listagem': 'pré-listagem',
          'primary-market': 'mercado primário',
          'secondary-market': 'mercado secundário',
          'sold-out': 'esgotado',
          future: 'em breve',
          finished: 'finalizado'
        }
      }
    }
  },
  computed: {
    cptdBadgeIconUrl () {
      return `${this.MB_WIDGETS_GLOBAL_Cdn_Widgets_Url}/img/icons/ico-badge-thunder-mono.svg`
    },
    cptdNormalizedBadges () {
      return this.badges.map((badge) => ({
        ...badge,
        text: (badge.text ?? '').toLowerCase().replace('_', '-'),
        translatedText: this.i18n((badge.text ?? '').toLowerCase().replace('_', '-'))
      })).filter(({ text, translatedText }) => !!text && !!translatedText)
    }
  },
  methods: {
    isTypeStatus (type) {
      return type === 'status'
    },
    getIconAlt (name) {
      return `ícone ${name}`
    },
    i18n (key) {
      return this.translateMap?.[this.language]?.[key] ?? ''
    }
  }
})
