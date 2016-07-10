import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    hostPresentation () {
      this.transitionTo('join');
    },
    goToSlide () {
      this.transitionTo('slide');
    }
  }
});
