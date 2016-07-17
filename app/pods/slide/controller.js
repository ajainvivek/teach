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
  user: {},
  config: {},
  slideData: {},
  slides: [],
  chartContext: null,
  leftPanelWidth: '-275px',
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
  onDataUpdate: function () {
    let config = this.get('config');
    let data = this.get('data');
    if (data && data.state && !config.isPresenter) {
      Reveal.setState(data.state);
    }
  }.observes('data'),
  onPeerConnected: function () {
    let data = this.get('data');
    data.state = Reveal.getState();
    this.broadcastData(data, data.infoHash);
  },
  updateState: function () {
    let data = this.get('data');
    let config = this.get('config');
    let userList = this.get('userList');
    if (data) {
      if(config.isPresenter) {
        data.state = Reveal.getState();
      }
      data.users = userList;
      this.broadcastData(data, data.infoHash);
    }
  },
  actions:{
    slideQuestion: function(){
      this.set('timeCompleted', false);
      let slideService = this.get('slideService');
      let slideId = slideService.getSlideId();
      this.set('questionData', this.findQuestionBySlideId(slideId).qs);
      this.set('leftPanelWidth', '0px');
      Ember.run.schedule("afterRender", this, function () {
        this.get('chartContext').setBarChartData(this.get('questionData'));
      });

      $('#left-panel').hide().show();
    },

    slideInfo: function(){
      this.set('leftPanelWidth', '-275px');
      this.set('timeCompleted', false);
      this.set('questionData', '');
      $('#left-panel').hide();
    },

    slideStateUpdate: function ()  {
      this.updateState();
    },

    questionTimeCompleted: function(){
      Ember.run.schedule("afterRender", this, function () {
        let qsData = this.get('questionData');
        if (qsData.responses) {
          this.get('chartContext').setPieChartData(qsData.responses, qsData.answer);
          this.set('timeCompleted', true);
        }
      });
    }
  },

  findQuestionBySlideId: function(id){
    let result = $.grep(this.get('slides'), function(e){
       return e.id == id;
     });
    return result[0];
  },

  broadcastData : function (slideData, infoHash) {
    let webrtc = this.get('webrtc');
    if (slideData) {
      webrtc.broadcast(slideData, infoHash);
    }
  },

  publishData : function (slideData) {
    this.set('data', slideData);
    this.EventBus.publish('onSlideDataUpdate', slideData);
  }
});
