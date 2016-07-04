import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    mut: function(data){
      console.log(data);
    }
  }
});
