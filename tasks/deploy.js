import gulp from 'gulp';
import ghpages from 'gulp-gh-pages';

gulp.task('deploy', () => (
  gulp.src('dist/**/*')
    .pipe(ghpages())
));
