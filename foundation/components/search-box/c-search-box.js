const MBC_SEARCH_BOX = () => ({ //eslint-disable-line
  template: `
  <div :class="cssSearchBoxWrapper" v-click-outside="blur">
    <img v-if="displayInputIcon" class="search-box-icon" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/img/icons/ico-search-neutral.svg'" />
    <input ref="input_search" type="text" autocomplete="off" class="search-box-input" :class="cptdCssInput" @focus="focused = true" :placeholder="placeholder" v-model="searchTerm" @input="debounceSearch($event)" @keyup.esc="blur" @keyup.enter="blur" />
    <button v-if="cptdCanDisplayClearButton" class="clear" @click="clearSearch" title="Clique para limpar a busca">
      <img class="ico-close" src="/widgets/img/icons/ico-close-mono.svg" />
    </button>
  </div>`,
  directives: {
    'click-outside': {
      bind (el, binding, vnode) {
        document.body.addEventListener(
          'mousedown',
          (event) => {
            if (!(el === event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event)
            }
          },
          { capture: true }
        )
      },
      unbind () {
        document.body.removeEventListener('mousedown', this.event)
      }
    }
  },
  mixins: [window.MB_WIDGETS.mixins, window.MB_WIDGETS.configMixins], //eslint-disable-line
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    displayClearButton: {
      type: Boolean,
      default: true
    },
    displayInputIcon: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      searchTerm: this.value,
      debounceIntervalId: null,
      focused: false
    }
  },
  computed: {
    cptdCdnStaticDomainUrl () {
      return 'https://static.mercadobitcoin.com.br/web'
    },
    cssSearchBoxWrapper () {
      return {
        'c-search-box-wrapper': true,
        focus: this.focused
      }
    },
    cptdCssInput () {
      return {
        'has-text': this.cptdCanDisplayClearButton
      }
    },
    cptdCanDisplayClearButton () {
      return this.displayClearButton && this.searchTerm.length > 0
    }
  },
  watch: {
    autofocus (focus) {
      if (focus) {
        this.focusOnInputSearch()
      }
    },
    value (value) {
      this.searchTerm = value
    }
  },
  methods: {
    debounceSearch (event) {
      this.debounceIntervalId = this.mxDebounce(this.debounceIntervalId, () => {
        this.$emit('update:value', event.target.value)

        let valueForGaTracking = (event.target.value).replace(/\s+/g,"-")
        this.$root.$emit('track-analytics', {
          ec: 'web:site:home',
          en: 'search',
          lb: `search:${valueForGaTracking}`
        })
      })
    },
    focusOnInputSearch () {
      Vue.nextTick(() => {//eslint-disable-line
        this.$refs.input_search.focus()
      })
    },
    clearSearch () {
      this.searchTerm = ''
      this.$emit('update:value', this.searchTerm)
      this.focusOnInputSearch()
    },
    blur () {
      this.focused = false
      this.$emit('blur')
    }
  }
})
