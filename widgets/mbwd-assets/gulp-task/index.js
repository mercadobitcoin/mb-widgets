'use strict'

const { src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const terser = require('gulp-terser')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const pump = require('pump')
const replace = require('gulp-replace')
const footer = require('gulp-footer')

const task = (cb) => {
  // Mixins
  const Mixins = 'foundation/mixins/mixins.js'
  const UIMixins = 'foundation/mixins/UIMixins.js'
  const configMixins = 'foundation/mixins/configMixins.js'
  const URLMixins = 'foundation/mixins/urlMixins.js'

  // Filters
  const CurrencyFilters = 'foundation/mixins/filters/currencyFilters.js'

  // Pagination (Dependency:4)
  const Pagination = 'foundation/components/pagination/c-pagination.js'
  const EmptyState = 'foundation/components/empty-state/c-empty-state.js'
  const AssetBadges = 'foundation/components/asset-badges/c-asset-badges.js'

  // Crypto Components (Dependency:3)
  const CryptoAssetsCardList =
    'widgets/mbwd-assets/components/js/mbwd-crypto-assets/mbwd-crypto-asset-card-list.js'
  const CryptoAssetsTable =
    'widgets/mbwd-assets/components/js/mbwd-crypto-assets/mbwd-crypto-asset-table.js'

  // Crypto Components (Dependency:2)
  const CryptoAssets =
    'widgets/mbwd-assets/components/js/mbwd-crypto-assets/mbwd-crypto-assets.js'

  // Fixed Income Components (Dependency:3)
  const FixedIncomeAssetsCardList =
    'widgets/mbwd-assets/components/js/mbwd-fixed-income-assets/mbwd-fixed-income-asset-card-list.js'
  const FixedIncomeAssetsTable =
    'widgets/mbwd-assets/components/js/mbwd-fixed-income-assets/mbwd-fixed-income-asset-table.js'

  // Fixed Income Components (Dependency:2)
  const FixedIncomeAssets =
    'widgets/mbwd-assets/components/js/mbwd-fixed-income-assets/mbwd-fixed-income-assets.js'

  // Search Box (Dependency: 2)
  const SearchBox = 'foundation/components/search-box/c-search-box.js'

  // Main Component (Dependency:1)
  const MbwdAssets = 'widgets/mbwd-assets/components/js/mbwd-assets.js'

  // Main Component Path
  const MainComponentJSpath = 'widgets/mbwd-assets/components/js/main.js'

  pump(
    [
      src([
        // Mixins
        configMixins,
        Mixins,
        UIMixins,
        URLMixins,
        CurrencyFilters,
        // Dependencies:4
        AssetBadges,
        Pagination,
        EmptyState,
        // Dependencies:3
        CryptoAssetsCardList,
        CryptoAssetsTable,
        FixedIncomeAssetsCardList,
        FixedIncomeAssetsTable,
        // Dependencies:2
        CryptoAssets,
        FixedIncomeAssets,
        SearchBox,
        // Dependencies:1
        MbwdAssets,
        // Main
        MainComponentJSpath
      ]),
      concat('mbwd-assets.js'),
      footer('MbwdAssets().render(Vue, "#mbwd-assets");'),
      terser(),
      replace(/ {2,}/g, ''),
      rename({ extname: '.min.js' }),
      dest('public/widgets/mbwd-assets/js')
    ],
    cb
  )

  pump(
    [
      src([
        'foundation/components/search-box/c-search-box.scss',
        'foundation/components/pagination/c-pagination.scss',
        'foundation/components/empty-state/c-empty-state.scss',
        'foundation/components/asset-badges/c-asset-badges.scss',
        'widgets/mbwd-assets/components/css/**'
      ]),
      sass({ outputStyle: 'compressed' }).on('error', sass.logError),
      concat('mbwd-assets.css'),
      replace(/\n/g, ''),
      dest('public/widgets/mbwd-assets/css')
    ],
    cb
  )
}

task.displayName = 'Widget: Assets Components'
task.watchSrc = [
  'foundation/mixins/**',
  'foundation/scss/**',
  'widgets/mbwd-assets/components/**',
  'foundation/components/search-box/**',
  'foundation/components/pagination/**',
  'foundation/components/empty-state/**',
  'foundation/components/asset-badges/**'
]

module.exports = { task }
