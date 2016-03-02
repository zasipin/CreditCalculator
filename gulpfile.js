var gulp = require('gulp'),
    minifyCss = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    paths = {
      css: ['app/css/app.css'],
      script: ['app/js/app.js', 'app/js/services.js', 'app/js/services/creditBoard.js',
              'app/js/services/creditCalculator.js', 'app/js/services/creditCount.js',
              'app/js/controllers.js', 'app/js/filters.js', 'app/js/directives.js',
              'app/js/directives/**/*.js',
              'app/js/gAnalytics.js', 'app/js/yaMetrics.js'
             ],
      html: ['app/index.html'],    
      htmlPartials: ['app/partials/*.html'],
      htmlDirectivesPartials: ['app/js/directives/**/*.html'],
      bowerComponents: ['app/bower_components/**/*.*'],
      img: ['app/img/**/*.*']    
    };
              
gulp.task('mincss', function(){
  return gulp.src(paths.css)
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));    
});

gulp.task('scripts', function(){
  return gulp.src(paths.script)
          .pipe(uglify())  
          .pipe(concat('app.js'))
          .pipe(gulp.dest('dist/js/'));
});

gulp.task('htmls', function(){
  return gulp.src(paths.html)
          .pipe(gulp.dest('dist/'));
});

gulp.task('htmlPartials', function(){
  return gulp.src(paths.htmlPartials)
          .pipe(gulp.dest('dist/partials/'));
});

gulp.task('htmlDirectivesPartials', function(){
  return gulp.src(paths.htmlDirectivesPartials)
          .pipe(gulp.dest('dist/directives/'));
});

gulp.task('bowerComponents', function(){
  return gulp.src(paths.bowerComponents)
          .pipe(gulp.dest('dist/bower_components/'));
});

gulp.task('img', function(){
  return gulp.src(paths.img)
          .pipe(gulp.dest('dist/img'));
});

gulp.task('copyFiles', ['htmls', 'htmlPartials', 'bowerComponents', 'img', 'htmlDirectivesPartials']);


gulp.task('watcher',function(){
    gulp.watch(paths.css, ['mincss']);
    gulp.watch(paths.script, ['scripts']);
});

gulp.task('default', ['mincss','scripts', 'copyFiles','watcher']);