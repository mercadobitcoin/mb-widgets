window.MB_WIDGETS = window.MB_WIDGETS || {}
window.MB_WIDGETS.trackEvent = {//eslint-disable-line
  methods: {
    ga: (event) => {
      console.log(event)
      try {
        if (gtag) { //eslint-disable-line
          gtag('event', event.en, { //eslint-disable-line
            event_category: event.ec,
            event_label: event.lb
          })
          
        }
      } catch (e) {}
    }
  }
}
