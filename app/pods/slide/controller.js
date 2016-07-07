import Ember from 'ember';

export default Ember.Controller.extend({
  webrtc: Ember.inject.service('webrtc'),
  init : function () {
    console.log(this.get('webrtc').getClient());
  }
});
