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
  ajax: Ember.inject.service(),
  getData: function () {
    return this.get('ajax').request('/data/es6_ep1.json');
  },
  loadSlideData: function() {
    let slide = this.get('slide');
    this.getData().then(function (data) {
      slide.set('data', data);
      slide.set('slides', data.slides);
    });
  },
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
      let slideData = this.get('data');
      slideData.users = [{
        id : guid,
        name : name,
        isPresenter: isPresenter
      }];

      if (isPresenter) {
        let tracker = webrtc.initialize({
          data: slideData,
          callback: publishData.bind(slideContext),
          random: true
        });
        landing.broadcastPresentation.call(landing, [{
          id : slideId,
          name : name,
          isPresenter: isPresenter,
          userPeerId: userPeerId,
          infoHash: tracker.infoHash
        }]);
      } else {
        let infoHash = this.get('infoHash');
        webrtc.initialize({
          data: slideData,
          callback: publishData.bind(slideContext),
          random: true,
          infoHash: infoHash
        });
      }

      let infoHash = this.get('infoHash');
      this.transitionTo('slide', {
        queryParams: {
          id: slideId,
          isPresenter: isPresenter,
          name: name,
          userId: guid,
          infoHash: infoHash
        }
      });
    }
  }
});
