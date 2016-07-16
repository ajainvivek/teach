import Ember from 'ember';
import _collection from 'lodash/collection';

export default Ember.Controller.extend({
  featuredSlides: [],
  liveSlides: [],
  isLiveSlidesFilled: function () {
    let liveSlides = this.get('liveSlides');
    return (liveSlides.length > 0) ? true : false;
  }.property('liveSlides'),
  isFeaturedSlidesFilled: function () {
    let featuredSlides = this.get('featuredSlides');
    return (featuredSlides.length > 0) ? true : false;
  }.property('liveSlides'),
  loadData: function () {
    let presentations = [{
      "id": 1,
      "slideTemplate": "url",
      "title": "ES6 - Zombie Attack - Eps 1",
      "desc": "",
      "snapshotImg": "/images/es6-ep1.jpg",
      "theme": "default",
      "author": "Ajain Vivek",
      "isLive": false
    }, {
      "id": 2,
      "slideTemplate": "url",
      "title": "ES6 - Zombie Attack - Eps 2",
      "desc": "",
      "snapshotImg": "/images/es6-ep2.jpg",
      "theme": "default",
      "author": "Ajain Vivek",
      "isLive": true
    }];

    let featuredSlides = _collection.filter(presentations, {
      "isLive" : false
    });
    let liveSlides = _collection.filter(presentations, 'isLive');

    this.set('liveSlides', liveSlides);
    this.set('featuredSlides', featuredSlides);
  }.on('init'),
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
