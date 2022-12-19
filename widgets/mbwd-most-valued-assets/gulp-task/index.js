'use strict'

const { src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const terser = require('gulp-terser')
const concat = require('gulp-concat')
const pump = require('pump')
const replace = require('gulp-replace')
const footer = require('gulp-footer')
const rename = require('gulp-rename')

const task = (cb) => {
  // Filters
  const CurrencyFilters = 'foundation/mixins/filters/currencyFilters.js'

  // Modules
  const MostValuedAssetsComponentPath =
    'widgets/mbwd-most-valued-assets/components/js/mbwd-most-valued-assets.js'
  const MainComponentJSpath =
    'widgets/mbwd-most-valued-assets/components/js/main.js'

  // Negotiate Component and dependencies
  pump(
    [
      src([
        CurrencyFilters,
        MostValuedAssetsComponentPath,
        MainComponentJSpath
      ]),
      concat('mbwd-most-valued-assets.js'),
      footer('MbwdMostValuedAssets().render(Vue, "#mbwd-most-valued-assets");'),
      terser(),
      replace(/\\n {2}/g, ' '),
      replace(/ {2,}/g, ''),
      rename({ extname: '.min.js' }),
      dest('public/widgets/mbwd-most-valued-assets/js')
    ],
    cb
  )

  // Stylesheets
  pump(
    [
      src([
        'widgets/mbwd-most-valued-assets/components/css/mbwd-most-valued-assets.scss'
      ]),
      sass({ outputStyle: 'compressed' }).on('error', sass.logError),
      concat('mbwd-most-valued-assets.css'),
      replace(/\n/g, ''),
      dest('public/widgets/mbwd-most-valued-assets/css')
    ],
    cb
  )
}

task.displayName = 'Widget: Most Valued Assets Components'
task.watchSrc = ['widgets/mbwd-most-valued-assets/components/**']

module.exports = { task }
