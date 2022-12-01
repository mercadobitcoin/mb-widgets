MBWD_FIXED_INCOME_ASSET_CARD_SKELETON = () => ({ // eslint-disable-line
  template: `
    <div class="fixed-income-card-skeleton">
      <div v-if="mobileMode" class="mobile ">
        <div class="attributes">
          <div class="header">
            <div class="skeleton asset-icon"/> 
            <div class="skeleton name"/>
          </div>
          <div class="skeleton badge"/>
        </div>
        <div class="market-data">
          <div class="skeleton profitability" />
          <div class="skeleton price"/>
        </div>
      </div>
      <div v-else class="desktop">
        <div class="skeleton badge"/>
        <div class="asset-data">
          <div class="attributes">
            <div class="attribute"> 
              <div class="skeleton name"/>
            </div>
            <div class="attribute minimum-value"> 
              <div class="skeleton title"/>
              <div class="skeleton description"/>
            </div>
            <div class="attribute profitability">
              <div class="skeleton title"/>
              <div class="skeleton description"/>
            </div> 
            <div class="attribute estimated-liquidation-date">
              <div class="skeleton title"/>
              <div class="skeleton description"/>
            </div> 
          </div>
          <div class="sold-percentage">
            <div class="middle-circle">
              <div class="skeleton percentage"/>
              <div class="skeleton label"/>
            </div>
          </div>
        </div>
        <div class="ctas">
          <div class="skeleton button"/>
          <div class="skeleton button"/>
        </div>
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.UIMixins], // eslint-disable-line
})
