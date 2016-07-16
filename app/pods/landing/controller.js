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
    let tracker = webrtc.initialize({
      callback: publishPresentation.bind(self),
      random: false
    });
    this.set('tracker', tracker);

    let featuredSlides = _collection.filter(presentations, {
      "isLive" : false
    });
    let liveSlides = _collection.filter(presentations, 'isLive');

    this.set('liveSlides', liveSlides);
    this.set('featuredSlides', featuredSlides);

    this.EventBus.subscribe('onPresentationDataUpdate', this, function (data) {
      if (!data.connectionClosed) {
        _collection.forEach(data, function (presentation) {
          let index = _array.findIndex(presentations, {
            id : presentation.id
          });
          Ember.set(presentations[index], 'isLive', true);
        });
        this.set('livePresentations', data);
      } else {
        let livePresentations = this.get('livePresentations');
        let liveIndex = _array.findIndex(livePresentations, {
          userPeerId : data.peerId
        });
        let index = _array.findIndex(presentations, {
          id : livePresentations[liveIndex].id
        });
        Ember.set(presentations[index], 'isLive', false);
      }


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
      let peerId = this.get('tracker').peerId;
      this.transitionTo('join', {
        queryParams: {
          isPresenter: false,
          id: id,
          peerId: peerId
        }
      });
    },
    hostPresentation (id) {
      let peerId = this.get('tracker').peerId;
      this.transitionTo('join', {
        queryParams: {
          isPresenter: true,
          id: id,
          peerId: peerId
        }
      });
    },
    goToSlide (id) {
      this.transitionTo('slide', {
        queryParams: {
          id: id
        }
      });
    }
  }
});
