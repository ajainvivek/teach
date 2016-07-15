import Ember from 'ember';

const {
  $
} = Ember;

export default Ember.Component.extend({
  data : [],
  category : "",
  didInsertElement : function () {
      $('.owl-carousel').owlCarousel({
        autoWidth : true
      });
  },
  actions: {
    present (id) {
      this.sendAction('present', id);
    },
    view (id) {
      this.sendAction('view', id);
    }
  }
});
