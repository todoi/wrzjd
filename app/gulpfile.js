const gulp = require('gulp');
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});

gulp.task('watch', function(){
    return gulp.watch('src/js/**/*.js', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('sass', [], ()=>{
    // nested | expanded | compact | compressed
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('sass:watch', ()=>{
    gulp.watch('src/sass/**/*.scss', ['sass'])
})


