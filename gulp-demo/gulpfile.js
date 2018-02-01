const gulp = require('gulp');
const sass = require('gulp-sass')

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});

gulp.task('watch', function(){
    return gulp.watch('js/**/*.js', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('sass', [], ()=>{
    return gulp.src('./sass/**/*.scss')
    // nested | expanded | compact | compressed
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
})

gulp.task('sass:watch', ()=>{
    gulp.watch('./sass/**/*.scss', ['sass'])
})


