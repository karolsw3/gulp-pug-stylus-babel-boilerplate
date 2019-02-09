var gulp = require('gulp')
var plumber = require('gulp-plumber')
var concat = require('gulp-concat')
var connect = require('gulp-connect')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')
var babel = require('gulp-babel')
var autoprefixer = require('gulp-autoprefixer')
var jeet = require('jeet')
var rupture = require('rupture')

gulp.task('stylus', function () {
  return gulp.src('src/stylus/**/*.styl')
    .pipe(stylus({
      use: [jeet(), rupture()]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload())
})

gulp.task('pug', function () {
  return gulp.src(['src/views/**/*.pug', '!src/views/includes/*.pug'])
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('public'))
    .pipe(connect.reload())
})

gulp.task('babel', function () {
  return gulp.src('src/javascript/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('public/js'))
    .pipe(connect.reload())
})

gulp.task('connect', function () {
  connect.server({
    root: ['public'],
    livereload: true
  })
})

gulp.task('watch', function () {
  gulp.watch(['src/stylus/**/*.styl'], gulp.series('stylus'))
  gulp.watch(['src/views/**/*.pug'], gulp.series('pug'))
  gulp.watch(['src/javascript/**/*.js'], gulp.series('babel'))
})

gulp.task('default', gulp.parallel('stylus', 'pug', 'babel', 'watch', 'connect'))
