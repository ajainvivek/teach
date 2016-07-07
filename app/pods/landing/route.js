import Ember from 'ember';
import _array from 'lodash/array'

export default Ember.Route.extend({
  model() {
    return $.getJSON('data/courses.json').then(function(response) {
      let liveCourses, availableCourses;
      let allCourses = response.courses;
      if(allCourses){
        liveCourses = _array.remove(allCourses, function(course) {
          return course.presenter;
        })
      }
      availableCourses = allCourses;
      
      return Ember.RSVP.hash({
        'liveCourses': liveCourses,
        'availableCourses': availableCourses
      });

    }, function(error) {
      return Ember.RSVP.hash({
        'liveCourses': [],
        'availableCourses': []
      });
    });
  }
});
