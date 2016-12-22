import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import babelify from 'babelify';
import errorHandler from 'gulp-plumber-error-handler';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

const isDev = process.env.NODE_ENV !== 'production';

function runBrowserify() {
  return function () {
    return browserify({
      entries: 'app/scripts/app.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(plumber({errorHandler: errorHandler('Error in \'scripts\' task')}))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpIf(isDev, sourcemaps.init({loadMaps: true})))
    // .pipe(gulpIf(options.transfer, gulp.dest(options.build)))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/scripts'));
  };
}

gulp.task('scripts', runBrowserify());
