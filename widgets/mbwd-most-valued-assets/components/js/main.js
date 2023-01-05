function MbwdMostValuedAssets () { // eslint-disable-line
  return {
    version: '1.0.0',
    appendStyle () {
      const cssLink = document.createElement('link')
      if (window.location.host.includes('localhost') && !window.location.pathname.includes('plataforma')) {
        cssLink.href = 'widgets/mbwd-most-valued-assets/css/mbwd-most-valued-assets.css'
      } else if (window.location.host.includes('mercado-bitcoin.vipdev.lndo.site')) {
        cssLink.href = 'http://localhost:5001/web/widgets/mbwd-most-valued-assets/css/mbwd-most-valued-assets.css'
      } else {
        cssLink.href = 'https://static.mercadolitecoin.com.br/web/widgets/mbwd-most-valued-assets/css/mbwd-most-valued-assets.css'
      }
      cssLink.rel = 'stylesheet'

      document.head.appendChild(cssLink)
    },
    render: function (Vue, querySelector) {
      if (!Vue) {
        throw new Error('Vue is required to load this widget')
      }

      if (Vue.version && Number(Vue.version[0]) < 2) {
        throw new Error('You must provide at least a Vue 2 version')
      }

      if (!querySelector) {
        throw new Error('Provide a querySelector')
      }

      this.appendStyle()

      const mbwdMostValuedAssetsWrapper = document.querySelector(querySelector)
      const mbwdMostValuedAssetsTag = `<mbwd-most-valued-assets language='${mbwdMostValuedAssetsWrapper.dataset.language || 'pt'}' />`
      mbwdMostValuedAssetsWrapper.insertAdjacentHTML('beforeend', mbwdMostValuedAssetsTag)

      new Vue({ // eslint-disable-line
        el: document.querySelector('mbwd-most-valued-assets'),
        components: {
          'mbwd-most-valued-assets': MBWD_MOST_VALUED_ASSETS() // eslint-disable-line
        },
        created () {
          this.$root.$on('track', event => {
            if (mbwdMostValuedAssetsWrapper.dataset.trackAnalyticsEnabled) {
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
