import Ember from 'ember';

const {
  $,
  inject
} = Ember;

export default Ember.Component.extend({
  slideService: inject.service('slide-service'),
  data: '',
  didInsertElement: function () {
    let self=this;
    Reveal.initialize({
      center: false,
      parallaxBackgroundImage: 'http://revelwallpapers.net/d/3634754B6D354C63334E6D37676F35397947796475734C5134724F5461413D3D/the-walking-dead-season-4-boy-telltale-games-zombie-field-hd.jpg',
      parallaxBackgroundSize: '2100px 900px',
      parallaxBackgroundHorizontal: 200,
      parallaxBackgroundVertical: 50
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
