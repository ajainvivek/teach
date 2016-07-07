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
      center: false
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
