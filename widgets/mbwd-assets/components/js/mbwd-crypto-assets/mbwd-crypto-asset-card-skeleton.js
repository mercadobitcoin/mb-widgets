const MBWD_CRYPTO_ASSET_CARD_SKELETON = () => ({ // eslint-disable-line
  template: `
    <div class="crypto-card-skeleton">
      <div v-if="mobileMode" class="mobile ">
        <div class="attributes">
          <div class="header">
            <div class="skeleton asset-icon"/> 
            <div class="asset-data">
              <div class="skeleton name"/>
              <div class="skeleton type"/>
            </div>
          </div>
        </div>
        <div class="market-data">
          <div class="variation">
            <div class="skeleton value" />
            <div class="skeleton label" />
          </div>
          <div class="skeleton price"/>
        </div>
      </div>
      <div v-else class="desktop">
        <div class="attributes">
          <div class="header">
            <div class="skeleton asset-icon"/>
          </div>
          <div class="skeleton name"/>
          <div class="skeleton type"/>
        </div>
        <div class="skeleton price"/>
        <div class="variation">
          <div class="skeleton value" />
          <div class="skeleton label" />
        </div>
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.UIMixins] // eslint-disable-line
})
