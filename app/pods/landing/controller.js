import Ember from 'ember';
import _array from 'lodash/array';

export default Ember.Controller.extend({
  actions: {
    presentCourse(courseId){
      let self= this;
      let courses = self.get('model');
      let newlyLiveCourse =  _array.findIndex(courses.availableCourses,function(course){
        return course.id === courseId;
      })

      courses.liveCourses.pushObject(courses.availableCourses[newlyLiveCourse]);
      courses.availableCourses.removeAt(newlyLiveCourse);
    },
    joinCourse(courseId){

    }
  }
});
