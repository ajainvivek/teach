import Ember from 'ember';

const {
  $
} = Ember;

export default Ember.Component.extend({
  didInsertElement : function () {
      $('.owl-carousel').owlCarousel();
  },

  actions: {
    presentCourse(courseId){
      this.sendAction('presentCourse',courseId);
    },
    joinCourse(courseId){
      this.sendAction('joinCourse',courseId);
    }
  }
});
