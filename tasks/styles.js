import gulp from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sorting from 'postcss-sorting';
import gcmq from 'gulp-group-css-media-queries';
import csso from 'gulp-csso';
import rename from 'gulp-rename';

const isDev = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => (
  gulp.src('app/styles/*.scss')
    .pipe(plumber({errorHandler: errorHandler('Error in \'styles\' task')}))
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer,
      sorting
    ]))
    .pipe(gulpIf(!isDev, gcmq()))
    .pipe(gulpIf(!isDev, csso()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/styles'))
));
