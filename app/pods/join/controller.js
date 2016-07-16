import Ember from 'ember';

const {
  inject,
  Controller
} = Ember;

export default Controller.extend({
  name: '',
  slide: inject.controller('slide'),
  landing: inject.controller('landing'),
  webrtc: inject.service('webrtc'),
  isPresenter: false,
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
      let isPresenter = this.get('isPresenter');
      let landing = this.get('landing');
      let slideId = this.get('slideId');
      let userPeerId = this.get('userPeerId');
      let slideData = {
        users : [{
          id : guid,
          name : name,
          isPresenter: isPresenter
        }]
      };
      if (isPresenter) {
        landing.broadcastPresentation.call(landing, [{
          id : slideId,
          name : name,
          isPresenter: isPresenter,
          userPeerId: userPeerId
        }]);
      }
      // webrtc.initialize({
      //   data: slideData,
      //   callback: publishData.bind(slideContext),
      //   random: false
      // });
      this.transitionTo('slide', {
        queryParams: {
          id: slideId
        }
      });
    }
  }
});
