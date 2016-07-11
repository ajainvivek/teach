import Ember from 'ember';

const {
  inject,
  Controller
} = Ember;

export default Controller.extend({
  name: '',
  slide: inject.controller('slide'),
  webrtc: inject.service('webrtc'),
  guid : function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }.property(),
  actions : {
    join () {
      let webrtc = this.get('webrtc');
      let slideContext = this.get('slide');
      let publishData = slideContext.publishData;
      let name = this.get('name');
      let guid = this.get('guid');
      let slideData = {
        users : [{
          id : guid,
          name : name,
          isPresenter: false
        }]
      };
      webrtc.initialize(slideData, publishData.bind(slideContext));
      this.transitionTo('slide');
    }
  }
});
