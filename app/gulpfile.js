// const concat = require('gulp-concat') //合并文件
const gulp = require('gulp'); //基础库
const clean = require('gulp-clean') //清空文件夹
const sourcemaps = require('gulp-sourcemaps') //生成SourceMap
const rename = require('gulp-rename') //重命名
const runSequence = require('run-sequence') //顺序执行任务
const merge = require('gulp-merge')
const reveasy = require('gulp-rev-easy') //添加版本号

//html
const htmlhint = require('gulp-htmlhint') //html检查
const htmlmin = require('gulp-htmlmin') //压缩html

// css
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer') //自动补全前缀
const minifycss = require('gulp-minify-css') //css压缩
const csslint = require('gulp-csslint') //css检查

// images
const imagemin = require('gulp-imagemin') //图片压缩
const jpegtran = require('imagemin-jpegtran');
const pngquant = require('imagemin-pngquant');
const smushit = require('gulp-smushit');
const spritesmith = require('gulp.spritesmith')

// js
const eslint = require('gulp-eslint') //js检查
const uglify = require('gulp-uglify') //js压缩
const babel = require('gulp-babel')
const color = require('cli-color')
const browserSync = require('browser-sync').create()

// 配置文件
const configOptions = require('./gulp-option')

gulp.task('build', function() {
  runSequence('clean', ['build-html', 'build-css', 'build-images', 'build-js'])
});

//清空dist
gulp.task('clean', function() {
  return gulp.src('dist/*', {read: false }) .pipe(clean());
});

//部署版css
gulp.task('build-css', function() {
  var cssSrc = configOptions.sass.src,
    compileStyle = configOptions.sass.compileStyle[0],
    cssDest = configOptions.sass.dest

  return gulp.src(cssSrc)
    .pipe(sass({
      style: compileStyle
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'IE 6'],
      // browsers: ['last 2 versions', 'Android >= 4.0'],
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
  var htmlSrc = configOptions.html.src,
    htmlDest = configOptions.html.dest

  return gulp.src(htmlSrc)
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter())
    .pipe(gulp.dest(htmlDest))
    .pipe(reveasy())
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest(htmlDest))
})

//部署images
gulp.task('build-images', function() {
  var imgSrc = configOptions.images.src,
    imgDest = configOptions.images.destFolder,
    commonSrc = configOptions.images.common,
    commonDest = configOptions.images.commonDest

  var mvTargetImages = gulp.src(imgSrc)
    .pipe(smushit({
      verbose: true
    }))
    // .pipe(imagemin({
    //     progressive: true,
    //     use: [pngquant(), jpegtran()]
    // }))
    .pipe(gulp.dest(imgDest));

  var mvCommonImages = gulp.src(commonSrc)
    .pipe(imagemin({
        progressive: true,
        use: [pngquant(), jpegtran()]
    }))
    .pipe(gulp.dest(commonDest))

  return merge(mvTargetImages, mvCommonImages)
})

