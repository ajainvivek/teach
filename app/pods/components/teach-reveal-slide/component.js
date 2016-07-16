import Ember from 'ember';

const {
  $,
  inject
} = Ember;

export default Ember.Component.extend({
  slideService: inject.service('slide-service'),
  data: [],
  config: {},
  didInsertElement: function () {
    let self=this;
    let config = this.get('config');
    Reveal.initialize({
      center: false,
      parallaxBackgroundImage: 'images/zombie_attack.jpg',
      parallaxBackgroundSize: '2100px 900px',
      parallaxBackgroundHorizontal: 200,
      parallaxBackgroundVertical: 50,
      controls: config.isPresenter,
      keyboard: config.isPresenter,
      touch: config.isPresenter,
      dependencies: [
        // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
        { src: 'reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        // Interpret Markdown in <section> elements
        { src: 'reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },

        // Syntax highlight for <code> elements
        { src: 'reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },

        // Zoom in and out with Alt+click
        { src: 'reveal.js/plugin/zoom-js/zoom.js', async: true },

        // Speaker notes
        { src: 'reveal.js/plugin/notes/notes.js', async: true },

        // MathJax
        { src: 'reveal.js/plugin/math/math.js', async: true }
      ]
    });

    Reveal.addEventListener( 'slidechanged', function( event ) {
      let slideService = self.get('slideService');
      slideService.setSlideId($(event.currentSlide).attr('slide'));
      if($(event.currentSlide).attr('type') === 'qs'){
        self.sendAction('slideQuestion');
      }else{
        self.sendAction('slideInfo');
      }
    });
  }
});
