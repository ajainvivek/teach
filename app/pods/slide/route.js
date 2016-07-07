import Ember from 'ember';
import config from '../../config/config';

export default Ember.Route.extend({

  setupController: function(controller){
    controller.set('data', config.data);
  }
});
