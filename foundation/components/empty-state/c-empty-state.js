const MBC_EMPTY_STATE = () => ({ //eslint-disable-line
  template: `<div class="c-empty-state apollo">
        <img class="main-state-icon" :src="getMainStateIconSrc" />
        <p class="title">{{ title }}</p>
        <p class="message">{{ message }}</p>
        <button class="cta primary filled" :title="cta.label" v-if="ctaIsTypeFunction" @click="ctaCallback">
            <img v-if="displayCtaIcon" class="icon" :src="getCtaIconSrc" />
            {{ cta.label }}
        </button>
        <a v-if="ctaIsTypeUrl" class="cta button primary ghost" :target="cta.target" :href="cta.url" :title="cta.label" rel="noopener noreferrer">
          {{cta.label}}
        </a>
    </div>`,
  props: {
    cta: {
      type: Object,
      default: null,
      required: false
    },
    mainStateIcon: {
      type: String,
      default: 'ilu-empty-box.svg'
    },
    message: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    displayCtaIcon: {
      type: Boolean,
      default: false
    },
    ctaIcon: {
      type: String,
      default: 'ico-refresh-mono.svg'
    }
  },
  computed: {
    cptdCdnStaticDomainUrl () {
      return 'https://static.mercadobitcoin.com.br/web'
    },
    ctaIsTypeFunction () {
      return this.cta && this.cta.type && this.cta.type === 'function'
    },
    ctaIsTypeUrl () {
      return this.cta && this.cta.type && this.cta.type === 'link'
    },
    getMainStateIconSrc () {
      return `${this.cptdCdnStaticDomainUrl}/img/ilu/${this.mainStateIcon}`
    },
    getCtaIconSrc () {
      return `${this.cptdCdnStaticDomainUrl}/img/icons/${this.ctaIcon}`
    }
  },
  methods: {
    ctaCallback () {
      if (this.cta?.callback instanceof Function) {
        this.cta.callback()
      }
    }
  }
})
