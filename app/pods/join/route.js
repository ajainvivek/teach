import Ember from 'ember';

export default Ember.Route.extend({
  setupController : function (controller, model, params) {
    controller.set('isPresenter', params.queryParams.isPresenter);
  }
});
