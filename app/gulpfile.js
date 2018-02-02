const gulp = require('gulp'); //基础库
const clean = require('gulp-clean') //清空文件夹
const sourcemaps = require('gulp-sourcemaps') //生成SourceMap
const reveasy = require('gulp-rev-easy') //添加版本号
const rename = require('gulp-rename')  //重命名
const concat = require('gulp-concat') //合并文件
const runSequence = require('run-sequence') //顺序执行任务
const merge = require('gulp-merge')

const htmlhint = require('gulp-htmlhint') //html检查
const htmlmin = require('gulp-htmlmin') //压缩html

const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer') //自动补全前缀
const minifycss = require('gulp-minify-css') //css压缩
const csslint = require('gulp-csslint') //css检查

const imagemin = require('gulp-imagemin') //图片压缩

const eslint = require('gulp-eslint') //js检查
const uglify = require('gulp-uglify') //js压缩
const babel = require('gulp-babel')

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  runSequence('clean', ['mv-html', 'mv-css', 'mv-images', 'mv-js'])
});

gulp.task('watch', function(){
    //
});

gulp.task('build', function() {
  // 将你的默认的任务代码放在这
  runSequence('clean', ['build-html', 'build-css', 'build-images', 'build-js'])
});

//清空dist
gulp.task('clean', function(){
  return gulp.src('dist/*', { read:false })
    .pipe(clean());
});

//部署版css
gulp.task('build-css', function(e) {
    var cssSrc = "src/sass/**/*.scss",
      compileStyle = 'compressed',
      cssDest = 'dist/css'

      return sass(cssSrc, { style: 'compressed'})
        .on('error', sass.logError)
        .pipe(autoprefixer({
            // browsers: ['> 1%', 'IE 6'],
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDest));
});

//部署版html
gulp.task('build-html',[], function(){
    var htmlSrc = 'src/**/*.html',
      htmlDest = 'dist'

    return gulp.src(htmlSrc)
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
        .pipe(gulp.dest(htmlDest))
        .pipe(reveasy())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(htmlDest))
})

//
gulp.task('build-images', function() {
    var imgSrc = './src/images/**/*',
        imgDest = './dist/images';

    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDest));
})

// 部署版js
gulp.task('build-js', function() {
    var mainSrc = './src/js/*.js',
        mainDest = './dist/js/',
        appSrc = './src/js/vendor/*.js',
        appDest = './dist/js/vendor/';

    var mainJs = gulp.src(mainSrc)
        //.pipe(concat('main.js'))
        //.pipe(gulp.dest(jsDst))
        //.pipe(rename({ suffix: '.min' }))
        // .pipe(eslint.failAfterError())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        // .pipe(concat("main.js"))
        .pipe(gulp.dest(mainDest));

    var vendorJs = gulp.src(appSrc)
        .pipe(uglify())
        //.pipe(concat("vendor.js"))
        .pipe(gulp.dest(appDest));

    return merge(mainJs, vendorJs)
});

//移动js
gulp.task('mv-js', function(){
    var mainSrc = './src/js/*.js',
        mainDest = './dist/js/',
        appSrc = './src/js/vendor/*.js',
        appDest = './dist/js/vendor/';

    var mainJs = gulp.src(mainSrc)
    .pipe(gulp.dest(mainDest))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

    var vendorJs = gulp.src(appSrc)
    .pipe(gulp.dest(appDest))

    return merge(mainJs, vendorJs)
});

//移动图片
gulp.task('mv-images',function(){
    var imgSrc = './src/images/**/*',
        imgDest = './dist/images';

    gulp.src(imgSrc)
    .pipe(gulp.dest(imgDest))
});

//移动图片
gulp.task('mv-html',function(){
    var htmlSrc = './src/**/*.html',
        htmlDest = './dist';

    gulp.src(htmlSrc)
    .pipe(gulp.dest(htmlDest))
});

//移动css
gulp.task('mv-css', [], ()=>{
    var cssSrc = "src/sass/**/*.scss",
      compileStyle = 'compact',
      sourcemapsDest = './maps'
      cssDest = 'dist/css'
    // nested | expanded | compact | compressed
    return gulp.src(cssSrc)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: compileStyle}).on('error', sass.logError))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(sourcemaps.write('maps',{
            includeContent: false,
            sourceRoot: sourcemapsDest
        }))
        .pipe(gulp.dest(cssDest))
})

//监听移动css
gulp.task('mv-css:watch', ()=>{
    gulp.watch('src/sass/**/*.scss', ['sass'])
})

