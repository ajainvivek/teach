import Ember from 'ember';
import _array from 'lodash/array';

const {
  $,
  inject
} = Ember;

export default Ember.Controller.extend({
  slideService: inject.service('slide-service'),
  webrtc: inject.service('webrtc'),
  questionData: '',
  timeCompleted: false,
  qsContext: null,
  userList: [],
  isUserListFilled : function () {
    let userList = this.get('userList');
    return (userList.length > 0) ? true : false;
  }.property('userList'),
  initialize : function () {
    this.EventBus.subscribe('onSlideDataUpdate', this, function (slideData) {
      let userList = this.get('userList').concat(slideData.users);
      let updateUserList = _array.uniq(userList, function (user) {
        return user.id;
      });
      this.set('userList', updateUserList);
    });
  }.on('init'),
  actions:{
    slideQuestion: function(){
      this.set('questionData', '');
      this.set('timeCompleted', false);
      let slideService = this.get('slideService');
      let slideId = slideService.getSlideId();
      this.set('questionData', this.findQuestionBySlideId(slideId).qs);
      $('#left-panel').hide().show();
    },

    slideInfo: function(){
      this.set('timeCompleted', false);
      this.set('questionData', '');
      $('#left-panel').hide();
    },

    questionTimeCompleted: function(){
      this.set('timeCompleted', true);
    }
  },

  findQuestionBySlideId: function(id){
    let result = $.grep(this.get('data').slides, function(e){
       return e.id == id;
     });
    return result[0];
  },

  broadcastData : function (slideData) {
    let webrtc = this.get('webrtc');
    if (slideData) {
      webrtc.broadcast(slideData);
    }
  },

  publishData : function (slideData) {
    this.EventBus.publish('onSlideDataUpdate', slideData);
  }
});
