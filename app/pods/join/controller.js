import Ember from 'ember';

const {
  inject,
  Controller
} = Ember;

export default Controller.extend({
  name: '',
  slide: inject.controller('slide'),
  webrtc: inject.service('webrtc'),
  isPresenter: false,
  ajax: Ember.inject.service(),
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
      let slideId = this.get('slideId');
      let slideData = this.get('data');
      slideData.users = [{
        id : guid,
        name : name,
        isPresenter: isPresenter
      }];

      if (isPresenter) {
        let slide = this.get('slide');
        let tracker = webrtc.initialize({
          data: slideData,
          callback: publishData.bind(slideContext),
          random: true,
          onPeerConnect: slide.onPeerConnected.bind(slide)
        });
        var newPresentation = this.store.createRecord('presentation', {
          name: name,
          slideId: slideId,
          infoHash: tracker.infoHash,
          timestamp: new Date().getTime()
        });
        let ref = firebase.database().ref('presentations/' + newPresentation.id);
        ref.onDisconnect().remove(function (data) {
          console.log(data);
        });
        newPresentation.save();
      } else {
        let slide = this.get('slide');
        webrtc.initialize({
          data: slideData,
          callback: publishData.bind(slideContext),
          random: true,
          onPeerConnect: slide.onPeerConnected.bind(slide),
          infoHash: slideData.infoHash
        });
      }

      this.transitionTo('slide', {
        queryParams: {
          id: slideId,
          isPresenter: isPresenter,
          name: name,
          userId: guid
        }
      });
    }
  }
});
