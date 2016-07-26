import Ember from 'ember';
import _collection from 'lodash/collection';
import _lang from 'lodash/lang';
import _config from '../../config/episodes';

const {
  inject,
  Controller
} = Ember;

export default Controller.extend({
  slides: [{
    "id": "1",
    "slideTemplate": "url",
    "title": "Zombie Attack",
    "desc": "",
    "snapshotImg": "/images/es6-ep1.jpg",
    "theme": "default",
    "author": "Ajain Vivek",
    "isLive": false,
    "available": true
  }, {
    "id": "2",
    "slideTemplate": "url",
    "title": "Zombie Attack",
    "desc": "",
    "snapshotImg": "/images/es6-ep2.jpg",
    "theme": "default",
    "author": "Ajain Vivek",
    "isLive": false,
    "available": true
  }, {
    "id": "3",
    "slideTemplate": "url",
    "title": "Zombie Attack",
    "desc": "",
    "snapshotImg": "/images/es6-ep3.jpg",
    "theme": "default",
    "author": "Ajain Vivek",
    "isLive": false,
    "available": true
  }],
  featuredSlides: [],
  slide: inject.controller('slide'),
  join: inject.controller('join'),
  webrtc: inject.service('webrtc'),
  ajax: Ember.inject.service(),
  currentPresentation: {},
  getData: function (id) {
    let url = _config.data[id];
    return this.get('ajax').request(url);
  },
  isLiveSlidesFilled: function () {
    let liveSlides = this.get('liveSlides');
    return (liveSlides.length > 0) ? true : false;
  }.property('liveSlides'),
  isFeaturedSlidesFilled: function () {
    let featuredSlides = this.get('featuredSlides');
    return (featuredSlides.length > 0) ? true : false;
  }.property('liveSlides'),
  updateLiveSlides: function () {
    let slides = this.get('slides');
    let presentations = this.get('presentations');
    let liveSlides = _collection.map(presentations, function (obj) {
      let slide = _lang.clone(_collection.find(slides, {id : obj.slideId}));
      slide.infoHash = obj.infoHash;
      slide.name = obj.name;
      slide.createdAt = obj.timestamp;
      slide.isLive = true;
      return slide;
    });
    this.set('liveSlides', liveSlides);
  }.observes('presentations'),
  loadData: function () {
    let self = this;
    let presentations = this.get('slides');
    let featuredSlides = _collection.filter(presentations, {
      "isLive" : false
    });
    let liveSlides = _collection.filter(presentations, 'isLive');

    this.set('liveSlides', liveSlides);
    this.set('featuredSlides', featuredSlides);

    let ref = firebase.database().ref('presentations');
    ref.on('value', function(dataSnapshot) {
      let snapshot = dataSnapshot.val();
      let presentations;
      if (snapshot !== null) {
        let snapshotKeys = Object.keys(snapshot);
        presentations = _collection.map(snapshotKeys, function (key) {
          return snapshot[key];
        });
      } else {
        presentations = [];
      }
      self.set('presentations', presentations);
    });

  }.on('init'),
  actions: {
    joinPresentation (obj) {
      let self = this;
      let join = this.get('join');
      let slide = this.get('slide');
      this.getData(obj.id).then(function (data) {
        data.infoHash = obj.infoHash;
        data.name = obj.name;
        data.createdAt = obj.createdAt;
        join.set('data', data);
        slide.set('data', data);
        slide.set('slides', data.slides);
        self.transitionTo('join', {
          queryParams: {
            isPresenter: false,
            id: obj.id
          }
        });
      });
    },
    hostPresentation (obj) {
      let self = this;
      let join = this.get('join');
      let slide = this.get('slide');
      this.getData(obj.id).then(function (data) {
        join.set('data', data);
        slide.set('data', data);
        slide.set('slides', data.slides);
        self.transitionTo('join', {
          queryParams: {
            isPresenter: true,
            id: obj.id
          }
        });
      });
    },
    goToSlide (id) {
      let self = this;
      let slide = this.get('slide');
      this.getData(id).then(function (data) {
        slide.set('slides', data.slides);
        self.transitionTo('slide', {
          queryParams: {
            id: id,
            isPresenter: true
          }
        });
      });
    }
  }
});
