'use strict'

const gulp = require('gulp')
const lodash = require('lodash')

const gulpAppBuildObject = require('./tasks/widgets-tasks')
// Tasks functions sources for app sources
if (gulpAppBuildObject.length > 0) {
  exports.app_tasks = gulp.series(gulpAppBuildObject)
}

// Everything
exports.all = gulp.series(gulpAppBuildObject)
exports.watch = () => {
  gulpAppBuildObject.forEach((task) => {
    if (task.watchSrc) {
      gulp.watch(task.watchSrc, lodash.debounce(gulp.series(task), 5000))
    }
  })
}
