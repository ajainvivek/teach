import Ember from 'ember';

export default Ember.Route.extend({
  setupController : function (controller, model, params) {
    if (params.queryParams.id) {
      controller.set('isPresenter', params.queryParams.isPresenter);
      controller.set('slideId', params.queryParams.id);
    } else {
      controller.transitionTo('landing');
    }
  }
});
