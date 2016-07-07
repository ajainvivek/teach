import Ember from 'ember';

export default Ember.Service.extend({

  slideId: '',
  
  getSlideId: function(){
    return this.get('slideId');
  },

  setSlideId: function(id){
    this.set('slideId', id);
  }

});
