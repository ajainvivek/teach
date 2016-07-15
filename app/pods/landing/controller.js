import Ember from 'ember';

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
    let featuredSlides = [{
      "id": 1,
      "slideTemplate": "url",
      "title": "ES6 - Zombie Attack - Eps 1",
      "desc": "",
      "snapshotImg": "/images/es6-ep1.jpg",
      "theme": "default",
      "author": "Ajain Vivek"
    }];

    let liveSlides = [{
      "id": 2,
      "slideTemplate": "url",
      "title": "ES6 - Zombie Attack - Eps 2",
      "desc": "",
      "snapshotImg": "/images/es6-ep2.jpg",
      "theme": "default",
      "author": "Ajain Vivek"
    }];

    this.set('liveSlides', liveSlides);
    this.set('featuredSlides', featuredSlides);
  }.on('init'),
  actions: {
    joinPresentation () {
      this.transitionTo('join', {
        queryParams: {
          isPresenter: false
        }
      });
    },
    hostPresentation () {
      this.transitionTo('join', {
        queryParams: {
          isPresenter: true
        }
      });
    },
    goToSlide () {
      this.transitionTo('slide');
    }
  }
});
