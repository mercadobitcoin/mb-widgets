function MbwdFixedIncomeSimulator () { // eslint-disable-line
  return {
    version: '1.0.0',
    appendStyle () {
      const cssLink = document.createElement('link')
      if (window.location.host.includes('localhost')) {
        cssLink.href = 'widgets/mbwd-fixed-income-simulator/css/mbwd-fixed-income-simulator.css'
      } else if (window.location.host.includes('mercado-bitcoin.vipdev.lndo.site')) {
        cssLink.href = 'http://localhost:5001/web/widgets/mbwd-fixed-income-simulator/css/mbwd-fixed-income-simulator.css'
      } else {
        cssLink.href = 'https://static.mercadolitecoin.com.br/web/widgets/mbwd-fixed-income-simulator/css/mbwd-fixed-income-simulator.css'
      }
      cssLink.rel = 'stylesheet'

      document.head.appendChild(cssLink)
    },
    render: function (Vue, querySelector) {
      if (!Vue) {
        throw Error('Vue is required to load this widget')
      }

      if (Vue.version && Number(Vue.version[0]) < 2) {
        throw Error('You must provide at least a Vue 2 version')
      }

      if (!querySelector) {
        throw Error('Provide a querySelector')
      }

      this.appendStyle()

      const mbwdFixedIncomeSimulatorWrapper = document.querySelector(querySelector)
      const mbwdAssetsTag = `<mbwd-fixed-income-simulator/>`
      mbwdFixedIncomeSimulatorWrapper.insertAdjacentHTML('beforeend', mbwdAssetsTag)
      new Vue({// eslint-disable-line
        el: document.querySelector('mbwd-fixed-income-simulator'),
        components: {
          'mbwd-fixed-income-simulator': MBWD_FIXED_INCOME_SIMULATOR()// eslint-disable-line
        },
        created () {
          this.$root.$on('track-analytics', event => {
            if (mbwdFixedIncomeSimulatorWrapper.dataset.trackAnalyticsEnabled) {
              try {
                if (window.gtag) {
                  gtag('event', event.en, { //eslint-disable-line
                    event_category: event.ec,
                    event_label: event.lb
                  })
                }
              } catch (e) {}
            }
          })
        }
      })
    }
  }
}
