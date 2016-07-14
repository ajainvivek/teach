import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    joinPresentation () {
      this.transitionTo('join', {
        queryParams: {
          isPresenter: false
        }
      });
    },
    hostPresentation () {
      this.transitionTo('join', {
        queryParams: {
          isPresenter: true
        }
      });
    },
    goToSlide () {
      this.transitionTo('slide');
    }
  }
});
