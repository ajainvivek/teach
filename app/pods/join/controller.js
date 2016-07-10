import Ember from 'ember';

export default Ember.Controller.extend({
  name: '',
  actions : {
    join () {
      this.transitionTo('slide');
    }
  }
});
