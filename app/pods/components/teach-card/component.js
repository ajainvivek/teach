import Ember from 'ember';

const {
  $,
  run
} = Ember;

export default Ember.Component.extend({
  data : [],
  category : "",
  didInsertElement : function () {
      $('.owl-carousel').owlCarousel({
        autoWidth : true
      });
  },
  onDataChange : function () {
    let $owl = $('.owl-carousel');
    $owl.owlCarousel('destroy');
    run.later(function () {
      $owl.owlCarousel({
        autoWidth : true
      });
    }, 500);
  }.observes('data'),
  actions: {
    present (id) {
      this.sendAction('present', id);
    },
    view (id) {
      this.sendAction('view', id);
    }
  }
});
