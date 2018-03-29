var folder = 'quiz'
var isSeparate = false
var mvMedia = false
var srcAssets = 'src/pages/' + folder
var commonAssets = 'src/common'
var destAssets = 'dist'

module.exports = {
  sprites: {
    src:  srcAssets + '/images/sprites/*.png',
    dest: {
      css: srcAssets + '/sass/',
      image: srcAssets + '/images/'
    },
    options: {
      cssName: '_sprites.scss',
      cssFormat: 'scss',
      padding: 2,
      cssOpts: {
        cssClass: function (item) {
          // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
          if (item.name.indexOf('-hover') !== -1) {
            return '.icon-' + item.name.replace('-hover', ':hover');
            // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
          } else {
            return '.icon-' + item.name;
          }
        }
      },
      imgName: 'icon-sprite.png',
      // scss 文件中图片的路径
      imgPath: './images/icon-sprite.png'
    }
  },
  images: {
    src: srcAssets + '/images/' + '/*',
    destFolder: destAssets + '/images' + (isSeparate ? '/quiz' : ''),
    common: commonAssets + '/images/**/*',
    commonDest: destAssets + '/images'
  },
  javascript: {
    src: srcAssets + '/js/**/*',
    common: commonAssets + '/js/**/*',
    dest: destAssets + '/js'
  },
  sass: {
    src: srcAssets + '/sass/**/*',
    common: commonAssets + '/sass/**/*',
    dest: destAssets + '/css',
    // nested | expanded | compact | compressed
    compileStyle: ['compressed', 'compact', 'nested', 'expanded']
  },
  html: {
    src: srcAssets + '/*.html',
    dest: destAssets
  },
  media: {
    mvMedia: mvMedia,
    src: srcAssets + '/media/**/*',
    dest: destAssets + '/media'
  }
}
