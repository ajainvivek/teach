import Ember from 'ember';

const {
  $,
  inject
} = Ember;

export default Ember.Controller.extend({
  slideService: inject.service('slide-service'),
  webrtc: inject.service('webrtc'),
  questionData: '',

  init : function () {
    console.log(this.get('webrtc').getClient());
  },

  actions:{
    slideQuestion: function(){
      let slideService = this.get('slideService');
      let slideId = slideService.getSlideId();
      this.set('questionData', this.findQuestionBySlideId(slideId).qs);
      $('#leftPanel').show();
    },

    slideInfo: function(){
      this.set('questionData', '');
      $('#leftPanel').hide();
    }
  },

  findQuestionBySlideId: function(id){
    let result = $.grep(this.get('data').slides, function(e){
       return e.id == id;
     });
    return result[0];
  }
});
