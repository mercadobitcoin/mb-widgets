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
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      maxDisplayPages: 3
    }
  },
  computed: {
    cptdDisplayLeftEllipsis () {
      return this.currentPage >= this.maxDisplayPages + 1
    },
    cptdDisplayRightEllipsis () {
      return this.currentPage < this.totalPages - this.maxDisplayPages + 1
    },
    cptdDisplayLastPage () {
      return this.currentPage <= this.totalPages - this.maxDisplayPages
    },
    cptdPagesList () {
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
    onPageClick (page, action) {
      switch (action) {
        case 'back':
          this.$emit('change', this.currentPage - 1)
          break
        case 'next':
          this.$emit('change', this.currentPage + 1)
          break
        default:
          this.$emit('change', page)
      }
    }
  }
})
