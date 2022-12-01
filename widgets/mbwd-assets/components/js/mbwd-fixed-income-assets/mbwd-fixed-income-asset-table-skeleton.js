const MBWD_FIXED_INCOME_ASSET_TABLE_SKELETON_MOBILE = () => ({ // eslint-disable-line
  template: `
    <div class="mbwd-fixed-income-asset-table-skeleton-mobile">
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
        <div class="skeleton badge"/>
        <div class="skeleton price" />
      </div>
    </div>`,
  mixins: [window.MB_WIDGETS.UIMixins],// eslint-disable-line
})

const MBWD_FIXED_INCOME_ASSET_TABLE_SKELETON_DESKTOP = () => ({ // eslint-disable-line
  template: `
    <tr>
      <td class="asset-cell">
        <div class="skeleton asset-icon"/>
        <div class="skeleton name"/>
      </td>
      <td class="minimum-value">
        <div class="skeleton"/>
      </td>
      <td class="profitability">
        <div class="skeleton"/>
      </td>
      <td class="liquidation-date">
        <div class="skeleton"/>
      </td>
      <td class="available-percentage">
        <div class="skeleton"/>
      </td>
      <td class="status">
        <div class="skeleton"/>
      </td>
      <td class="cta-wrapper">
        <div class="skeleton"/>
      </td>
    </tr>`,
  mixins: [window.MB_WIDGETS.UIMixins]// eslint-disable-line
})
