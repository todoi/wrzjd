var srcAssets = './src'
var destAssets = './dist'
var fileName = 'dragonLantern'

module.exports = {
  sprites: {
    src: srcAssets + '/optimization/images/sprites/*.png',
    dest: {
      css: destAssets + '/optimization/css/sprites/',
      image: destAssets + '/optimization/images/sprites/'
    },
    options: {
      cssName: '_sprites.scss',
      cssFormat: 'sass',
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
      imgPath: destAssets + '/optimization/images/sprites/icon-sprite.png'
    }
  },
  images: {
    src: srcAssets + '/images/' + fileName + '/**/*',
    dest: destAssets + '/images'
  },
  javascript: {
    src: srcAssets + '/js/' + fileName + '.js'
  }
}
