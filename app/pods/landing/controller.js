import Ember from 'ember';
import _collection from 'lodash/collection';
import _array from 'lodash/array';

const {
  inject,
  Controller
} = Ember;

export default Controller.extend({
  featuredSlides: [],
  liveSlides: [],
  webrtc: inject.service('webrtc'),
  isLiveSlidesFilled: function () {
    let liveSlides = this.get('liveSlides');
    return (liveSlides.length > 0) ? true : false;
  }.property('liveSlides'),
  isFeaturedSlidesFilled: function () {
    let featuredSlides = this.get('featuredSlides');
    return (featuredSlides.length > 0) ? true : false;
  }.property('liveSlides'),
  loadData: function () {
    let self = this;
    let publishPresentation = this.get('publishPresentation');
    let presentations = [{
      "id": "1",
      "slideTemplate": "url",
      "title": "ES6 - Zombie Attack - Eps 1",
      "desc": "",
      "snapshotImg": "/images/es6-ep1.jpg",
      "theme": "default",
      "author": "Ajain Vivek",
      "isLive": false
    }, {
      "id": "2",
      "slideTemplate": "url",
      "title": "ES6 - Zombie Attack - Eps 2",
      "desc": "",
      "snapshotImg": "/images/es6-ep2.jpg",
      "theme": "default",
      "author": "Ajain Vivek",
      "isLive": false
    }];

    let webrtc = this.get('webrtc');
    webrtc.initialize({
      callback: publishPresentation.bind(self),
      random: false
    });

    let featuredSlides = _collection.filter(presentations, {
      "isLive" : false
    });
    let liveSlides = _collection.filter(presentations, 'isLive');

    this.set('liveSlides', liveSlides);
    this.set('featuredSlides', featuredSlides);

    this.EventBus.subscribe('onPresentationDataUpdate', this, function (data) {
      _collection.forEach(data, function (presentation) {
        let index = _array.findIndex(presentations, {
          id : presentation.id
        });
        Ember.set(presentations[index], 'isLive', true);
      });

      let featuredSlides = _collection.filter(presentations, {
        "isLive" : false
      });
      let liveSlides = _collection.filter(presentations, 'isLive');

      this.set('liveSlides', liveSlides);
      this.set('featuredSlides', featuredSlides);
    });
  }.on('init'),
  publishPresentation: function (data) {
    this.EventBus.publish('onPresentationDataUpdate', data);
  },
  broadcastPresentation : function (data) {
    let webrtc = this.get('webrtc');
    if (data) {
      webrtc.broadcast(data);
    }
  },
  actions: {
    joinPresentation (id) {
      this.transitionTo('join', {
        queryParams: {
          isPresenter: false,
          id: id
        }
      });
    },
    hostPresentation (id) {
      this.transitionTo('join', {
        queryParams: {
          isPresenter: true,
          id: id
        }
      });
    },
    goToSlide () {
      this.transitionTo('slide');
    }
  }
});
