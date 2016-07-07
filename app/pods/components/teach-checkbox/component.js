import Ember from 'ember';

export default Ember.Component.extend({

  isChecked: false,
  value: '',
  actions: {

  },

  change: function(data){
    if(this.get('isChecked')){
      this.sendAction('onChecked');
    }else{
      this.sendAction('onUnChecked');
    }

  }.observes('isChecked')
});