// 部署版js
gulp.task('build-js', function() {
  var jsSrc = configOptions.javascript.src,
    jsDest = configOptions.javascript.dest,
    commonSrc = configOptions.javascript.common

  var mainJs = gulp.src(jsSrc)
    //.pipe(concat('main.js'))
    //.pipe(gulp.dest(jsDst))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(jsDest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    // .pipe(concat("main.js"))
    .pipe(gulp.dest(jsDest))

  var vendorJs = gulp.src(commonSrc)
    .pipe(gulp.dest(jsDest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    //.pipe(concat("vendor.js"))
    .pipe(gulp.dest(jsDest))

  return merge(mainJs, vendorJs);
});

//移动js
gulp.task('mv-js', function() {
  var jsSrc = configOptions.javascript.src,
    jsDest = configOptions.javascript.dest,
    commonSrc = configOptions.javascript.common

  var mainJs = gulp.src(jsSrc)
    .pipe(gulp.dest(jsDest))
    .pipe(browserSync.stream())

  var vendorJs = gulp.src(commonSrc)
    .pipe(gulp.dest(jsDest))

  return merge(mainJs, vendorJs)
});

//移动图片
gulp.task('mv-images',['sprites'], function() {
  var imgSrc = configOptions.images.src,
    imgDest = configOptions.images.destFolder,
    commonSrc = configOptions.images.common,
    commonDest = configOptions.images.commonDest

  var mvTargetImages = gulp.src(imgSrc)
    .pipe(gulp.dest(imgDest))
    .pipe(browserSync.stream())

  var mvCommonImages = gulp.src(commonSrc)
    .pipe(gulp.dest(commonDest))
    .pipe(browserSync.stream())

  return merge(mvTargetImages, mvCommonImages)
});

gulp.task('mv-media', function() {
  if (!configOptions.media.mvMedia){
    return
  }else{
    var mediaSrc = configOptions.media.src,
      mediaDest = configOptions.media.dest
    gulp.src(mediaSrc)
      .pipe(gulp.dest(mediaDest))
      .pipe(browserSync.stream())
  }
});


//移动html
gulp.task('mv-html', function() {
  var htmlSrc = configOptions.html.src,
    htmlDest = configOptions.html.dest

  return gulp.src(htmlSrc)
    .pipe(gulp.dest(htmlDest))
    .pipe(browserSync.stream())
});

//移动css
gulp.task('mv-css', ['sprites'], () => {
  var cssSrc = configOptions.sass.src,
    compileStyle = configOptions.sass.compileStyle[1],
    sourcemapsDest = './maps',
    cssDest = configOptions.sass.dest
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

// 生成雪碧图
gulp.task('sprites', function() {
  var configOption = configOptions.sprites
  var spriteData = gulp.src(configOption.src).pipe(spritesmith(configOption.options));

  console.log(color.yellow.bold('sprites 的source 目录:', configOption.src))
  console.log(color.red.bold('sprites 的dist 目录:', configOption.dest.image))
  console.log(color.red.bold('sprites 的scss 目录:', configOption.dest.css))

  var imgStream = spriteData.img
    .pipe(gulp.dest(configOption.dest.image))
    .pipe(browserSync.stream())

  var cssStream = spriteData.css
    .pipe(gulp.dest(configOption.dest.css))
    .pipe(browserSync.stream())

  return merge(imgStream, cssStream);
});

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  runSequence('clean', ['mv-images', 'mv-media', 'mv-html', 'mv-css', 'mv-js'])
});

gulp.task('serve', function() {
  runSequence('clean', 'sprites', ['default'], 'browserSync')
  var watcher1 = gulp.watch(configOptions.javascript.src, ['mv-js']);
  var watcher2 = gulp.watch(configOptions.sass.src, ['mv-css']);
  var watcher3 = gulp.watch(configOptions.html.src, ['mv-html']);
  var watcher4 = gulp.watch(configOptions.images.src, ['mv-images']);
  var watcher5 = gulp.watch(configOptions.media.src, ['mv-media']);

  watcher1.on('change', function(event) {
    console.log(color.blue.bgWhite('脚本 文件更改'))
    console.log(color.blue.bgWhite('File1 path:' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  watcher2.on('change', function(event) {
    console.log(color.red('样式 文件更改'))
    console.log(color.red('File2 path' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  watcher3.on('change', function(event) {
    console.log(color.green('HTML 文件更改'))
    console.log(color.green('File3 path' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  watcher4.on('change', function(event) {
    console.log(color.yellow('图片 文件改变'))
    console.log(color.yellow('File4 path' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  watcher5.on('change', function(event) {
    console.log(color.magenta('媒体文件 文件改变'))
    console.log(color.magenta('File4 path' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  // gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('default-watch', function() {
  runSequence('clean', 'sprites', ['default'])
  var watcher1 = gulp.watch(configOptions.javascript.src, ['mv-js']);
  var watcher2 = gulp.watch(configOptions.sass.src, ['mv-css']);
  var watcher3 = gulp.watch(configOptions.html.src, ['mv-html']);
  var watcher4 = gulp.watch(configOptions.images.src, ['mv-images']);
  var watcher5 = gulp.watch(configOptions.media.src, ['mv-media']);

  watcher1.on('change', function(event) {
    console.log(color.blue.bgWhite('脚本 文件更改'))
    console.log(color.blue.bgWhite('File1 path:' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  watcher2.on('change', function(event) {
    console.log(color.red('样式 文件更改'))
    console.log(color.red('File2 path' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  watcher3.on('change', function(event) {
    console.log(color.green('HTML 文件更改'))
    console.log(color.green('File3 path' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  watcher4.on('change', function(event) {
    console.log(color.yellow('图片 文件改变'))
    console.log(color.yellow('File4 path' + event.path + ' was ' + event.type + ', running tasks...'));
  })
  watcher5.on('change', function(event) {
    console.log(color.purple('媒体文件 文件改变'))
    console.log(color.purple('File4 path' + event.path + ' was ' + event.type + ', running tasks...'));
  })
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: './dist',
    port: 8080
  });
})


// 压缩图片
gulp.task('smushit', function() {
  return gulp.src('./src/minify/images/*')
    .pipe(smushit({
      verbose: true
    }))
    .pipe(gulp.dest('./dist/minify/images'));
});

// 压缩css
gulp.task('minifycss', function() {
  return gulp.src('./src/minify/css/*.css')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/minify/css/'))
})

