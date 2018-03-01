const gulp = require('gulp'); //基础库
const clean = require('gulp-clean') //清空文件夹
const sourcemaps = require('gulp-sourcemaps') //生成SourceMap
// const reveasy = require('gulp-rev-easy') //添加版本号
const rename = require('gulp-rename') //重命名
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
const jpegtran = require('imagemin-jpegtran');
const pngquant = require('imagemin-pngquant');
const smushit = require('gulp-smushit');
const spritesmith = require('gulp.spritesmith')

const eslint = require('gulp-eslint') //js检查
const uglify = require('gulp-uglify') //js压缩
const babel = require('gulp-babel')
const color = require('cli-color')
const browserSync = require('browser-sync').create()

const configOptions = require('./gulp-option')

gulp.task('build', function() {
  // 将你的默认的任务代码放在这
  runSequence('clean', ['build-html', 'build-css', 'build-images', 'build-js'])
});

//清空dist
gulp.task('clean', function() {
  return gulp.src('dist/*', {
      read: false
    })
    .pipe(clean());
});

//部署版css
gulp.task('build-css', function(e) {
  var cssSrc = "src/sass/**/*.scss",
    compileStyle = 'compressed',
    cssDest = './dist/css'

  return gulp.src(cssSrc)
    .pipe(sass({
      style: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      // browsers: ['> 1%', 'IE 6'],
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: false
    }))
    .pipe(gulp.dest(cssDest))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(cssDest));
});

//部署版html
gulp.task('build-html', [], function() {
  // var htmlSrc = 'src/.html',
  var htmlSrc = 'src/index.html',
    htmlDest = 'dist'

  return gulp.src(htmlSrc)
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter())
    .pipe(gulp.dest(htmlDest))
    // .pipe(reveasy())
    // .pipe(htmlmin({
    //     collapseWhitespace: true
    // }))
    .pipe(gulp.dest(htmlDest))
})

//部署images
gulp.task('build-images', function() {
  var imgOptions = configOptions.images
  var imgSrc = imgOptions.src,
    imgDest = imgOptions.dest;

  return gulp.src(imgSrc)
    .pipe(imagemin({
        progressive: true,
        use: [pngquant(), jpegtran()]
    }))
    .pipe(gulp.dest(imgDest));
})

// 部署版js
gulp.task('build-js', function() {
  var mainSrc = configOptions.javascript.src,
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
gulp.task('mv-js', function() {
  // var mainSrc = './src/js/*.js',
  var mainSrc = configOptions.javascript.src,
    mainDest = './dist/js/',
    appSrc = './src/js/vendor/*.js',
    appDest = './dist/js/vendor/';

  var mainJs = gulp.src(mainSrc)
    .pipe(gulp.dest(mainDest))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(browserSync.stream())

  var vendorJs = gulp.src(appSrc)
    .pipe(gulp.dest(appDest))

  return merge(mainJs, vendorJs)
});

//移动图片
gulp.task('mv-images', function() {
  var imgSrc = configOptions.images.src,
    imgDest = 'dist/images';

  return gulp.src(imgSrc)
    .pipe(gulp.dest(imgDest))
    .pipe(browserSync.stream())
});

//移动html
gulp.task('mv-html', function() {
  // var htmlSrc = 'src/*.html',
  var htmlSrc = 'src/index.html',
    htmlDest = 'dist';

  gulp.src(htmlSrc)
    .pipe(gulp.dest(htmlDest))
});

//移动css
gulp.task('mv-css', [], () => {
  var cssSrc = "src/sass/**/*.scss",
    compileStyle = 'compact',
    sourcemapsDest = './maps',
    cssDest = 'dist/css'
  // nested | expanded | compact | compressed
  return gulp.src(cssSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: compileStyle
    }).on('error', sass.logError))
    .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: sourcemapsDest
    }))
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.stream())
})

//监听移动css
gulp.task('mv-css:watch', () => {
  gulp.watch('src/sass/**/*.scss', ['sass'])
})

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  runSequence('clean', ['mv-html', 'mv-css', 'mv-images', 'mv-js'])
});

gulp.task('serve', function() {

  runSequence('clean', ['mv-html', 'mv-css', 'mv-images', 'mv-js'], 'browserSync')
  var watcher1 = gulp.watch('src/js/*.js', ['mv-js']);
  var watcher2 = gulp.watch('src/sass/**/*.scss', ['mv-css']);
  var watcher3 = gulp.watch('src/*.html', ['mv-html']);
  var watcher4 = gulp.watch('src/images/**/*', ['mv-images']);

  watcher1.on('change', function(event) {
    console.log(color.blue.bgWhite('脚本 文件更改'))
    console.log('File1 path:' + event.path + ' was ' + event.type + ', running tasks...');
  })
  watcher2.on('change', function(event) {
    console.log(color.red('样式 文件更改'))
    console.log('File2 path' + event.path + ' was ' + event.type + ', running tasks...');
  })
  watcher3.on('change', function(event) {
    console.log(color.green('HTML 文件更改'))
    console.log('File3 path' + event.path + ' was ' + event.type + ', running tasks...');
  })
  watcher4.on('change', function(event) {
    console.log(color.yellow('图片 文件改变'))
    console.log('File4 path' + event.path + ' was ' + event.type + ', running tasks...');
  })
  gulp.watch("dist/*.html").on('change', browserSync.reload);
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: './dist',
    port: 8080
  });
})

// 生成雪碧图
gulp.task('sprites', function() {
  var configOption = configOptions.sprites
  var spriteData = gulp.src(configOption.src).pipe(spritesmith(configOption.options));

  spriteData.img
    .pipe(gulp.dest(configOption.dest.image));

  spriteData.css
    .pipe(gulp.dest(configOption.dest.css));
});

// 压缩图片
gulp.task('smushit', function() {
  return gulp.src('./src/optimization/images/minify/*')
    .pipe(smushit({
      verbose: true
    }))
    .pipe(gulp.dest('./dist/optimization/images/minify/'));
});

// 压缩css
gulp.task('minifycss', function() {
  return gulp.src('./src/optimization/css/*.css')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/optimization/css/'))
})
