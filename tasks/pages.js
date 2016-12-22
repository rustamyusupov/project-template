import gulp from 'gulp';
import changed from 'gulp-changed';

gulp.task('pages', () => (
  gulp.src('app/pages/**/*.html')
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'))
));
