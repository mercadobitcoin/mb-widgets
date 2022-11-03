const MBC_PAGINATION = () => ({ //eslint-disable-line
  template: `
    <div class="c-pagination" v-if="totalPages > 1">
      <div v-if="!mobileMode" class="pages">
        <button class="page go-to-first" :disabled="currentPage === 1" @click="onPageClick(null, 'back')">
          <div class="arrow left" />
        </button>
        <button class="page first" :class="cssIsActive(1)" @click="onPageClick(1)">1</button>
        <span v-if="cptdDisplayLeftEllipsis" class="page ellipsis">...</span>
        <button class="page" :class="cssIsActive(page)" v-for="page in cptdPagesList" @click="onPageClick(page)">
          {{ page }}
        </button>
        <span v-if="cptdDisplayRightEllipsis" class="page ellipsis">...</span>
        <button class="page last" :class="cssIsActive(totalPages)" @click="onPageClick(totalPages)">{{totalPages}}</button>
        <button class="page go-to-last" :disabled="currentPage === totalPages" @click="onPageClick(null, 'next')">
          <div class="arrow right" />
        </button>
      </div>
      <div v-if="mobileMode" class="show-more">
        <button class="btn-show-more" :disabled="currentPage === totalPages" @click="onPageClick(null, 'showMore')">
          <span> Mostrar mais </span>
          <div class="arrow bottom" />
        </button>
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.UIMixins], //eslint-disable-line
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    trackComponent: {
      type: String,
      default: 'assets'
    }
  },
  data () {
    return {
      maxDisplayPages: 3
    }
  },
  computed: {
    cptdDisplayLeftEllipsis () {
      return this.totalPages > 5 && this.currentPage > this.maxDisplayPages
    },
    cptdDisplayRightEllipsis () {
      return this.totalPages > 5 && this.currentPage <= this.totalPages - this.maxDisplayPages
      
    },
    cptdPagesList () {
      if(this.totalPages <= 5){
        return Array.from(new Array(this.totalPages - 2), (x, i) => i + 2)
      }

      if(this.currentPage >= this.maxDisplayPages) {        
        if(this.currentPage < this.totalPages - 1) {
          return [this.currentPage - 1, this.currentPage, this.currentPage + 1]
        }
        if(this.currentPage < this.totalPages) {
          return [this.currentPage - 1, this.currentPage]
        }
        if(this.currentPage == this.totalPages) {
          return [this.currentPage - 2, this.currentPage - 1]
        }
       }

      return Array.from(new Array(this.maxDisplayPages - 1), (x, i) => i + 2)
    }
  },
  methods: {
    cssIsActive (page) {
      return this.currentPage === page ? 'active' : ''
    },
    onPageClick (page, action = 'numeric') {
      const eventActions = {
        back: {
          label: 'pagination:previous',
          page: this.currentPage - 1
        },
        next: {
          label: 'pagination:next',
          page: this.currentPage + 1
        },
        numeric: {
          label: `pagination:${page}`,
          page
        },
        showMore: {
          label: 'show-more',
          page: this.currentPage + 1
        }
      }

      this.$emit('change', eventActions[action].page)

      this.$root.$emit('track-analytics', {
        ec: 'web:site:home',
        en: 'click',
        lb: `${this.trackComponent}:${eventActions[action].label}`
      })
    }
  }
})
