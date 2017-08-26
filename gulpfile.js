var gulp = require('gulp');
var bump = require('gulp-bump');

gulp.task('bump', function onBump() {
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});
