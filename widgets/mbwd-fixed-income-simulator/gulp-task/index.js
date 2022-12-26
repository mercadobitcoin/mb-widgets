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
  const ConfigMixins = 'foundation/mixins/configMixins.js'
  const CurrencyMixins = 'foundation/mixins/currencyMixins.js'
  const CurrencyFilters = 'foundation/mixins/filters/currencyFilters.js'
  // Depedency
  const FormInput = 'widgets/mbwd-fixed-income-simulator/components/js/mbwd-form-input/mbwd-form-input.js'
  const AssetsComparisonGrphBar = 'widgets/mbwd-fixed-income-simulator/components/js/mbwd-assets-comparison-graph-bar/mbwd-assets-comparison-graph-bar.js'
  const MbdwFixedIncomeSimulator = 'widgets/mbwd-fixed-income-simulator/components/js/mbwd-fixed-income-simulator.js'
  // Main Component Path
  const MainComponentJSpath = 'widgets/mbwd-fixed-income-simulator/components/js/main.js'

  pump(
    [
      src([
        Mixins,
        ConfigMixins,
        CurrencyMixins,
        CurrencyFilters,
        FormInput,
        AssetsComparisonGrphBar,
        MbdwFixedIncomeSimulator,
        // Main
        MainComponentJSpath,
      ]),
      concat('mbwd-fixed-income-simulator.js'),
      footer('MbwdFixedIncomeSimulator().render(Vue, "#mbwd-fixed-income-simulator");'),
      terser(),
      replace(/ {2,}/g, ''),
      rename({ extname: '.min.js' }),
      dest('public/widgets/mbwd-fixed-income-simulator/js')
    ],
    cb
  )

  pump(
    [
      src([
        'widgets/mbwd-fixed-income-simulator/components/css/**'
      ]),
      sass({ outputStyle: 'compressed' }).on('error', sass.logError),
      concat('mbwd-fixed-income-simulator.css'),
      replace(/\n/g, ''),
      dest('public/widgets/mbwd-fixed-income-simulator/css')
    ],
    cb
  )
}

task.displayName = 'Widget: Fixed Income Simulator Components'
task.watchSrc = [
  'widgets/mbwd-fixed-income-simulator/components/**',
]

module.exports = { task }
