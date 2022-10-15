"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-terser");
const concat = require("gulp-concat");
const pump = require("pump");
const replace = require("gulp-replace");

const task = function (cb) {
  // Modules
  const MostValuedAssetsComponentPath =
    "widgets/mbwd-most-valued-assets/components/js/mbwd-most-valued-assets.js";
  const MainComponentJSpath =
    "widgets/mbwd-most-valued-assets/components/js/main.js";

  // Negotiate Component and dependencies
  pump(
    [
      gulp.src([MostValuedAssetsComponentPath, MainComponentJSpath]),
      concat("c-mbwd-most-valued-assets.js"),
      uglify(),
      replace(/ {2,}/g, ""),
      gulp.dest("public/mbwd-most-valued-assets/js"),
    ],
    cb
  );

  // Stylesheets
  pump(
    [
      gulp.src([
        "widgets/mbwd-most-valued-assets/components/css/mbwd-most-valued-assets.scss",
      ]),
      sass({ outputStyle: "compressed" }).on("error", sass.logError),
      concat("c-mbwd-most-valued-assets.css"),
      replace(/\n/g, ""),
      gulp.dest("public/mbwd-most-valued-assets/css"),
    ],
    cb
  );
};

task.displayName = "Widget: Most Valued Assets Components";
task.watchSrc = ["widgets/mbwd-most-valued-assets/components/**"];

module.exports = { task };
