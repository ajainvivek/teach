import Ember from 'ember';

export default Ember.Controller.extend({
  webrtc: Ember.inject.service('webrtc'),
  init : function () {
    let webrtc = this.get('webrtc');
    webrtc.initialize();
  },
  actions: {
    addUser : function () {
      let webrtc = this.get('webrtc');
      let user = {
        name : "test",
        id : "hello"
      };
      webrtc.broadcast(user);
    }
  }
});
