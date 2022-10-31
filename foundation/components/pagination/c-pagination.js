const MBC_PAGINATION = () => ({ //eslint-disable-line
  template: `
    <div class="c-pagination" v-if="totalPages > 1">
      <div class="pages">
        <button class="page go-to-first" :disabled="currentPage === 1" @click="onPageClick(null, 'back')">
          <div class="arrow left" />
        </button>
        <button class="page first" :class="cssIsActive(1)" @click="onPageClick(1)">1</button>
        <span v-if="cptdDisplayLeftEllipsis" class="page ellipsis">...</span>
        <button class="page" :class="cssIsActive(page)" v-for="page in cptdPagesList" @click="onPageClick(page)">
          {{ page }}
        </button>
        <span v-if="cptdDisplayRightEllipsis" class="page ellipsis">...</span>
        <button v-if="cptdDisplayLastPage" class="page last" :class="cssIsActive(totalPages)" @click="onPageClick(totalPages)">{{totalPages}}</button>
        <button class="page go-to-last" :disabled="currentPage === totalPages" @click="onPageClick(null, 'next')">
          <div class="arrow right" />
        </button>
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.trackEvent], // eslint-disable-line
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
      default: "assets"
    }
  },
  data () {
    return {
      maxDisplayPages: 3
    }
  },
  computed: {
    cptdDisplayLeftEllipsis () {
      //if (this.totalPages === 5) { return false }
      if (this.totalPages <= 5) { return false }
      return this.currentPage >= this.maxDisplayPages + 1
    },
    cptdDisplayRightEllipsis () {
      //if (this.totalPages === 5) { return false }
      if (this.totalPages <= 5) { return false }
      return this.currentPage < this.totalPages - this.maxDisplayPages + 1
    },
    cptdDisplayLastPage () {
      if (this.totalPages === 5) { return true }
      if (this.totalPages <= 5 && this.currentPage != this.totalPages) { return true }
      return this.currentPage <= this.totalPages - this.maxDisplayPages
    },
    cptdPagesList () {
      if (this.totalPages === 5) {
        return [2, 3, 4]
      }
      if (this.currentPage > this.maxDisplayPages) {
        if (this.currentPage <= this.totalPages - this.maxDisplayPages) {
          return [this.currentPage - 1, this.currentPage, this.currentPage + 1]
        }
        // Creates an indexed array from with total pages + 1
        // Gets it's keys [1,2,3,4...50]
        // Reverse [50,49,48,47...1]
        // Get the first 3 positions [50,49,48]
        // Reverse back [48,49,50]
        return Array.from(Array(this.totalPages + 1).keys())
          .reverse()
          .slice(0, this.maxDisplayPages)
          .reverse()
      }

      if (this.totalPages < this.maxDisplayPages) {
        return Array.from(new Array(this.totalPages - 1), (x, i) => i + 2)
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
        'back': {
          label:'pagination:previous',
          page: this.currentPage - 1
        },
        'next': {
          label:'pagination:next',
          page: this.currentPage + 1
        },
        'numeric': {
          label:`pagination:${page}`,
          page: page
        },  
      }

      this.$emit('change', eventActions[action]['page'])

      this.trackAnalytics({
        ec: 'web:site:home',
        en: 'click',
        lb: `${this.trackComponent}:${eventActions[action]['label']}`
      })
    }
  }
})
