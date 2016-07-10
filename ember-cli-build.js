/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-foundation-sass': {
      'modernizr': true,
      'fastclick': true,
      'foundationJs': 'all'
    },
    'sassOptions': { //include foundation scss
      'includePaths': [
        'bower_components/foundation/scss'
      ]
    }
  });

  app.import('bower_components/owl.carousel/dist/assets/owl.carousel.min.css');
  app.import('bower_components/owl.carousel/dist/owl.carousel.min.js');

  app.import('bower_components/reveal.js/css/reveal.css');
  app.import('bower_components/reveal.js/css/theme/white.css');
  app.import('bower_components/reveal.js/lib/js/head.min.js');
  app.import('bower_components/reveal.js/js/reveal.js');
  app.import('vendor/highlightjs/themes/zenburn.css');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/moment/moment.js');
  return app.toTree();
};
