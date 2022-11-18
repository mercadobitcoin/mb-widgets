const MBC_EMPTY_STATE = () => ({ //eslint-disable-line
  template: `<div class="c-empty-state apollo">
        <img class="main-state-icon" :src="cptdMainStateIconSrc" />
        <p class="title">{{ title }}</p>
        <p class="message" v-html="message"></p>
        <button class="cta primary filled" :title="cta.label" v-if="cptdCtaIsTypeFunction" @click="ctaCallback">
            <img v-if="displayCtaIcon" class="icon" :src="cptdCtaIconSrc" />
            {{ cta.label }}
        </button>
        <a v-if="cptdCtaIsTypeUrl" class="cta button primary ghost" :target="cta.target" :href="cta.url" :title="cta.label" rel="noopener noreferrer">
          {{cta.label}}
        </a>
    </div>`,
  mixins: [window.MB_WIDGETS.configMixins], //eslint-disable-line
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
    },
    widgetName: {
      type: String
    }
  },
  computed: {
    cptdCtaIsTypeFunction () {
      return this.cta && this.cta.type && this.cta.type === 'function'
    },
    cptdCtaIsTypeUrl () {
      return this.cta && this.cta.type && this.cta.type === 'link'
    },
    cptdMainStateIconSrc () {
      return `${this.MB_WIDGETS_GLOBAL_Cdn_Widgets_Url}/${this.widgetName}/img/ilu/${this.mainStateIcon}`
    },
    cptdCtaIconSrc () {
      return `${this.MB_WIDGETS_GLOBAL_Cdn_Widgets_Url}/${this.widgetName}/img/icons/${this.ctaIcon}`
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
