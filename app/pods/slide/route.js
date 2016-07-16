import Ember from 'ember';
import config from '../../config/config';

export default Ember.Route.extend({

  setupController: function(controller, model, transition){
    if (transition.queryParams.id) {
      controller.set('data', config.data);
      controller.set('user', transition.queryParams);
      controller.set('config', {
        isPresenter: transition.queryParams.isPresenter
      });
    } else {
      controller.transitionTo('landing');
    }
  }
});
