const MBWD_CRYPTO_ASSET_TABLE_SKELETON_MOBILE = () => ({ // eslint-disable-line
  template: `
    <div class="mbwd-crypto-asset-table-skeleton-mobile">
      <div class="attributes">
        <div class="header">
          <div class="skeleton asset-icon"/>
        </div>
        <div class="asset-data">
          <div class="skeleton name"/>
          <div class="skeleton type"/>
        </div>
      </div>
      <div class="market-data">
        <div class="skeleton price"/>
        <div class="variation">
          <div class="skeleton value" />
          <div class="skeleton label" />
        </div>
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.UIMixins]// eslint-disable-line
})

const MBWD_CRYPTO_ASSET_TABLE_SKELETON_DESKTOP = () => ({ // eslint-disable-line
  template: `
    <tr>
      <td class="asset-cell">
        <div class="skeleton asset-icon"/>
        <div class="skeleton name"/>
      </td>
      <td class="symbol">
        <div class="skeleton"/>
      </td>
      <td class="sub-type">
        <div class="skeleton"/>
      </td>
      <td class="price">
        <div class="skeleton"/>
      </td>
      <td class="variation">
        <div class="skeleton"/>
      </td>
      <td class="market-cap">
        <div class="skeleton"/>
      </td>
      <td class="cta-wrapper">
        <div class="skeleton"/>
      </td>
    </tr>`,
  mixins: [window.MB_WIDGETS.UIMixins]// eslint-disable-line
})
