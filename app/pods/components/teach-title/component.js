import Ember from 'ember';

const {
  $
} = Ember;

export default Ember.Component.extend({
  
  didInsertElement : function () {
      $('.owl-carousel').owlCarousel();
  }
});
