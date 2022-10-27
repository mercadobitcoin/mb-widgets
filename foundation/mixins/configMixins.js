window.MB_WIDGETS = window.MB_WIDGETS || {}
window.MB_WIDGETS.configMixins = {
  computed: {
    MB_WIDGETS_GLOBAL_Cdn_Static_Path () { // TODO: REMOVE AFTER ADD WIDGET ON WPVIP
      if (window.location.host.includes('mercado-bitcoin.vipdev.lndo.site')) {
        return 'http://localhost:5001/web'
      }
      return window.location.host.includes('localhost') ? '' : 'https://static.mercadobitcoin.com.br/web'
    },
    MB_WIDGETS_GLOBAL_Cdn_Widgets_Url () {
      return `${this.MB_WIDGETS_GLOBAL_Cdn_Static_Path}/widgets`
    },
    MB_WIDGETS_GLOBAL_Cdn_Assets_Icon_Url () {
      return 'https://static.mercadobitcoin.com.br/web'
    }
  }
}
