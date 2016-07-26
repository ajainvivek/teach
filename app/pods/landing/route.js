import Ember from 'ember';
import _collection from 'lodash/collection';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('presentation');
  },
  setupController: function (controller, model) {
    let presentations = _collection.map(model.toArray(), function (obj) {
      return obj.toJSON();
    });
    controller.set('presentations', presentations);
  }
});
