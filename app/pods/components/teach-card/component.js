import Ember from 'ember';

const {
  $
} = Ember;

export default Ember.Component.extend({
  data : [{
    "id": 1,
    "slideTemplate": "url",
    "title": "ES6 - Zombie Attack - Eps 1",
    "desc": "",
    "snapshotImg": "http://d1zlh37f1ep3tj.cloudfront.net/wp/wblob/54592E651337D2/22DA/3E75E5/_cCyPoB9Eb1_JTP8ZL_ZuA/EmilysQuotes.Com-Intelligence-teach-learning-Benjamin-Franklin.jpg",
    "theme": "default",
    "author": "Ajain Vivek"
  }, {
    "id": 2,
    "slideTemplate": "url",
    "title": "ES6 - Zombie Attack - Eps 2",
    "desc": "",
    "snapshotImg": "http://d1zlh37f1ep3tj.cloudfront.net/wp/wblob/54592E651337D2/22DA/3E75E5/_cCyPoB9Eb1_JTP8ZL_ZuA/EmilysQuotes.Com-Intelligence-teach-learning-Benjamin-Franklin.jpg",
    "theme": "default",
    "author": "Ajain Vivek"
  }],
  didInsertElement : function () {
      $('.owl-carousel').owlCarousel({
        autoWidth : true
      });
  },
  actions: {
    present (id) {
      this.sendAction('present', id);
    },
    view (id) {
      this.sendAction('view', id);
    }
  }
});
