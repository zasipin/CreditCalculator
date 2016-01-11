var gulp = require('gulp');
var minifyCss = require('gulp-cssnano');

var paths = {
  css:['app/css/app.css'],
  script:['app/js/*]
};
;

gulp.task('mincss', function(){
  return gulp.src(paths.css)
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));    
});

gulp.task('scripts', function(){
  return gulp.src(paths.script)
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('watcher',function(){
    gulp.watch(paths.css, ['mincss']);
    gulp.watch(paths.script, ['scripts']);
});

gulp.task('default', ['mincss','scripts', 'watcher']);