import Ember from 'ember';

export default Ember.Route.extend({
  setupController : function (controller, model, params) {
    if (params.queryParams.id) {
      controller.set('isPresenter', params.queryParams.isPresenter);
      controller.set('slideId', params.queryParams.id);
      controller.set('userPeerId', params.queryParams.peerId);
      controller.set('infoHash', params.queryParams.infoHash);
    } else {
      controller.transitionTo('landing');
    }
  }
});
