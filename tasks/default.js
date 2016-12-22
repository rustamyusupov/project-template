import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('styles:dependencies', () => (
  runSequence(
    'sprites',
    'icons',
    'copy',
    'styles'
  )
));

gulp.task('default', () => (
  runSequence(
    [
      'styles:dependencies',
      'pages'
    ],
    'server',
    'watch'
  )
));

gulp.task('build', () => (
  runSequence(
    'styles:dependencies',
    'scripts',
    'copy',
    'pages'
  )
));
