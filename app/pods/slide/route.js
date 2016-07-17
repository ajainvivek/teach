import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model, transition){
    if (transition.queryParams.id) {
      controller.set('user', transition.queryParams);
      controller.set('config', {
        isPresenter: transition.queryParams.isPresenter
      });
    } else {
      controller.transitionTo('landing');
    }
  }
});
