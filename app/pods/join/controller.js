import Ember from 'ember';

const {
  inject,
  Controller
} = Ember;

export default Controller.extend({
  name: '',
  slide: inject.controller('slide'),
  webrtc: inject.service('webrtc'),
  actions : {
    join () {
      let webrtc = this.get('webrtc');
      let slideContext = this.get('slide');
      let broadcastData = slideContext.broadcastData;
      let name = this.get('name');
      let slideData = {
        users : [{
          name : name,
          id : 1,
          isPresenter: false
        }]
      };
      webrtc.initialize(slideData, broadcastData.bind(slideContext));
      this.transitionTo('slide');
    }
  }
});
