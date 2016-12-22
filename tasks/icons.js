import gulp from 'gulp';
import svgSymbols from 'gulp-svg-symbols';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';

gulp.task('icons', () => (
  gulp.src('app/icons/**/*.svg')
    .pipe(plumber({errorHandler: errorHandler('Error in \'icons\' task')}))
    .pipe(svgSymbols({
      title: false,
      id: 'icon_%f',
      templates: ['default-svg']
    }))
    .pipe(rename('icon.svg'))
    .pipe(gulp.dest('dist/assets/images/'))
));
