import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function () {
    Reveal.initialize({
      center: false
    });
  }
});
