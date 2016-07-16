import Ember from 'ember';
import config from '../../config/config';

export default Ember.Route.extend({

  setupController: function(controller, model, transition){
    if (transition.queryParams.id) {
      controller.set('data', config.data);
    } else {
      controller.transitionTo('landing');
    }
  }
});
